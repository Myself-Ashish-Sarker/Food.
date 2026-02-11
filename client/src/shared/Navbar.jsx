import { useContext } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaRegFaceLaughBeam } from "react-icons/fa6";

const Navbar = () => {

    const { user, loading, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    return (
        <>
            <div className="fixed z-50 navbar bg-emerald-800  shadow-sm px-5 lg:px-15">
                <div className="flex-1">
                    <Link to={"/"} className="cursor-pointer text-3xl font-bold text-white">Food.</Link>
                </div>
                <div className="flex-none">

                    <div className="lg:hidden dropdown dropdown-end">
                        <div tabIndex={0} className=""> <HiOutlineMenuAlt3 className="text-3xl text-white font-bold cursor-pointer" /></div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            {
                                user ?
                                    (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <div className="label ml-2">User Info</div>
                                                <TiArrowSortedDown className="label text-md" />
                                            </div>

                                            <li className="p-2 text-[0.95rem] font-semibold text-black">{user.email}</li>

                                            <hr className="mb-5" />

                                            <div className="flex items-center gap-2">
                                                <div className="label ml-2">User Menu</div>
                                                <TiArrowSortedDown className="label text-md" />
                                            </div>

                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Profile</Link></li>
                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Cart</Link></li>
                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Coupons</Link></li>

                                            <hr className="mb-5" />

                                            <div className="flex items-center gap-2">
                                                <div className="label ml-2">Local Menu</div>
                                                <TiArrowSortedDown className="label text-md" />
                                            </div>

                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Home</Link></li>
                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Menu</Link></li>
                                            <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Contact</Link></li>

                                            <button className="mt-5 btn border-2 border-emerald-800 text-black hover:text-white hover:bg-emerald-800 hover:border-none">Sign Out</button>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <li><Link to={"/"} className="">Home</Link></li>
                                            <li><Link to={"/meu"} className="">Menu</Link></li>
                                            <li><Link to={"/contact"} className="">Contact</Link></li>
                                        </>
                                    )
                            }
                        </ul>
                    </div>

                    <div className="hidden lg:block">
                        <div className="flex items-center-safe gap-5">
                            <Link className="text-white font-semibold" to={"/"}>Home</Link>
                            <Link className="text-white font-semibold">Menu</Link>
                            <Link className="text-white font-semibold" to={"/contact"}>Contact</Link>

                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : user ? (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0}  className="">
                                        <div className=" rounded-full">
                                            <FaRegFaceLaughBeam className="cursor-pointer text-white text-3xl hover:text-4xl transform transition-all delay-150" />
                                        </div>
                                    </div>
                                    <ul className="menu menu-sm dropdown-content border-2 space-y-3 border-emerald-700 bg-base-100 text-black z-1 mt-3 w-52 p-2 shadow">

                                        <li className="p-2 text-[0.95rem] font-semibold">{user.email}</li>

                                        <hr className="mb-5" />

                                        <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Profile</Link></li>
                                        <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Cart</Link></li>
                                        <li><Link className="hover:bg-emerald-700 hover:text-white p-2 text-[0.95rem] font-semibold">Coupons</Link></li>

                                        <li>
                                            <button
                                                onClick={handleLogOut}
                                                className="mt-10 btn bg-none text-[0.95rem] font-semibold border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:border-none hover:text-white"
                                            >
                                                Log Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="btn bg-orange-400 text-white">
                                        Join us
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;