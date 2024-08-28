import { Link, useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import Footer from "../components/Footer";
import { ScrollToSection } from "../utils";
import { MagnifyingGlass, Note, NotePencil, Upload } from "@phosphor-icons/react";
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen w-fit">
            <header>
                {/* navbar */}
                <nav className="flex justify-between items-center md:px-8 px-4 flex-row py-3 bg-navyGray">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <div className="flex flex-row">
                                <p className="font-lemon text-mintGreen">Job</p>
                                <p className="font-lemon text-white">Fitte</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex gap-x-12">
                        <Link to="/upload"
                            className="text-sm font-semibold leading-6 text-white hover:text-mintGreen"
                        >
                            Upload CV
                        </Link>
                        <Link
                            onClick={() => ScrollToSection('panduan')}
                            className="text-sm font-semibold leading-6 text-white hover:text-mintGreen"
                        >
                            Guide
                        </Link>
                    </div>
                </nav>
                {/* content */}
                <div className="flex h-screen items-center bg-slateGray md:py-16 md:px-16 px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Bagian Teks */}
                        <div className="flex items-center order-2 lg:order-1 mx-auto">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold tracking-tight text-mintGreen lg:text-5xl">Find Your Perfect Job Match Effortlessly</h1>
                                <p className="mt-6 text-sm sm:text-md text-white">
                                    Tailor your resume to the right opportunities in seconds. Our smart matching technology analyzes your skills and experiences, comparing them with job descriptions to ensure you never miss the perfect fit. Whether you&apos;re kickstarting your career or seeking a new challenge, we&apos;ll help you stand out to employers and land the job that aligns with your goals. Discover a more efficient way to connect with the roles that matter most to you.
                                </p>
                                <div className="mt-5">
                                    <ActionButton handleClick={() => navigate('/upload')} text="Analyze" />
                                </div>
                            </div>
                        </div>

                        {/* Bagian Gambar */}
                        <div className="flex justify-center order-1 lg:order-2 mx-auto">
                            <img className="w-1/2 lg:w-3/4 lg:h-auto" src="home.jpg" alt="Content" />
                        </div>
                    </div>
                </div>
            </header>
            <section id="panduan" className="flex flex-col h-screen items-center md:px-16 px-8 py-10 bg-white">
                <h1 className="font-semibold text-3xl sm:text-5xl text-center">User Guide</h1>
                <div className="grid md:grid-cols-2 pt-10 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-52 text-center text-xl flex flex-col justify-center items-center">
                            <p className="font-bold">Step 1</p>
                            <Upload size={120} weight="fill" color="#43455C" />
                            <p className="font-semibold">
                                Upload or Paste Your Resume
                            </p>
                        </div>
                        <div className="hidden md:block"></div>
                        <div className="hidden md:block"></div>
                        <div className="w-52 text-center text-xl flex flex-col justify-center items-center">
                            <p className="font-bold">Step 2</p>
                            <NotePencil size={120} color="#43455C" />
                            <p className="font-semibold">
                                Input Your Job Description
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-52 text-center text-xl flex flex-col justify-center items-center">
                            <p className="font-bold">Step 3</p>
                            <MagnifyingGlass size={120} color="#43455C" />
                            <p className="font-semibold">
                                Start Analyzing
                            </p>
                        </div>
                        <div className="hidden md:block"></div>
                        <div className="hidden md:block"></div>
                        <div className="w-52 text-center text-xl flex flex-col justify-center items-center">
                            <p className="font-bold">Step 4</p>
                            <Note size={120} weight="fill" color="#43455C" />
                            <p className="font-semibold">
                                Get Your Result in a Second
                            </p>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </div>
    );
};

export default Home;