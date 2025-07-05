import React from "react";

const TempLandingPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <div
        id="box"
        className="w-fit flex justify-center items-center gap-6 relative"
      >
        <h1 className="text-7xl font-sans font-bold text-white">TaskForge</h1>
        <div
          id="blink"
          className="w-10 h-20 bg-zinc-100 animate-blink animation-delay-0.5s"
          style={{ animation: "blink 1s infinite" }}
        ></div>
      </div>
    </div>
  );
};

export default TempLandingPage;
