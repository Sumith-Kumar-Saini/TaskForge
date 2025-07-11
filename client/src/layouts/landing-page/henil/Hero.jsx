import React from "react";
import { useNavigate } from "react-router";
import centerImage from "@/assets/center-img.png"
const Hero = () => {
    const navigate = useNavigate()
    return <div className="flex flex-col gap-10 md:flex-row md:gap-2  md:justify-between md:mt-10">
        <div className="gap-3 flex flex-col md:w-[80%]">
            <h1 className="font-bold text-2xl px-3 mt-5 text-center md:text-3xl lg:text-6xl">Effortless Project Management for Modern Teams</h1>
            <p className="text-center mt-2 mb-2 px-[3px]">Organize, collaborate, and track your projects easily.</p>
            <div className="text-[#fff] flex items-center gap-5 justify-center">
                <button onClick={() => navigate("/get-started-free")} className='bg-[#0960FD] px-5 rounded-[5px] py-2'>Get Started Free</button>
                <button onClick={() => navigate("/view-demo")} className='bg-[#0960FD] px-5 rounded-[5px] py-2'>View Demo</button>
            </div>
        </div>
        <div className="flex items-center justify-center md:w-[50%]">
            <img src={centerImage} alt="" className="w-[60%]  md:w-2/3 rounded-full aspect-square" />
        </div>
    </div>;
};

export default Hero;
