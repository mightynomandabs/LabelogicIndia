
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import QuickLinks from "@/components/ui/quick-links";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
          px-6 py-3 rounded-lg transition-all duration-200
          hover:bg-brand-yellow-dark/50 focus:bg-brand-yellow-dark/50
          focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:ring-offset-2
          ${isActive ? 'text-brand-black bg-brand-yellow-dark/30 font-semibold' : ''}
        `}
      >
        {children}
        {isActive && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-brand-purple rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 py-3 px-6 md:px-8 w-full bg-brand-yellow/95 backdrop-blur-sm shadow-md border-b border-brand-black/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/labelogic-logo.png" 
            alt="Labelogic Logo" 
            className="h-10 md:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          {/* Main Navigation Links */}
          <div className="flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/search-examples">Search Examples</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/contact-us">Contact Us</NavLink>
            <NavLink to="/accessibility">Accessibility</NavLink>
          </div>
          
          {/* Action Buttons Group */}
          <div className="flex items-center space-x-3 ml-8 pl-6 border-l border-brand-black/20">
            <NavLink to="/subscriptions">Subscriptions</NavLink>
            <NavLink to="/subscription">Subscribe</NavLink>
            <Button 
              variant="default" 
              className="bg-brand-purple text-white hover:bg-brand-purple-dark px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 hover:shadow-md"
            >
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="lg:hidden text-brand-black p-2 rounded-lg hover:bg-brand-yellow-dark/50 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden pt-4 pb-6 animate-fade-in bg-brand-yellow/95 backdrop-blur-sm border-t border-brand-black/10 mt-3 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 space-y-4">
            {/* Quick Links Section */}
            <div className="border-b border-brand-black/10 pb-4">
              <QuickLinks variant="mobile" />
            </div>
            
            {/* Main Navigation Links */}
            <div className="flex flex-col space-y-1">
              <Link 
                to="/" 
                className="text-brand-black/80 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-brand-yellow-dark/50 hover:text-brand-black"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search-examples" 
                className="text-brand-black/80 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-brand-yellow-dark/50 hover:text-brand-black"
                onClick={() => setIsOpen(false)}
              >
                Search Examples
              </Link>
              <Link 
                to="/about-us" 
                className="text-brand-black/80 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-brand-yellow-dark/50 hover:text-brand-black"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact-us" 
                className="text-brand-black/80 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-brand-yellow-dark/50 hover:text-brand-black"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                to="/accessibility" 
                className="text-brand-black/80 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-brand-yellow-dark/50 hover:text-brand-black"
                onClick={() => setIsOpen(false)}
              >
                Accessibility
              </Link>
            </div>
            
            {/* Action Buttons */}
            <div className="border-t border-brand-black/10 pt-4 space-y-2">
              <Link 
                to="/subscriptions" 
                className="text-brand-black/80 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-brand-yellow-dark/50 hover:text-brand-black block"
                onClick={() => setIsOpen(false)}
              >
                Subscriptions
              </Link>
              <Link 
                to="/subscription" 
                className="text-brand-black/80 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-brand-yellow-dark/50 hover:text-brand-black block"
                onClick={() => setIsOpen(false)}
              >
                Subscribe
              </Link>
              <Link 
                to="/privacy-policy" 
                className="text-brand-black/80 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-brand-yellow-dark/50 hover:text-brand-black block"
                onClick={() => setIsOpen(false)}
              >
                Privacy Policy
              </Link>
              <Button 
                variant="default" 
                className="bg-brand-purple text-white hover:bg-brand-purple-dark mx-4 mt-2 py-3 rounded-lg font-medium shadow-sm w-full"
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

export default Navbar;
