import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-emerald-800 text-white shadow-sm px-5 lg:px-15">
                <div className="flex-1">
                    <Link to={"/"} className="cursor-pointer text-3xl font-bold">Food.</Link>
                </div>
                <div className="flex-none">

                    <div className="lg:hidden dropdown dropdown-end">
                        <div tabIndex={0} >
                            <div className="w-10 rounded-full">
                                <HiOutlineMenuAlt3 className="text-3xl font-bold cursor-pointer" />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="border-2 menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52  my-5">
                            <div className="flex flex-col gap-3 text-black">
                                <Link >Home</Link>
                                <Link >Menu</Link>
                                <Link >Contact</Link>
                                <button className="btn bg-orange-400 text-white">Join us</button>
                            </div>
                        </ul>
                    </div>

                    <div className="hidden lg:block">
                        <div className="  flex items-center-safe gap-5">
                            <Link>Home</Link>
                            <Link>Menu</Link>
                            <Link>Contact</Link>
                            <button className="btn bg-orange-400 text-white">
                                <Link to={"/login"}>Join us</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;