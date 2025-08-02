import { footerLinks } from "@/data/landing/footerLinks";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const iconMap = {
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedin,
  FaTwitter: FaTwitter,
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-xl font-bold mb-3">TaskForge</h3>
          <p className="text-gray-400 text-sm">
            Modern project management for makers, teams, and startups.
          </p>
        </div>

        {/* Product Links */}
        <FooterList title="Product" items={footerLinks.product} />

        {/* Company Links */}
        <FooterList title="Company" items={footerLinks.company} />

        {/* Social & More */}
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <div className="flex space-x-4 mb-3">
            {footerLinks.social.map(({ icon, href }, index) => {
              const IconComponent = iconMap[icon];
              return (
                <a
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-white"
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} TaskForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterList = ({ title, items }) => (
  <div>
    <h4 className="font-semibold mb-3">{title}</h4>
    <ul className="space-y-2 text-gray-400 text-sm">
      {items.map((item, idx) => (
        <li key={idx}>
          <a href="#">{item}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
