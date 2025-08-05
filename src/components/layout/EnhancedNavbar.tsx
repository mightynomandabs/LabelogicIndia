import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import QuickLinks from "@/components/ui/quick-links";

const EnhancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if a link is active
  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    // For exact path matching to avoid conflicts between similar paths
    if (path === '/subscription') {
      return location.pathname === '/subscription';
    }
    if (path === '/subscriptions') {
      return location.pathname === '/subscriptions';
    }
    return location.pathname.startsWith(path);
  };

  // NavLink component for consistent styling
  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = isActiveLink(to);
    
    return (
      <Link
        to={to}
        className={`
          relative font-medium text-brand-black/80 hover:text-brand-black 
          px-4 py-2 rounded-md transition-all duration-200
          hover:bg-brand-yellow-dark/50 focus:bg-brand-yellow-dark/50
          focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:ring-offset-2
          ${isActive ? 'text-brand-black bg-brand-yellow-dark/30' : ''}
        `}
      >
        {children}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-purple rounded-full" />
        )}
      </Link>
    );
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/search-examples", label: "Search Examples" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact-us", label: "Contact Us" },
    { to: "/subscriptions", label: "Subscriptions" },
    { to: "/subscription", label: "Subscribe" },
    { to: "/accessibility", label: "Accessibility" },
  ];

  return (
    <nav className={`sticky top-0 z-50 py-4 px-6 md:px-10 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-brand-yellow/95 backdrop-blur-md shadow-sm border-b border-brand-black/5' 
        : 'bg-brand-yellow/95 backdrop-blur-sm shadow-sm border-b border-brand-black/5'
    }`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center group">
          <img
            src="/labelogic-logo.png" 
            alt="Labelogic Logo" 
            className="h-12 md:h-16 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
          <Button 
            variant="default" 
            className="bg-brand-purple text-white hover:bg-brand-purple-dark 
                     px-6 py-2 rounded-full font-medium shadow-sm 
                     transition-all duration-200 hover:shadow-md ml-4"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-brand-black p-2 rounded-md hover:bg-brand-yellow-dark/50 
                     transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden pt-6 pb-6 animate-fade-in bg-brand-yellow/95 
                       backdrop-blur-sm border-t border-brand-black/10 mt-4 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 space-y-6">
            {/* Quick Links Section */}
            <div className="border-b border-brand-black/10 pb-4">
              <QuickLinks variant="mobile" />
            </div>
            
            {/* Additional Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navLinks.slice(3).map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`text-brand-black/80 font-medium hover:text-brand-black 
                             transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark/50
                             transition-all duration-200 ${
                               location.pathname === link.to ? 'text-brand-black bg-brand-yellow-dark/30' : ''
                             }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/privacy-policy" 
                className="text-brand-black/80 font-medium hover:text-brand-black 
                         transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark/50
                         transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Privacy Policy
              </Link>
              <Button 
                variant="default" 
                className="bg-brand-purple text-white hover:bg-brand-purple-dark 
                         mx-4 mt-2 py-3 rounded-full font-medium shadow-sm
                         transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EnhancedNavbar; 