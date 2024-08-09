import facebook from "../assets/dashboard/facebook.svg";
import instagram from "../assets/dashboard/instagram.svg";
import twitter from "../assets/dashboard/twitter.svg";
import linkedin from "../assets/dashboard/linkedin.svg";
import youtube from "../assets/dashboard/youtube.svg";

const Footer = () => {
    return (
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
    )
}

export default Footer