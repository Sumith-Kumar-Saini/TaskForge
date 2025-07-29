import React from "react";
import Card from "@/components/landing-page/henil/Card";

const Features = () => {
    return <div>
        <div className="flex flex-col gap-2 mt-10 px-2 text-center">
            <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl">Powerful Features to Boost Your Workflow</h1>
            <p className="font-semibold md:text-xl mb-5">Everything you need to plan, track, and deliver your projects efficiently.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <Card
                title="✅ Task Management"
                description="Create, organize, and track all your tasks from a single dashboard"
            />
            <Card
                title="⚙️ Custom Workflows "
                description="Adapt TaskForge to match your team’s unique way of working."
            />
            <Card
                title="📊 Analytics "
                description="Gain insights into progress, deadlines, and performance at a glance."
            />
            <Card
                title="👥 Collaboration"
                description="Work together seamlessly with real-time updates and shared boards"
            />
            
        </div>
    </div>;
};

export default Features;
