import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleClick = (e) => {
        e.stopPropagation();
        setIsMenuOpen(prev => !prev);
    };

    return (
        <div className="md:px-5 md:py-2 py-2 bg-black text-[#fff] relative">
            <nav className="flex items-center justify-between relative z-30">
                <div className="flex items-center">
                    <h1 className="md:block hidden md:text-[15px]">Logo(TaskForge)</h1>
                    <svg
                        className="ri-menu-2-line text-2xl px-2 cursor-pointer md:hidden block w-10 h-10 text-white"
                        onClick={handleToggleClick}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 1H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M1 7H9.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M1 13H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M1 19H9.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-10 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                )}

                {/* Slide-in Menu */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`z-20 flex-col md:flex-row md:static md:h-fit md:bg-transparent md:text-[15px] md:items-center md:justify-center flex gap-3 bg-red-500 w-full h-fit fixed pb-10 top-0 md:pb-0 md:w-fit text-center px-3 py-1 text-2xl md:transition-none transition-all duration-300 ${isMenuOpen ? 'left-0' : '-left-[100%]'
                        }`}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ri-close-line mt-2 text-3xl self-end cursor-pointer md:hidden"
                        onClick={() => setIsMenuOpen(false)}>
                        <g clipPath="url(#clip0_1_27804)">
                            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M9 9L15 15M15 9L9 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_27804">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <NavLink to="/features" onClick={() => setIsMenuOpen(false)}>Features</NavLink>
                    <NavLink to="/use-cases" onClick={() => setIsMenuOpen(false)}>Use Cases</NavLink>
                    <NavLink to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</NavLink>
                    <NavLink to="/roadmap" onClick={() => setIsMenuOpen(false)}>Roadmap</NavLink>
                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                </div>

                {/* Buttons */}
                <div className="flex gap-5 justify-end px-3 py-3">
                    <button
                        onClick={() => navigate('/sign-in')}
                        className="bg-[#0960FD] px-3 py-1 md:px-5 rounded-[5px] cursor-pointer"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/get-started')}
                        className="bg-[#0960FD] px-3 py-1 md:px-5 rounded-[5px] cursor-pointer"
                    >
                        Get Started
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
