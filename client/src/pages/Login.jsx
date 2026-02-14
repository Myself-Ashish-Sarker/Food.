import { Link, useNavigate } from "react-router";
import loginImg from "../assets/login.jpg";
import { TiArrowBack } from "react-icons/ti";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {

    const { user, loading, login } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        const formInfo = { email, password };
        console.log(formInfo);

        login(email, password)
            .then( (res) => {
                console.log(res.user);
                navigate("/", {
                    state: {
                        loginSuccess: true
                    }
                })
            }).catch(err => {
                console.error(err.code);
            })
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex shadow-2xl border-[3px] border-emerald-700">

                    {/* Card */}
                    <div className="card bg-base-100 w-400 max-w-sm shrink-0 rounded-none py-10">
                        <div className="card-body">
                            <Link to={"/"} className="cursor-pointer">
                                <div className="flex items-center">
                                    <TiArrowBack />
                                    <h1>Home</h1>
                                </div>
                            </Link>
                            <h1 className="text-3xl font-bold">Login.</h1>
                            <h1 className="text-xl pb-5">Welcome back !</h1>

                            <form onSubmit={handleLogin}>
                                <fieldset className="fieldset">

                                    <label className="label text-emerald-700 font-semibold">Email</label>
                                    {
                                        user ? (
                                            <input disabled name="email" type="email" className="input" placeholder="Email" required />
                                        ) : (
                                            <input name="email" type="email" className="input" placeholder="Email" required />
                                        )
                                    }

                                    <div className="mb-2"></div>

                                    <label className="label text-emerald-700 font-semibold">Password</label>
                                    {
                                        user ? (
                                            <input disabled name="password" type="password" className="input" placeholder="Password" required />
                                        ) : (
                                            <input name="password" type="password" className="input" placeholder="Password" required />
                                        )
                                    }


                                    <div className="mb-2"></div>

                                    <div>
                                        <Link className="link link-success">Forget Passowrd ?</Link>
                                    </div>

                                    <div>
                                        <p>Don't have an account?
                                            <Link to={"/register"} className="ml-1 text-md link link-success link-hover">
                                                {
                                                    user ? (
                                                        <></>
                                                    ) : (
                                                        "register"
                                                    )
                                                }

                                            </Link>
                                        </p>
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
                                                    Login
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
                            src={loginImg}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>

                </div>
            </div>
        </>

    );
};

export default Login;