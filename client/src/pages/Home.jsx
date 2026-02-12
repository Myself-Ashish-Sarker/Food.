import Hero from "../components/Hero";
import heroHomeImg from "../assets/hero2.jpg";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Home = () => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.loginSuccess) {
            toast.success('Welcome back!!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            navigate(location.pathname, { replace: true })
        }
    }, [location.state])


    return (
        <>
            <div className="pt-15">

                <Hero
                    heroBgSize={"h-[70vh]"}
                    image={heroHomeImg}
                    title="Welcome to Food."
                    details=" Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi."
                    buttonText="Check Menu"
                    buttonClass={"btn-warning text-white"}
                />
            </div>

            <ToastContainer />
        </>
    );
};

export default Home;