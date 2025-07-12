import React from "react";

const TargetUsers = () => {
    return <div className="mb-10">
        <div className="flex flex-col gap-2 mt-10 px-2 text-center">
            <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl">Built for Everyone</h1>
            <p className="font-semibold md:text-xl mb-5">Whether you work solo, in a startup, or on a big team — TaskForge helps you stay organized</p>
        </div>
        <div className="px-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 lg:px-20 xl:px-50">
            <div className="w-full lg:w1/2 h-[300px] md:h-[400px] flex flex-col items-center justify-center bg-gray-100 text-gray-400 border">
               <h1>Freelancers</h1>
               <p>Track multiple client projects effortlessly.</p>
            </div>
            <div className="w-full lg:w1/2 h-[300px] md:h-[400px] flex flex-col items-center justify-center bg-gray-100 text-gray-400 border">
               <h1>Developers</h1>
               <p>Manage sprints, bugs, and features in one place</p>
            </div>
             <div className="w-full lg:w1/2 h-[300px] md:h-[400px] flex flex-col items-center justify-center bg-gray-100 text-gray-400 border">
               <h1>Startups</h1>
               <p>Keep your team aligned and your roadmap clear.</p>
            </div>
             <div className="w-full lg:w1/2 h-[300px] md:h-[400px] flex flex-col items-center justify-center bg-gray-100 text-gray-400 border">
               <h1>Designers</h1>
               <p>Organize design tasks and share updates easily</p>
            </div>
        </div>
    </div>;
};

export default TargetUsers;
