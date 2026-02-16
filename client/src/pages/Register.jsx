import { Link, useNavigate } from "react-router";
import registerImg from "../assets/register.jpg";
import { TiArrowBack } from "react-icons/ti";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Slide, toast } from "react-toastify";
import regBackImage from "../assets/register.jpg";

const Register = () => {

    const { user, loading, createUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const handleregister = async (e) => {
        e.preventDefault();

        const form = e.target;

        const fname = form.fname.value;
        const lname = form.lname.value;
        const email = form.email.value;
        const password = form.password.value;
        const phone = form.phone.value;
        const role = form.role.value;
        const imgFile = form.image.files[0];

        try {

            //Upload Image to ImageBB
            const formData = new FormData();
            formData.append("image", imgFile);

            const imgRes = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });

            const imageURL = imgRes.data.data.display_url

            const res = await createUser(email, password);
            const regUser = res.user;

            const userInfo = {
                fname,
                lname,
                email: regUser.email,
                phone,
                role,
                photoURL: imageURL,
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

            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        `url(${regBackImage})`,
                }}
            >
                <div className="hero hero-overlay py-10">
                    <div className="flex items-center justify-center px-4 py-8 w-full">
                        <div className="w-full max-w-md md:max-w-2xl lg:max-w-2xl bg-white shadow-2xl">
                            <form onSubmit={handleregister} className="card-body p-6 sm:p-8 md:p-10">

                                {/* home link */}
                                <Link to={"/"} className="cursor-pointer">
                                    <div className="flex items-center text-black">
                                        <TiArrowBack />
                                        <p className="text-base">Home</p>
                                    </div>
                                </Link>

                                <div className="mt-5"></div>

                                {/* register title */}
                                <h1 className="text-3xl font-bold text-black text-center">Register.</h1>
                                <h1 className="text-lg pb-5 text-black text-center">Hey there, care to join us !?</h1>

                                <div className="mb-5"></div>

                                {/* names */}
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">

                                        {/* first name */}
                                        <div className="mb-5">
                                            <label className="mb-3 block text-emerald-800 font-medium ">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fname"
                                                placeholder="First Name"
                                                className="w-full rounded-md border border-emerald-800 bg-white py-3 px-6 text-base font-medium text-emerald-800 outline-none focus:border-emerald-800 focus:shadow-md" />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">

                                        {/* last name */}
                                        <div className="mb-5">
                                            <label className="mb-3 block text-base font-medium text-emerald-800">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lname"
                                                placeholder="Last Name"
                                                className="w-full rounded-md border border-emerald-800 bg-white py-3 px-6 text-base font-medium text-emerald-800 outline-none focus:border-emerald-800 focus:shadow-md" />
                                        </div>
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium text-emerald-800">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full rounded-md border border-emerald-800 bg-white py-3 px-6 text-base font-medium text-emerald-800 outline-none focus:border-emerald-800 focus:shadow-md" />
                                </div>

                                {/* Password */}
                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium text-emerald-800">
                                        Passowrd
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your email"
                                        className="w-full rounded-md border border-emerald-800 bg-white py-3 px-6 text-base font-medium text-emerald-800 outline-none focus:border-emerald-800 focus:shadow-md" />
                                </div>

                                {/* Phone Number */}
                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium text-emerald-800">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        className="w-full rounded-md border border-emerald-800 bg-white py-3 px-6 text-base font-medium text-emerald-800 outline-none focus:border-emerald-800 focus:shadow-md" />
                                </div>

                                {/* Role Select */}
                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium text-emerald-800">
                                        User Role
                                    </label>
                                    <select name="role" defaultValue="" className="w-full rounded-md border border-emerald-800 bg-white py-3 px-5 text-base font-medium text-emerald-800 outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                                        <option value="" className="text-" disabled>Your Role</option>
                                        <option value="user" className="text-emerald-700 font-semibold">User</option>
                                        <option value="delivery" className="text-blue-600 font-semibold">Delivery Man</option>
                                        <option value="admin" disabled>Admin</option>
                                    </select>
                                </div>

                                {/* image input */}


                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium text-emerald-800">
                                        Upload
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        role="button"
                                        placeholder="Uplaod Your Image"
                                        className="w-full file-input rounded-md border border-emerald-800 bg-white text-emerald-800 font-medium outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>

                                <div>
                                    <p className="text-black">Already have an account? <Link to={"/login"} className="link link-success link-hover">Login</Link></p>
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
                                                className={`btn py-6 bg-emerald-800 hover:bg-emerald-600 text-white mt-7 ${user ? "opacity-50 cursor-not-allowed" : ""}`}>
                                                Register
                                            </button>
                                        </>
                                    )
                                }
                            </form>
                        </div>
                    </div >
                </div>

            </div>

            <div>

            </div >
        </>

    );
};

export default Register;