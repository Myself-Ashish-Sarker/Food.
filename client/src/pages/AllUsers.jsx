import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";

const AllUsers = () => {

    const { user, loading } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    const admins = users.filter(u => u.role === "admin");
    const deviveries = users.filter(u => u.role === "delivery");
    const normalUsers = users.filter(u => u.role === "user");

    useEffect(() => {
        if (user) {
            axiosPublic.get("/users")
                .then(res => {
                    console.log(res.data);
                    setUsers(res.data);
                }).catch(err => {
                    console.error(err);

                })
        };
    }, [user, axiosPublic]);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/users/${user.email}`)
                .then(res => {
                    setCurrentUser(res.data);
                });
        }
    }, [user, axiosPublic]);

    if (loading || !currentUser) {
        return <p>Loading...</p>; // spinner or skeleton is better
    }

    // if (!currentUser) {
    //     navigate("/");
    // }


    if (currentUser && currentUser.role !== "admin") {
        return <p>Access Denied</p>;
    }


    return (
        <div className="pt-16">
            <h1>All user route</h1>

            {
                deviveries.map(u => (
                    <div>
                        <h1>{u.name} --- {u.role}</h1>
                    </div>
                ))
            }

            {
                normalUsers.map(u => (
                    <div>
                        <h1>{u.name} --- {u.role}</h1>
                    </div>
                ))
            }

        </div>
    );
};

export default AllUsers;