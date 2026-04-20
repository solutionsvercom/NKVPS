import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SchoolLogo from '@/components/website/SchoolLogo';

const navLinks = [
  { path: '/Home', label: 'Home' },
  { path: '/About', label: 'About Us' },
  { path: '/Programs', label: 'Programs' },
  { path: '/Facilities', label: 'Facilities' },
  { path: '/Gallery', label: 'Gallery' },
  { path: '/Admissions', label: 'Admissions' },
  { path: '/Contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_8px_24px_rgba(108,99,255,0.08)]' : 'bg-white/95 backdrop-blur-sm'} border-b border-indigo-100/70`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/Home" className="flex items-center gap-3 min-w-0">
            <SchoolLogo className="h-11 w-11 sm:h-12 sm:w-12 object-contain shrink-0 rounded-full" />
            <div className="nav-brand-text min-w-0">
              <h2 className="nav-school-name">
                <span className="blue">NavJyoti</span>{' '}
                <span className="green">Kids Villa</span>
              </h2>
              <p className="nav-tagline">a Mother&apos;s Lap</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#6C63FF]'
                    : 'text-gray-500 hover:text-[#6C63FF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/Admissions" className="bg-[#6C63FF] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#5b53e7] transition-all hover:scale-[1.03] shadow-md shadow-[#6C63FF]/25">
              Apply Now
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-[#F9FAFF] text-[#6C63FF]'
                      : 'text-gray-600 hover:bg-indigo-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link to="/Admissions" onClick={() => setOpen(false)} className="bg-[#6C63FF] text-white text-sm font-medium px-4 py-2.5 rounded-xl text-center shadow-md shadow-[#6C63FF]/20">Apply Now</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}