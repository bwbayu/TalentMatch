import facebook from "../assets/dashboard/facebook.svg";
import instagram from "../assets/dashboard/instagram.svg";
import twitter from "../assets/dashboard/twitter.svg";
import linkedin from "../assets/dashboard/linkedin.svg";
import youtube from "../assets/dashboard/youtube.svg";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-navyGray text-white py-4">
            <div className="flex md:flex-row flex-col justify-between items-center md:px-16 px-8">
                <div className="mb-4 md:block hidden ">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <div className="flex flex-row">
                            <p className="font-lemon text-mintGreen">Job</p>
                            <p className="font-lemon text-white">Fitte</p>
                        </div>
                    </Link>
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
                    <p className="text-sm">&copy; 2024 JobFitte. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer