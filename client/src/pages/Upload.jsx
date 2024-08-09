import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Upload = () => {

    return (
        <div className="bg-white flex flex-col min-h-screen w-screen">
            <header>
                <nav className="flex justify-between items-center md:px-8 px-4 py-3 bg-gray-600">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="public/japan2.jpg" alt="" />
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="flex-grow">
                {/* Konten utama di sini */}
            </main>
            <Footer />
        </div>
    );
};

export default Upload;
