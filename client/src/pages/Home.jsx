import LandingLayout from "@/layouts/LandingLayout";

import Hero from "@/sections/landing/Hero";
import Features from "@/sections/landing/Features";
import Showcase from "@/sections/landing/Showcase";
import Audience from "@/sections/landing/Audience";
import Benefits from "@/sections/landing/Benefits";
import Testimonials from "@/sections/landing/Testimonials";
import Pricing from "@/sections/landing/Pricing";

const Home = () => {
  return (
    <LandingLayout>
      <Hero />
      <Features />
      <Showcase />
      <Audience />
      <Benefits />
      <Testimonials />
      <Pricing />
    </LandingLayout>
  );
};

export default Home;
