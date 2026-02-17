import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import { SiCanvas } from "react-icons/si";
import { RiDeleteBin6Fill } from "react-icons/ri";

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

    // delete id
    const handleAccDelete = () => {
        useEffect(() => {
            axiosPublic.delete(`/users/${user.email}`)
                .then(res => {
                    setUserDB(res.data);
                }).catch(err => {
                    console.error(err);
                })
        }, [])
    }

    // redable date
    const formattedDate = userDB?.createdAt ?
        new Date(userDB?.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }) : ""


    return (
        <>
            <div className="pt-30"></div>

            <div className="px-2 lg:px-50">
                {
                    userDB && (
                        userDB?.role === "admin" ? (
                            <div role="alert" className="alert bg-rose-700 text-4xl flex justify-center items-center capitalize">
                                <SiCanvas className="text-white" />
                                <span className="text-white">{userDB?.role} Profile</span>
                            </div>
                        ) : userDB?.role === "delivery" ? (
                            <div role="alert" className="alert bg-blue-800 text-4xl flex justify-center items-center capitalize">
                                <SiCanvas className="text-white" />
                                <span className="text-white">{userDB?.role} Profile</span>
                            </div>
                        ) : (
                            <div role="alert" className="alert bg-emerald-800 text-4xl flex justify-center items-center capitalize">
                                <SiCanvas className="text-white" />
                                <span className="text-white">{userDB?.role} Profile</span>
                            </div>
                        )
                    )
                }

                <div className="mt-20"></div>

                <div className="card-body ">
                    <div className="tabs tabs-lift ">
                        <input type="radio" name="my_tabs_3" className="tab text-black font-semibold" aria-label="Basic Information" defaultChecked />
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <div className=" flex flex-col gap-5 lg:flex-row lg:gap-40 bg-base-100  border-base-300 p-6">
                                <div className="">
                                    <img className="w-24 h-24 rounded-full" src={userDB.photoURL} alt="" />
                                    <button className="mt-2 btn btn-primary px-2">Change Image</button>
                                </div>

                                <div>
                                    <h1 className="text-3xl font-semibold">Perosnal Information</h1>

                                    <div className="mt-10"></div>

                                    <div className="mb-5">
                                        <label className="mb-3 block text-black font-medium ">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fname"
                                            placeholder={userDB.fname}
                                            className="w-full lg:w-[200%] rounded-md border bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md" />
                                    </div>

                                    <div className="mt-10"></div>

                                    <div className="mb-5">
                                        <label className="mb-3 block text-black font-medium ">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fname"
                                            placeholder={userDB.lname}
                                            className="w-full lg:w-[200%] rounded-md border bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md" />
                                    </div>

                                    <div className="mt-10"></div>

                                    <div className="mb-5">
                                        <label className="mb-3 block text-black font-medium ">
                                            Email
                                        </label>
                                        <input
                                            disabled
                                            type="email"
                                            placeholder={userDB.email}
                                            className="w-full cursor-not-allowed lg:w-[200%] rounded-md border bg-white py-3 px-6 font-medium outline-none focus:shadow-md placeholder:text-black" />
                                    </div>

                                    <div className="mt-10"></div>

                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium text-black">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder={userDB.phone}
                                            className="w-full lg:w-[200%] rounded-md border bg-white py-3 px-6 text-base font-medium  outline-none  focus:shadow-md" />
                                    </div>

                                    <div className="mt-10"></div>

                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium text-black">
                                            User Role
                                        </label>
                                        <input
                                            disabled
                                            type="text"
                                            placeholder={userDB?.role}
                                            className="w-full lg:w-[200%] cursor-not-allowed rounded-md border bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md placeholder:text-black" />
                                    </div>

                                    <div className="mt-10"></div>

                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium text-black">
                                            Created At
                                        </label>
                                        <input
                                            disabled
                                            type="text"
                                            value={formattedDate}
                                            placeholder={userDB?.createdAt}
                                            className="w-full lg:w-[200%] cursor-not-allowed rounded-md border bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md placeholder:text-black" />
                                    </div>

                                    <div className="mt-10"></div>

                                    <button className="btn btn-primary">Update Information</button>

                                </div>
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_3" className="tab font-semibold text-black" aria-label="Additional Settings" />
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <h1 className="text-3xl pt-3 pb-7">Password Change</h1>

                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-black">
                                    Previous Passowrd
                                </label>
                                <input
                                    type="text"
                                    placeholder="Previous Password"
                                    className="w-full lg:w-full rounded-md border bg-white py-3 px-6 text-base font-medium  outline-none  focus:shadow-md" />
                            </div>

                            <div className="mt-10"></div>

                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-black">
                                    New Passowrd
                                </label>
                                <input
                                    type="text"
                                    placeholder="Previous Password"
                                    className="w-full lg:w-full rounded-md border bg-white py-3 px-6 text-base font-medium  outline-none  focus:shadow-md" />
                            </div>

                            <button className="mt-5 btn btn-success text-white">Change Password</button>

                            <div className="mt-15"></div>

                            <h1 className="text-3xl font-bold pt-3 pb-7 text-red-600">Dangerous Area</h1>

                            <div role="alert" className="alert alert-error text-white">
                                <RiDeleteBin6Fill />
                                <span>Be Careful, This will delete you Account if you click delete button and confirm. Proceed Cautiously !!!</span>
                            </div>

                            <div className="flex justify-center">
                                <button className="mt-10 btn bg-red-500 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Delete Account</button>
                            </div>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">Delete Account</h3>
                                    <p className="py-4">Are you sure you want to delete your account?!</p>
                                    <button onClick={handleAccDelete} className="btn btn-error text-white">Delete</button>
                                </div>
                            </dialog>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;