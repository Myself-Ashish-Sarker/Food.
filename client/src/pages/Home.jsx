import Hero from "../components/Hero";
import heroHomeImg from "../assets/hero2.jpg";

const Home = () => {
    return (
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
    );
};

export default Home;