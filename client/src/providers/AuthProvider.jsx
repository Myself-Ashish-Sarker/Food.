import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
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
    const [loading, setloading] = useState(false);

    // Registration Function
    const createUser = (email, password) => {
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Login Function
    const login = (email, password) => {
        setloading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout function
    const logOut = () => {
        setloading(true);
        return signOut(auth, googleProvider);
    }

    // State Change Monitor
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("user: ", currentuser);
            console.log("email: ", currentuser?.email);
            console.log("uid: ", currentuser?.uid);
            setuser(currentuser);
            setloading(false);

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
