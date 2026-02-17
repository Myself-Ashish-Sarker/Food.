import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Root = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner font-light loading-5xl"></span>
            </div>
        )
    }

    return (
        <>
            <div>
                <Navbar />
                <Outlet />
                <Footer />
            </div>

            <ToastContainer />
        </>
    );
};

export default Root;