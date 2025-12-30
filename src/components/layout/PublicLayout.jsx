import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowRight, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Button from '../ui/Button';

const PublicLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-primary-900 text-primary-100 py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="mailto:info@eduprime.edu" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} /> info@eduprime.edu
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} /> +91 98765 43210
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors"><Facebook size={16} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={16} /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram size={16} /></a>
            <a href="#" className="hover:text-white transition-colors"><Youtube size={16} /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white border-b border-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-primary-900">EduPrime</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors relative py-2 ${isActive(link.path)
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                    }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/admin/login">
                <Button variant="ghost" size="sm">Staff Login</Button>
              </Link>
              <Button size="sm" className="shadow-lg shadow-primary-500/25">
                Enquire Now <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t shadow-xl transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`p-3 rounded-lg font-medium transition-colors ${isActive(link.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'hover:bg-gray-50 text-gray-700'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/admin/login" className="p-3 text-gray-600 font-medium">Staff Login</Link>
            <Button className="mt-2 w-full">Enquire Now</Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold text-white">EduPrime</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Empowering students since 2009. We transform dreams into reality through quality education and dedicated mentorship.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
                <li><Link to="/results" className="hover:text-white transition-colors">Results</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Programs</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">JEE Preparation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NEET Coaching</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Foundation Course</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Test Series</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="flex-shrink-0 mt-0.5 text-primary-400" />
                  <span>123 Education Lane, Tech City, India - 400001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="flex-shrink-0 text-primary-400" />
                  <span>support@eduprime.edu</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="flex-shrink-0 text-primary-400" />
                  <span>+91 98765 43210</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2025 EduPrime Institute. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;