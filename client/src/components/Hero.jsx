import { Link } from "react-router";

const Hero = ({heroBgSize, image, title, details, buttonClass, buttonText, linkText, path1, path2}) => {
    return (
        <>
            <div
                className={` hero ${heroBgSize}`}
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                        <p className="mb-5 lg:w-200 mx-auto text-center">
                            {details}
                        </p>
                        {
                            buttonText && (
                                <button className={`btn ${buttonClass}`}>{buttonText}</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
export default Hero;