import { FaAddressBook, FaClock, FaMobile } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const ContactBox = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between px-3 md:px-20 lg:px-50 mt-24 py-2 ">
                <div>
                    <h1 className="text-4xl lg:text-5xl text-emerald-700 font-black">Get In Touch</h1>

                    <p className="mt-5 max-w-120 mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi ab temporibus placeat delectus sapiente doloribus expedita ullam odio veniam corporis.</p>

                    <div className="grid lg:grid-cols-2 gap-5">

                        <div className="flex items-center gap-2 border-2 p-4 rounded-sm border-emerald-600">
                            <FaAddressBook className="text-5xl" />
                            <div className="flex flex-col">
                                <p className=" text-lg font-semibold text-emerald-700">Address</p>
                                <p className="text-sm">1234, abcdefg, xyz</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 border-2 p-4 rounded-sm border-emerald-600">
                            <FaMobile className="text-5xl" />
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold text-emerald-700">Phone</p>
                                <p className="text-sm">(+880)123456789</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border-2 p-4 rounded-sm border-emerald-600">
                            <FaClock className="text-5xl" />
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold text-emerald-700">Availability</p>
                                <p className="text-sm">Day 9:00am - 5:00pm</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border-2 p-4 rounded-sm border-emerald-600">
                            <MdEmail className="text-5xl" />
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold text-emerald-700">Email</p>
                                <p className="text-sm">myselfashishsarker@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body  mt-7 lg:mt-0 rounded-sm  shadow-2xl bg-base-200 max-w-96 py-10 border-2 border-emerald-700">
                    <h1 className="text-3xl font-bold">Contact Box.</h1>

                    <form action="">

                        <div className="mb-5"></div>

                        <label className="label text-emerald-700 font-semibold">Username</label>
                        <input name="name" type="text" className="input pb" placeholder="Username" />

                        <div className="mb-3"></div>

                        <label className="label text-emerald-700 font-semibold">Email</label>
                        <input name="email" type="email" className="input" placeholder="Email" />

                        <div className="mb-3"></div>

                        <label className="label text-emerald-700 font-semibold">Message</label>
                        <textarea className="textarea" placeholder="What's on your mind?"></textarea>

                        <button className="btn bg-emerald-700 text-white mt-4">Send Message</button>
                    </form>

                    <div className="mb-2"></div>
                </div>
            </div>
        </div>
    );
};

export default ContactBox;