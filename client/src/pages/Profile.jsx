import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";

const Profile = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [userDB, setUserDB] = useState({});

    useEffect(() => {
        if (!loading && !user) {
            navigate("/");
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (!user) return;

        axiosPublic.get(`/users/${user.email}`)
            .then(res => {
                console.log(res.data);
                setUserDB(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, []);




    return (
        <>
            <div className="pt-20"></div>

            <div>
                <h1>This is User profile</h1>

                <h1 className="text-3xl ">Personal Information</h1>

                <div className="flex ">
                    <img className="w-24 h-24 rounded-full" src={userDB.photoURL} alt="" />
                    <div className="flex gap-1">
                        <div className=" h-4 w-20">{userDB.fname} and</div>
                        <div className=" h-4 w-20">{userDB.lname}</div>
                    </div>
                    <div className=" h-4 w-28">{userDB.email}</div>
                </div>
            </div>
        </>
    );
};

export default Profile;