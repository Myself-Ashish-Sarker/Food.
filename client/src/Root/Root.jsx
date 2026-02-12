import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
    return (
        <>
            <div>
                <Navbar />
                <Outlet />
                <Footer />
            </div>

            <div className="mt-5 pt-5">
                <ToastContainer />
            </div>
        </>
    );
};

export default Root;