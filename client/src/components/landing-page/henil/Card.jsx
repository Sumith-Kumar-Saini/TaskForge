import React from "react";

const Card = ({ title, description }) => {
    return <div className="flex flex-col mt-5 mb-5 gap-2 items-center justify-center px-10 md:px-0 lg:px-0 xl:px-10">
        <div className="w-full border-2 flex items-center justify-center flex-col gap-2 rounded-[7px] sm:max-w-[70%] lg:max-w-[80%] md:max-w-[80%]">
            <h1 className="font-bold">{title}</h1>
            <div className="bg-zinc-400 w-full h-[300px] flex items-center justify-center text-[#fff]">
                <h1>img/video show here</h1>
            </div>
            <p className="font-semibold text-center mb-2">{description}</p>
        </div>

    </div>;
};

export default Card;
