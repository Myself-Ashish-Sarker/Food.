import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import { TbCrosshair } from "react-icons/tb";

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
        if (user?.email) {
            axiosPublic.get(`/users/${user.email}`)
                .then(res => {
                    setCurrentUser(res.data);

                    if (res.data.role === "admin") {
                        axiosPublic.get("/users")
                            .then(res2 => {
                                setUsers(res2.data);
                            })
                    }
                });
        }
    }, [user, axiosPublic]);

    if (loading || !currentUser) {
        return <p>Loading...</p>; // spinner or skeleton is better
    }

    if (currentUser && currentUser.role !== "admin") {
        return <p>Access Denied</p>;
    }


    return (
        <>
            <div className="pt-20 px-50 ">
                <div role="alert" className="flex items-center alert bg-rose-400 p-8">
                    <TbCrosshair className="text-white text-5xl" />
                    <span className="text-white text-5xl">User Control Panel</span>
                </div>
            </div>
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
        </>
    );
};

export default AllUsers;