import Nav from "@/components/common/Nav";
import Footer from "@/components/common/Footer";

const LandingLayout = ({ children }) => (
  <>
    <Nav />
    <main>{children}</main>
    <Footer />
  </>
);

export default LandingLayout;
