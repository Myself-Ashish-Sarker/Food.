import Hero from "../components/Hero";
import heroHomeImg from "../assets/hero2.jpg";
import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Bounce, Slide, toast, } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {

    const {user} = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const [userDB, setUserDB] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/users/${user?.email}`)
                .then(res => {
                    console.log(res.data);
                    setUserDB(res.data)
                }).catch(err => {
                    console.error(err);
                    
                })
        };
    }, [axiosPublic])

    useEffect(() => {
        if (location.state?.registerSuccess && userDB) {
            toast.success(`Hi ${userDB.fname} , Glad you joined! `, {
                position: "top-right",
                autoClose: 1500,
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
    }, [location.state, navigate, userDB])

    useEffect(() => {
        if (location.state?.loginSuccess && userDB) {
            toast.success(`Welcome back ${userDB.fname} ${userDB.lname}!!`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });

            navigate(location.pathname, { replace: true })
        }
    }, [location.state, navigate, userDB])


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
        </>
    );
};

export default Home;