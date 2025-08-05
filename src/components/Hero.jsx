import React from "react";
import { IoBagHandleOutline, IoClipboardOutline, IoClipboardSharp, IoListOutline } from "react-icons/io5";
import HeroImg from "../assets/images/Hero.png"
import { useNavigate } from "react-router-dom";

export default function Hero() {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/book-appointment");
    }

    return (
        <>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative bg-back px-14">

                    {/* Brand Info */}
                    <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
                        <div className="text-center md:text-left space-y-6 lg:max-w-[400px]">
                            <h1 className="text-4xl md:text-6xl font-bold leading-relaxed md:leading-relaxed font-averia whitespace-nowrap text-primary">
                                Quality Healthcare <br />
                                <span className="text-secondary">Anytime, Anywhere !</span>
                            </h1>
                            <p className="text-2xl tracking-wide text-white">Your Health, Our Priority, Your Care.</p>
                            <p className="text-gray-400 text-justify">
                                Get trusted medical advice from top doctors without stepping out of your home.
                                Book online consultations and receive expert healthcare at your convenience.
                            </p>

                            {/* Button Section */}
                            <div className="flex justify-center md:justify-start">
                                <button className="primary-btn flex items-center gap-2" onClick={handleNavigation}>
                                    <span>
                                        <IoClipboardSharp />
                                    </span>
                                    Make Appointment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Hero Images */}
                    <div className="flex justify-center items-center">
                        <img src={HeroImg} alt="" className="drop-shadow" />
                    </div>
                </div>
            </section>
        </>
    );
}