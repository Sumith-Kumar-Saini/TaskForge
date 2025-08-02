import React from "react";
import FeatureCard from "@/components/FeatureCard";
import features from "@/data/landing/features";

const Features = () => {
  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex flex-col gap-2 px-4 text-center">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl">
          Powerful Features to Boost Your Workflow
        </h1>
        <p className="font-semibold md:text-xl mb-5">
          Everything you need to plan, track, and deliver your projects
          efficiently.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 px-4 md:px-10 xl:px-20">
        {features.map(({ id, title, description }) => (
          <FeatureCard key={id} title={title} description={description} />
        ))}
      </div>
    </section>
  );
};

export default Features;
