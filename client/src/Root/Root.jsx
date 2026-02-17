import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { RotatingSquare } from "react-loader-spinner";

const Root = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <RotatingSquare
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="rotating-square-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
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