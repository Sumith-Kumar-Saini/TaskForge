import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Nav = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className='md:px-5 md:py-2 py-2 bg-black text-[#fff] relative'>
            <nav className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <h1 className='md:block hidden md:text-[15px]'>Logo(TaskForge)</h1>
                    <i
                        className="ri-menu-2-line text-2xl px-2 cursor-pointer md:hidden block"
                        onClick={toggleMenu}
                    ></i>
                </div>

                {/* Slide-in Menu */}
                <div
                    ref={menuRef}
                    className={`flex-col md:flex-row md:static md:h-fit md:bg-transparent md:text-[15px] md:items-center md:justify-center flex gap-3 bg-red-500 w-1/2 fixed top-0 h-screen px-3 py-1 text-2xl transition-all duration-300 ${isMenuOpen ? 'left-0' : '-left-1/2'
                        }`}
                >
                    <i
                        className="ri-close-line text-3xl self-end cursor-pointer md:hidden "
                        onClick={() => setIsMenuOpen(false)}
                    ></i>
                    <NavLink to="/features" onClick={() => setIsMenuOpen(false)}>Features</NavLink>
                    <NavLink to="/use-cases" onClick={() => setIsMenuOpen(false)}>Use Cases</NavLink>
                    <NavLink to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</NavLink>
                    <NavLink to="/roadmap" onClick={() => setIsMenuOpen(false)}>Roadmap</NavLink>
                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                </div>

                <div className='flex gap-5 justify-end px-3 py-3'>
                    <button
                        onClick={() => navigate("/sign-in")}
                        className='bg-[#0960FD] px-3 py-1 md:px-5 rounded-[5px] cursor-pointer'
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/get-started")}
                        className='bg-[#0960FD] px-3  py-1 md:px-5 rounded-[5px] cursor-pointer'
                    >
                        Get Started
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
