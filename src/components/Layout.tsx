import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import { businessInfo } from '../data/config';

interface LayoutProps { children: React.ReactNode; }

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileMenuOpen(false); window.scrollTo(0, 0); }, [location]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About Amber' },
    { to: '/nail-care', label: 'Nail Care' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-xl md:text-2xl font-semibold text-[#2D2926] tracking-wide">Treasured Tips</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors hover:text-[#6B5B4E] ${location.pathname === link.to ? 'text-[#6B5B4E]' : 'text-[#2D2926]/70'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link to="/book" className="hidden md:inline-block bg-[#2D2926] text-[#FDFBF7] px-5 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors btn-press">Book Now</Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#2D2926]" aria-label="Toggle menu">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E8DDD3] animate-fade-in">
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className={`block text-base font-medium py-2 ${location.pathname === link.to ? 'text-[#6B5B4E]' : 'text-[#2D2926]/80'}`}>{link.label}</Link>
              ))}
              <Link to="/book" className="block bg-[#2D2926] text-[#FDFBF7] text-center py-3 text-sm font-medium uppercase tracking-wider mt-6">Book an Appointment</Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 pt-16 md:pt-20">{children}</main>

      <footer className="bg-[#2D2926] text-[#FDFBF7]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <h3 className="font-serif text-2xl text-[#FDFBF7] mb-3">Treasured Tips</h3>
              <p className="text-sm text-[#FDFBF7]/60 leading-relaxed">{businessInfo.tagline}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FDFBF7] uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/services" className="text-sm hover:text-[#FDFBF7] transition-colors">Services</Link></li>
                <li><Link to="/gallery" className="text-sm hover:text-[#FDFBF7] transition-colors">Gallery</Link></li>
                <li><Link to="/about" className="text-sm hover:text-[#FDFBF7] transition-colors">About Amber</Link></li>
                <li><Link to="/book" className="text-sm hover:text-[#FDFBF7] transition-colors">Book Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FDFBF7] uppercase tracking-wider mb-4">Information</h4>
              <ul className="space-y-2">
                <li><Link to="/nail-care" className="text-sm hover:text-[#FDFBF7] transition-colors">Nail Care</Link></li>
                <li><Link to="/contact" className="text-sm hover:text-[#FDFBF7] transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="text-sm hover:text-[#FDFBF7] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm hover:text-[#FDFBF7] transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/cookies" className="text-sm hover:text-[#FDFBF7] transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FDFBF7] uppercase tracking-wider mb-4">Connect</h4>
              <div className="flex items-center gap-3 mb-4">
                <a href="#" className="p-2 border border-[#FDFBF7]/20 rounded-full hover:border-[#FDFBF7]/50 transition-colors"><Instagram size={18} /></a>
              </div>
              <Link to="/book" className="inline-block mt-2 px-5 py-2.5 border border-[#FDFBF7]/30 text-[#FDFBF7] text-sm font-medium hover:bg-[#FDFBF7] hover:text-[#2D2926] transition-all">Book an Appointment</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#FDFBF7]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#FDFBF7]/40">© {new Date().getFullYear()} Treasured Tips. All rights reserved.</p>
            <p className="text-xs text-[#FDFBF7]/40">Personalised nail care by Amber</p>
          </div>
        </div>
      </footer>

      <div className="mobile-sticky-cta">
        <Link to="/book" className="block bg-[#2D2926] text-[#FDFBF7] text-center py-3 text-sm font-medium uppercase tracking-wider">Book an Appointment</Link>
      </div>
    </div>
  );
}
