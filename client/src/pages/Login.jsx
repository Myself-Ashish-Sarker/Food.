import { Link } from "react-router";
import heroImg from "../assets/hero2.jpg";

const Login = () => {

    const handleLogin = e => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        const formInfo = { email, password };
        console.log(formInfo);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex shadow-2xl">

                {/* Card */}
                <div className="card bg-base-100 w-400 max-w-sm shrink-0 rounded-none py-10">
                    <div className="card-body">
                        <p></p>
                        <h1 className="text-3xl font-bold">Login.</h1>
                        <h1 className="text-xl pb-5">Welcome back !</h1>

                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">

                                <label className="label text-emerald-700 font-semibold">Email</label>
                                <input name="email" type="email" className="input" placeholder="Email" />

                                <div className="mb-2"></div>

                                <label className="label text-emerald-700 font-semibold">Password</label>
                                <input name="password" type="password" className="input" placeholder="Password" />

                                <div className="mb-2"></div>

                                <div className="mb-1"></div>

                                <div>
                                    <p>Don't have an account? <Link to={"/register"} className="link link-success link-hover">Register</Link></p>
                                </div>

                                <button className="btn bg-emerald-800 hover:bg-emerald-600 text-white mt-7">
                                    Login
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>

                {/* Image */}
                <div className="hidden lg:block w-xl">
                    <img
                        src={heroImg}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>

            </div>
        </div>
    );
};

export default Login;