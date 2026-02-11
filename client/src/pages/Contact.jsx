import Hero from "../components/Hero";
import contactBg from "../assets/contact-bg.jpg";

import ContactBox from "../components/ContactBox";
import Faq from "../components/Faq";

const Contact = () => {
    return (
        <div className="pt-16"> 
            <Hero
                heroBgSize={"h-[40vh]"}
                image={contactBg}
                title="Contact"
                details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error laboriosam quidem totam dolor, qui quibusdam culpa animi quaerat alias distinctio, reprehenderit dignissimos veritatis molestias. Impedit quidem fugit officiis reprehenderit natus, "
                linkText="Home"
            />

            <ContactBox />
            
            <Faq />
        </div>
    );
};

export default Contact;