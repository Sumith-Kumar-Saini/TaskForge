import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
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
                <div>
                    <h4 className="font-semibold mb-3">Product</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Integrations</a></li>
                        <li><a href="#">Roadmap</a></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="font-semibold mb-3">Company</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>

                {/* Social & More */}
                <div>
                    <h4 className="font-semibold mb-3">Connect</h4>
                    <div className="flex space-x-4 mb-3">
                        <a href="#" className="text-gray-400 hover:text-white"><FaGithub size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
                    </div>
                    <p className="text-gray-400 text-xs">
                        © {new Date().getFullYear()} TaskForge. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
