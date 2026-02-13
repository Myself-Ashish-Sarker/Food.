import { useContext, useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaRegFaceLaughBeam } from "react-icons/fa6";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Slide, toast } from "react-toastify";

const Navbar = () => {

    const { user, loading, logOut } = useContext(AuthContext);

    const [userDB, setUserDB] = useState(null);

    const axiosPublic = useAxiosPublic();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success(`See you later, ${userDB.name}`, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                })
            })
            .catch()
    };

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/users/${user.email}`)
                .then(res => {
                    console.log(res.data);
                    setUserDB(res.data);
                }).catch(err => {
                    console.error(err);

                })
        }
    }, [user, axiosPublic])

    const getBadgeColor = role => {
        switch (role) {
            case "user":
                return "mt-2 badge badge-dash badge-success";
            case "admin":
                return "mt-2 badge badge-dash badge-secondary";
            case "delivery man":
                return "mt-2 badge badge-dash badge-primary";
            default:
                return "mt-2 badge badge-neutral badge-dash";
        }
    }

    return (
        <>
            <div className="fixed z-50 navbar bg-emerald-800  shadow-sm px-5 lg:px-15">
                <div className="flex-1">
                    <Link to={"/"} className="cursor-pointer text-3xl font-bold text-white">Food.</Link>
                </div>
                <div className="flex-none">

                    {/* mobile device navbar */}
                    <div className="lg:hidden dropdown dropdown-end">
                        <div tabIndex={0} className=""> <HiOutlineMenuAlt3 className="text-3xl text-white font-bold cursor-pointer" /></div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-64 p-2 shadow-sm mt-5">
                            {
                                user ?
                                    (
                                        <>
                                            <div className="flex items-center gap-2">
                                                {
                                                    userDB && (
                                                        userDB.role === "admin" ? (
                                                            <div className="label ml-2">Admin Info</div>
                                                        ) : userDB.role === "delivery" ? (
                                                            <div className="label ml-2">Delivery Info</div>
                                                        ) : (
                                                            <div className="label ml-2">User Info</div>
                                                        )
                                                    )
                                                }
                                                <TiArrowSortedDown className="label text-md" />
                                            </div>

                                            <div className="mt-2"></div>

                                            <div className={getBadgeColor(userDB?.role)}>
                                                {userDB?.role}
                                            </div>

                                            <li className="p-2 text-[0.95rem] font-semibold text-black">{userDB?.email}</li>
                                            <li className="p-2 text-[0.95rem] font-semibold text-black">{userDB?.name}</li>

                                            <hr className="mb-5" />

                                            <div className="flex items-center gap-2">
                                                <div className="label ml-2">User Menu</div>
                                                <TiArrowSortedDown className="label text-md" />
                                            </div>

                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Profile</Link></li>
                                            {
                                                userDB && (
                                                    userDB?.role === "admin"
                                                        ?
                                                        <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Add Menu</Link></li>
                                                        :
                                                        <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Cart</Link></li>

                                                )
                                            }
                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Coupons</Link></li>

                                            <hr className="mb-5" />

                                            <div className="flex items-center gap-2">
                                                <div className="label ml-2">Local Menu</div>
                                                <TiArrowSortedDown className="label text-md" />
                                            </div>

                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Home</Link></li>
                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Menu</Link></li>
                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Contact</Link></li>

                                            <button onClick={handleLogOut} className="mt-5 btn border-2 border-emerald-800 text-black hover:text-white hover:bg-emerald-800 hover:border-none">Sign Out</button>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <li><Link to={"/"} className="">Home</Link></li>
                                            <li><Link to={"/meu"} className="">Menu</Link></li>
                                            <li><Link to={"/contact"} className="">Contact</Link></li>
                                            <li className="">
                                                <Link to={"/login"} className="btn max-w-full"><button className="">Join Us</button></Link>
                                            </li>
                                        </>
                                    )
                            }
                        </ul>
                    </div>

                    {/* full screen navbar */}
                    <div className="hidden lg:block">
                        <div className="flex items-center-safe gap-5">
                            <Link className="text-white font-semibold" to={"/"}>Home</Link>
                            <Link className="text-white font-semibold">Menu</Link>
                            <Link className="text-white font-semibold" to={"/contact"}>Contact</Link>

                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : user ? (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} className="">
                                        <div className=" rounded-full">
                                            <FaRegFaceLaughBeam className="cursor-pointer text-white text-3xl hover:text-4xl transform transition-all delay-150" />
                                        </div>
                                    </div>
                                    <ul className="menu menu-sm dropdown-content border-2 space-y-3 border-emerald-700 bg-base-100 text-black z-1 mt-3 w-80 p-2 shadow">
                                        <div className="flex items-center gap-2">
                                            {
                                                userDB && (
                                                    userDB.role === "admin" ? (
                                                        <div className="label ml-2">Admin Info</div>
                                                    ) : userDB.role === "delivery man" ? (
                                                        <div className="label ml-2">Delivery Info</div>
                                                    ) : (
                                                        <div className="label ml-2">User Info</div>
                                                    )
                                                )
                                            }
                                            <TiArrowSortedDown className="label text-md" />
                                        </div>

                                        <div className={getBadgeColor(userDB?.role)}>
                                            {userDB?.role}
                                        </div>
                                        <li className="pl-2 text-[0.95rem] font-semibold">{userDB?.email}</li>
                                        <li className="pl-2 text-[0.95rem] font-semibold">{userDB?.name}</li>

                                        <hr className="mb-5" />

                                        <div className="flex items-center gap-2">
                                            {
                                                userDB && (
                                                    userDB.role === "admin" ? (
                                                        <div className="label ml-2">Admin Menu</div>
                                                    ) : userDB.role === "delivery man" ? (
                                                        <div className="label ml-2">Delivery Menu</div>
                                                    ) : (
                                                        <div className="label ml-2">User Menu</div>
                                                    )
                                                )
                                            }
                                            <TiArrowSortedDown className="label text-md" />
                                        </div>

                                        {
                                            userDB && (
                                                userDB?.role === "admin" ? (
                                                    <li><Link className="hover:bg-pink-700 hover:text-white p-2 text-[0.95rem] font-semibold">View  {userDB.name} Profile</Link></li>
                                                ) : userDB?.role === "delivery man" ? (
                                                    <li><Link className="hover:bg-blue-500 hover:text-white p-2 text-[0.95rem] font-semibold">View {userDB.name} Profile</Link></li>
                                                ) : (
                                                    <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">View {userDB.name} Profile</Link></li>
                                                )
                                            )
                                        }

                                        {
                                            userDB && (
                                                userDB?.role === "admin" ? (
                                                    <li><Link className="hover:bg-pink-700 hover:text-white p-2 text-[0.95rem] font-semibold">Add Menu</Link></li>
                                                ) : userDB?.role === "delivery man" ? (
                                                    <li><Link className="hover:bg-blue-500 hover:text-white p-2 text-[0.95rem] font-semibold">View Order List</Link></li>
                                                ) : (
                                                    <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Cart</Link></li>
                                                )
                                            )
                                        }

                                        {
                                            userDB && (
                                                userDB?.role === "admin" ? (
                                                    <li><Link className="hover:bg-pink-700 hover:text-white p-2 text-[0.95rem] font-semibold">Add Coupons</Link></li>
                                                ) : userDB?.role === "delivery man" ? (
                                                    <></>
                                                ) : (
                                                    <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold"></Link>Coupons</li>
                                                )
                                            )
                                        }


                                        <hr className="mb-5" />

                                        <div className="flex items-center gap-2">
                                            {
                                                userDB && (
                                                    userDB.role === "admin" ? (
                                                        <div className="label ml-2">Admin Agreement</div>
                                                    ) : userDB.role === "delivery man" ? (
                                                        <div className="label ml-2">Delivery Man Agreement</div>
                                                    ) : (
                                                        <div className="label ml-2">User Agreement</div>
                                                    )
                                                )
                                            }
                                            <TiArrowSortedDown className="label text-md" />
                                        </div>

                                        {/* terms and conditions */}
                                        {
                                            userDB && (
                                                userDB?.role === "admin" ? (
                                                    <li><Link to={"/terms"} className="hover:bg-pink-700 hover:text-white p-2 text-[0.95rem] font-semibold">Terms and Conditions</Link ></li>
                                                ) : userDB?.role === "delivery man" ? (
                                                    <li><Link className="hover:bg-blue-500 hover:text-white p-2 text-[0.95rem] font-semibold">Terms and Conditions</Link></li>
                                                ) : (
                                                    <li><Link to={"/terms"} className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold"></Link>Terms and Conditions</li>
                                                )
                                            )
                                        }

                                        {/* privacy policy */}
                                        {
                                            userDB && (
                                                userDB?.role === "admin" ? (
                                                    <li><Link to={"/terms"} className="hover:bg-pink-700 hover:text-white p-2 text-[0.95rem] font-semibold">Privacy and Policy</Link ></li>
                                                ) : userDB?.role === "delivery man" ? (
                                                    <li><Link className="hover:bg-blue-500 hover:text-white p-2 text-[0.95rem] font-semibold">Privacy and Policy</Link></li>
                                                ) : (
                                                    <li><Link to={"/terms"} className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold"></Link>Privacy and Policy</li>
                                                )
                                            )
                                        }

                                        {/* logout button */}
                                        {
                                            userDB && (
                                                userDB?.role === "admin" ? (
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="mt-10 btn bg-none text-[0.95rem] font-semibold border-2 border-pink-700 text-pink-700 hover:bg-pink-700 hover:border-none hover:text-white"
                                                    >
                                                        Log Out
                                                    </button>
                                                ) : userDB?.role === "delivery man" ? (
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="mt-10 btn bg-none text-[0.95rem] font-semibold border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:border-none hover:text-white"
                                                    >
                                                        Log Out
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="mt-10 btn bg-none text-[0.95rem] font-semibold border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:border-none hover:text-white"
                                                    >
                                                        Log Out
                                                    </button>
                                                )
                                            )
                                        }
                                    </ul>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="btn border-2 bg-white  text-emerald-800 font-bold hover:bg-emerald-800 hover:border-2 hover:text-white">
                                        Join us
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Navbar;