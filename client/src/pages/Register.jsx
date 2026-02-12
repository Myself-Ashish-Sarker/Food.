import { Link, useNavigate } from "react-router";
import registerImg from "../assets/register.jpg";
import { TiArrowBack } from "react-icons/ti";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Slide, toast } from "react-toastify";

const Register = () => {

    const { user, loading, createUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    const handleregister = async (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;

        try {
            const res = await createUser(email, password);
            const regUser = res.user;

            const userInfo = {
                name,
                email: regUser.email,
                role,
                createdAt: new Date(),
            };

            const response = await axiosPublic.post("/users", userInfo);
            console.log(response.data);
            // reset form after success
            form.reset();

            navigate("/", {
                state: {
                    registerSuccess: true
                }
            });
        } catch (error) {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
                toast.error('his email is already registered', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    theme: "dark",
                    transition: Slide,
                    limit: 3,
                });
            }

        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex shadow-2xl border-2 border-emerald-700">

                    {/* Card */}
                    <div className="card bg-base-100 w-400 max-w-sm shrink-0 rounded-none py-10">
                        <div className="card-body">

                            <Link to={"/"} className="cursor-pointer">
                                <div className="flex items-center">
                                    <TiArrowBack />
                                    <h1>Home</h1>
                                </div>
                            </Link>
                            <h1 className="text-3xl font-bold">Register.</h1>
                            <h1 className="text-xl pb-5">Hey there, care to join us !?</h1>

                            <form onSubmit={handleregister}>
                                <fieldset className="fieldset">

                                    <label className="label text-emerald-700 font-semibold">Username</label>
                                    <input name="name" type="text" className="input pb" placeholder="Username" required />

                                    <div className="mb-2"></div>

                                    <label className="label text-emerald-700 font-semibold">Email</label>
                                    <input name="email" type="email" className="input" placeholder="Email" required />

                                    <div className="mb-2"></div>

                                    <label className="label text-emerald-700 font-semibold">Password</label>
                                    <input name="password" type="password" className="input" placeholder="Password" required />

                                    <div className="mb-2"></div>

                                    <label className="label text-emerald-700 font-semibold">Role</label>
                                    <select name="role" defaultValue="" className="select" required>
                                        <option value="" disabled>Your Role</option>
                                        <option value="user">User</option>
                                        <option value="delivery">Delivery Man</option>
                                        <option value="admin" disabled>Admin</option>
                                    </select>

                                    <div className="mb-1"></div>

                                    <div>
                                        <p>Already have an account? <Link to={"/login"} className="link link-success link-hover">Login</Link></p>
                                    </div>

                                    {
                                        loading ? (
                                            <>
                                                <button
                                                    disabled={user}
                                                    className={`btn bg-emerald-800 hover:bg-emerald-600 text-white mt-7 ${user ? "opacity-50 cursor-not-allowed" : ""}`}>
                                                    <span className="loading loading-spinner loading-xl"></span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    disabled={user}
                                                    className={`btn bg-emerald-800 hover:bg-emerald-600 text-white mt-7 ${user ? "opacity-50 cursor-not-allowed" : ""}`}>
                                                    Register
                                                </button>
                                            </>
                                        )
                                    }

                                </fieldset>
                            </form>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="hidden lg:block w-xl">
                        <img
                            src={registerImg}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>

                </div>
            </div>
        </>

    );
};

export default Register;