import { Link } from "react-router-dom";
import facebook from "../assets/dashboard/facebook.svg";
import instagram from "../assets/dashboard/instagram.svg";
import twitter from "../assets/dashboard/twitter.svg";
import linkedin from "../assets/dashboard/linkedin.svg";
import youtube from "../assets/dashboard/youtube.svg";

const Home = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white">
            <header className="h-screen">
                {/* navbar */}
                <nav className="flex justify-between items-center md:px-8 px-4 flex-row py-3 bg-gray-600">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="public/japan2.jpg" alt="" />
                        </a>
                    </div>
                    <div className="flex gap-x-12">
                        <Link to="/upload"
                            className="text-sm font-semibold leading-6 text-black hover:text-white"
                        >
                            Unggah CV
                        </Link>
                        <Link
                            onClick={() => scrollToSection('panduan')}
                            className="text-sm font-semibold leading-6 text-black hover:text-white"
                        >
                            Panduan
                        </Link>
                    </div>
                </nav>
                {/* content */}
                <div className="flex h-full w-full items-center md:px-16 px-8 bg-slate-200 pb-14">
                    <div className="grid grid-cols-2">
                        <div className="mx-auto flex items-center">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Find job based on your CV</h1>
                                <p className="mt-6 text-sm sm:text-md leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
                                <div className="mt-10">
                                    <Link to="/upload" className="rounded-md bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-200 hover:text-blue-800 border border-blue-800">Analyze</Link>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto flex justify-center">
                            <img className="h-auto w-3/4" src="public/wendy_15.jpg" alt="wendy.jpg" />
                        </div>
                    </div>
                </div>
            </header>
            <section id="panduan" className="flex flex-col h-screen items-center md:px-16 px-8 py-10 bg-white">
                <h1 className="font-bold text-3xl sm:text-5xl text-center">Panduan Pengguna</h1>
                <div className="grid grid-cols-2 pt-10 gap-2">
                    <div className="bg-slate-400 w-52 h-52 text-center font-bold text-xl">step 1</div>
                    <div className="bg-slate-400 w-52 h-52 text-center font-bold text-xl">step 2</div>
                    <div className="bg-slate-400 w-52 h-52 text-center font-bold text-xl">step 3</div>
                    <div className="bg-slate-400 w-52 h-52 text-center font-bold text-xl">step 4</div>
                </div>
            </section>
            <footer className="bg-slate-500 text-white py-4">
                <div className="flex md:flex-row flex-col justify-between items-center md:px-16 px-8">
                    <div className="mb-4 md:block hidden">
                        <img
                            src="public/japan2.jpg"
                            alt="HospiSimulator Logo"
                            className="h-10 mx-auto" />
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex justify-center space-x-4 mb-4">
                            <a href="https://www.youtube.com">
                                <img src={youtube} alt="youtube" className="h-6 mx-auto" />
                            </a>
                            <a href="https://www.facebook.com">
                                <img src={facebook} alt="facebook" className="h-6 mx-auto" />
                            </a>
                            <a href="https://www.twitter.com">
                                <img src={twitter} alt="twitter" className="h-6 mx-auto" />
                            </a>
                            <a href="https://www.instagram.com">
                                <img src={instagram} alt="instagram" className="h-6 mx-auto" />
                            </a>
                            <a href="https://www.linkedin.com">
                                <img src={linkedin} alt="linkedin" className="h-6 mx-auto" />
                            </a>

                        </div>
                        <p className="text-sm">&copy; 2024 TalentMatch. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;