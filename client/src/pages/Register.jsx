import { Link } from "react-router";
import heroImg from "../assets/hero2.jpg";
import { TiArrowBack } from "react-icons/ti";

const Register = () => {

    const handleregister = e => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;

        const formInfo = { name, email, password, role };
        console.log(formInfo);

        form.reset();
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex shadow-2xl">

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
                                <input name="name" type="text" className="input pb" placeholder="Username" />

                                <div className="mb-2"></div>

                                <label className="label text-emerald-700 font-semibold">Email</label>
                                <input name="email" type="email" className="input" placeholder="Email" />

                                <div className="mb-2"></div>

                                <label className="label text-emerald-700 font-semibold">Password</label>
                                <input name="password" type="password" className="input" placeholder="Password" />

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

                                <button className="btn bg-emerald-800 hover:bg-emerald-600 text-white mt-7">
                                    Register
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

export default Register;