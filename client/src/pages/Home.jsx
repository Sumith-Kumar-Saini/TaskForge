import Hero from "@/layouts/landing-page/henil/Hero";
import Nav from "@/layouts/landing-page/henil/Nav";
import Features from "@/layouts/landing-page/henil/Features";
import Showcase from "@/layouts/landing-page/henil/Showcase";
import TargetUsers from "@/layouts/landing-page/henil/TargetUsers";
const Home = () => {
  return <div>
    <Nav />
    <Hero />
    <Features />
    <Showcase />
    <TargetUsers/>
    <WhyChooseTaskForge /> 
    <TestimonialsSection /> 
    <PricingSection /> 
    <Footer />
  </div>;
};

export default Home;
