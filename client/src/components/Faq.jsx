import faq from '../assets/faq-bg.jpg'

const Faq = () => {
    return (
        <>
            <div className="mt-50 flex justify-center">
                <h1 className="text-left lg:text-center px-4 lg:px-0 font-bold text-5xl/18 w-auto max-w-180">Your Common Quries <span className="text-emerald-700">Answered</span> with Additional FAQs</h1>
            </div>

            <div className="px-6 lg:px-20 mt-16">
                <div className="flex flex-col lg:flex-row items-center gap-10">

                    {/* FAQ Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div
                            tabIndex={0}
                            className="bg-base-200 border-2 border-black text-black focus:bg-emerald-700 focus:text-secondary-content collapse"
                        >
                            <div className="collapse-title font-semibold">
                                How do I create an account?
                            </div>
                            <div className="collapse-content text-sm">
                                Click the "Sign Up" button in the top right corner and follow the registration process.
                            </div>
                        </div>

                        <div
                            tabIndex={0}
                            className="bg-base-200 border-2 border-black text-black focus:bg-emerald-700 focus:text-secondary-content collapse"
                        >
                            <div className="collapse-title font-semibold">
                                How do I create an account?
                            </div>
                            <div className="collapse-content text-sm">
                                Click the "Sign Up" button in the top right corner and follow the registration process.
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="bg-base-200 border-2 border-black text-black focus:bg-emerald-700 focus:text-secondary-content collapse"
                        >
                            <div className="collapse-title font-semibold">
                                How do I create an account?
                            </div>
                            <div className="collapse-content text-sm">
                                Click the "Sign Up" button in the top right corner and follow the registration process.
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="bg-base-200 border-2 border-black text-black focus:bg-emerald-700 focus:text-secondary-content collapse"
                        >
                            <div className="collapse-title font-semibold">
                                How do I create an account?
                            </div>
                            <div className="collapse-content text-sm">
                                Click the "Sign Up" button in the top right corner and follow the registration process.
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="bg-base-200 border-2 border-black text-black focus:bg-emerald-700 focus:text-secondary-content collapse"
                        >
                            <div className="collapse-title font-semibold">
                                How do I create an account?
                            </div>
                            <div className="collapse-content text-sm">
                                Click the "Sign Up" button in the top right corner and follow the registration process.
                            </div>
                        </div>

                        {/* duplicate collapses */}
                    </div>

                    {/* Image Section */}
                    <div className="hidden lg:block w-full lg:w-1/2 flex justify-center">
                        <img
                            src={faq}
                            alt="FAQ"
                            className="max-w-full h-auto rounded-xl"
                        />
                    </div>

                </div>
            </div>

        </>
    );
};

export default Faq;