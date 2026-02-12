import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signOut,
    updatePassword
} from "firebase/auth";
import {
    createContext,
    useEffect,
    useState
} from "react";
import auth from "../config/firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Registration Function
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Login Function
    const login = async (email, password) => {
        setLoading(true);
        // return createUserWithEmailAndPassword(auth, email, password);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);   // ← VERY IMPORTANT
        }
        // this structure is very important or login with non register account will make the login text of login button and nav avatar icon replaced with spinner
    }

    // Logout function
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // State Change Monitor
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("user: ", currentuser);
            console.log("email: ", currentuser?.email);
            console.log("uid: ", currentuser?.uid);
            setuser(currentuser);
            setLoading(false);

        });

        return () => {
            unsubscribe();
        }
    }, [])

    // Change User Password
    const changePassword = (currentPassword, newPassword) => {
        if (!auth.currentUser) {
            return Promise.reject("No user logged in");
        }

        const user = auth.currentUser;

        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        // Step 1: Re-authenticate
        return reauthenticateWithCredential(user, credential)
            .then(() => {
                // Step 2: Update password
                return updatePassword(user, newPassword);
            });
    };

    // Delete User
    const deleteAccount = (currentPassword) => {
        if (!auth.currentUser) {
            return Promise.reject("No user logged in");
        }

        const user = auth.currentUser;

        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        // Re-authenticate first
        return reauthenticateWithCredential(user, credential)
            .then(() => {
                return deleteUser(user);
            });
    };

    // Pass Value Object
    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logOut,
        changePassword,
        deleteAccount
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
