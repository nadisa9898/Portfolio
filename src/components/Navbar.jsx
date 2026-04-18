import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent background scrolling when overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, mobileMenuOpen ? 200 : 0);
    }
  };

  const handleMyWorkClick = () => {
    setMobileMenuOpen(false);
    navigate('/my-work');
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-[999] bg-[#E3E3CE] md:bg-[#FAFAF4]/50 rounded-none md:rounded-full px-6 md:px-17.5 py-4 flex justify-between items-center -mx-4 md:mx-0 transition-all duration-300 transform-gpu">
        <img src="/images/logo1.png" alt="Logo" className="h-10 cursor-pointer relative z-[1000]" onClick={() => handleNavClick('home')} />

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-10 text-sm">
          <li
            onClick={() => handleNavClick('home')}
            className="cursor-pointer text-[#242424] font-semibold hover:text-gray-500"
          >
            Home
          </li>
          <li
            onClick={handleMyWorkClick}
            className="cursor-pointer text-[#242424] font-semibold hover:text-gray-500"
          >
            My Work
          </li>
          <li
            onClick={() => handleNavClick('contact')}
            className="cursor-pointer text-[#242424] font-semibold hover:text-gray-500"
          >
            Contact Me
          </li>
        </ul>

        {/* Desktop icons */}
        <div className="hidden md:flex gap-4 items-center">
          <img src="/images/Svg/cv.svg" className="w-8 cursor-pointer" alt="CV" />
          <a
            href="https://www.linkedin.com/in/nadia-nisa-63998a266/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-block"
          >
            <img src="/images/Svg/Linkdin.svg" className="w-8" alt="LinkedIn" />
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex justify-center items-center w-8 h-8 cursor-pointer relative z-[1000]"
          aria-label="Toggle menu"
        >
          <span
            className={`absolute block w-6 h-0.5 bg-[#242424] rounded transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          ></span>
          <span
            className={`absolute block w-6 h-0.5 bg-[#242424] rounded transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`absolute block w-6 h-0.5 bg-[#242424] rounded transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          ></span>
        </button>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-[990] bg-[#E3E3CE] flex-col md:hidden transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } flex`}
      >
        <div className="pt-24 flex flex-col items-center h-full overflow-y-auto">
          {/* Nav links */}
          <ul className="flex flex-col items-center gap-8 mt-10 text-lg font-semibold text-[#242424]">
            <li className="cursor-pointer" onClick={() => handleNavClick('home')}>
              Home
            </li>
            <li className="cursor-pointer" onClick={handleMyWorkClick}>
              My Work
            </li>
            <li className="cursor-pointer" onClick={() => handleNavClick('contact')}>
              Contact Me
            </li>
          </ul>

          {/* Social icons */}
          <div className="flex flex-col items-center gap-5 mt-12 pb-10">
            <img src="/images/Svg/cv.svg" className="w-7 cursor-pointer" alt="CV" />
            <img src="/images/Svg/Linkdin.svg" className="w-7 cursor-pointer" alt="LinkedIn" />
          </div>
        </div>
      </div>
    </>
  );
}
