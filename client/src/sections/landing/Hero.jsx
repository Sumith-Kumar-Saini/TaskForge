import React from "react";
import centerImage from "@/assets/images/Hero Image.jpg";

const Hero = () => {
  return (
    <section className="flex flex-col gap-10 items-cente lg:flex-row w-full lg:justify-between lg:mt-10 px-6">
      <div className="gap-3 flex flex-col">
        <h1 className="font-bold text-2xl mt-5 text-center md:text-left md:text-5xl lg:text-6xl">
          Effortless Project Management for Modern Teams
        </h1>
        <p className="text-center md:text-left mb-4 md:text-xl">
          Organize, collaborate, and track your projects easily.
        </p>
        <div className="text-[#fff] flex items-center gap-5 justify-center">
          <button
            // onClick={/* onclick function */}
            className="bg-[#0960FD] px-5 rounded-[5px] py-2"
          >
            Get Started Free
          </button>
          <button
            // onClick={/* onclick function */}
            className="bg-[#0960FD] px-5 rounded-[5px] py-2"
          >
            View Demo
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center lg:w-[40%] lg:pr-2">
        <img
          src={centerImage}
          alt=""
          className="w-[300px] lg:w-[400px] rounded-sm aspect-square"
        />
      </div>
    </section>
  );
};

export default Hero;
