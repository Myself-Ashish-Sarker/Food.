import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";

const Root = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Root;