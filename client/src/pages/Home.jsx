import { Link, useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import Footer from "../components/Footer";
import ScrollToSection from "../utils";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white flex flex-col min-h-screen w-fit">
            <header>
                {/* navbar */}
                <nav className="flex justify-between items-center md:px-8 px-4 flex-row py-3 bg-gray-600">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="public/japan2.jpg" alt="" />
                        </Link>
                    </div>
                    <div className="flex gap-x-12">
                        <Link to="/upload"
                            className="text-sm font-semibold leading-6 text-black hover:text-white"
                        >
                            Unggah CV
                        </Link>
                        <Link
                            onClick={() => ScrollToSection('panduan')}
                            className="text-sm font-semibold leading-6 text-black hover:text-white"
                        >
                            Panduan
                        </Link>
                    </div>
                </nav>
                {/* content */}
                <div className="flex h-screen items-center md:px-16 px-8 bg-slate-200 pb-14">
                    <div className="grid grid-cols-2">
                        <div className="mx-auto flex items-center">
                            <div className="text-start">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Find job based on your CV</h1>
                                <p className="mt-6 text-sm sm:text-md leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
                                <div className="mt-5">
                                    {/* <Link to="/upload" className="rounded-md bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-200 hover:text-blue-800 border border-blue-800">Analyze</Link> */}
                                    <ActionButton handleClick={() => navigate('/upload')} text="Analyze" />
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
            <Footer />
        </div>
    );
};

export default Home;