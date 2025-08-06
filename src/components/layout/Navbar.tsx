
import { useState } from "react";
import { Menu, X, Search, Home, Info, Mail, Grid3X3, User, ChevronRight } from "lucide-react";
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

  // Mobile menu item component
  const MobileMenuItem = ({ 
    to, 
    icon: Icon, 
    children, 
    onClick 
  }: { 
    to: string; 
    icon: React.ComponentType<{ className?: string }>; 
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    const isActive = isActiveLink(to);
    
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`
          flex items-center justify-between w-full px-4 py-4 rounded-lg transition-all duration-200
          hover:bg-brand-yellow-dark/50 active:bg-brand-yellow-dark
          focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:ring-offset-1
          min-h-[56px] touch-manipulation
          ${isActive ? 'bg-brand-purple/10 text-brand-purple' : 'text-brand-black/80'}
        `}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`h-5 w-5 ${isActive ? 'text-brand-purple' : 'text-brand-black/60'}`} />
          <span className="font-medium">{children}</span>
        </div>
        <ChevronRight className="h-4 w-4 text-brand-black/40" />
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 py-3 px-4 md:px-6 lg:px-8 w-full bg-brand-yellow/95 backdrop-blur-sm shadow-md border-b border-brand-black/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/labelogic-logo.png" 
            alt="Labelogic Logo" 
            className="h-8 md:h-10 lg:h-12"
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
          className="lg:hidden text-brand-black p-2 rounded-lg hover:bg-brand-yellow-dark/50 transition-colors duration-200 touch-manipulation"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden pt-4 pb-6 animate-fade-in bg-brand-yellow/95 backdrop-blur-sm border-t border-brand-black/10 mt-3 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 space-y-4">
            {/* Quick Links Section */}
            <div className="border-b border-brand-black/10 pb-4">
              <QuickLinks variant="mobile" />
            </div>
            
            {/* Main Navigation Links */}
            <div className="space-y-2">
              <MobileMenuItem 
                to="/" 
                icon={Home}
                onClick={() => setIsOpen(false)}
              >
                Home
              </MobileMenuItem>
              <MobileMenuItem 
                to="/search-examples" 
                icon={Grid3X3}
                onClick={() => setIsOpen(false)}
              >
                Search Examples
              </MobileMenuItem>
              <MobileMenuItem 
                to="/about-us" 
                icon={Info}
                onClick={() => setIsOpen(false)}
              >
                About Us
              </MobileMenuItem>
              <MobileMenuItem 
                to="/contact-us" 
                icon={Mail}
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </MobileMenuItem>
            </div>
            
            {/* Action Buttons */}
            <div className="border-t border-brand-black/10 pt-4 space-y-2">
              <MobileMenuItem 
                to="/subscriptions" 
                icon={User}
                onClick={() => setIsOpen(false)}
              >
                Subscriptions
              </MobileMenuItem>
              <MobileMenuItem 
                to="/subscription" 
                icon={User}
                onClick={() => setIsOpen(false)}
              >
                Subscribe
              </MobileMenuItem>
              <Link 
                to="/privacy-policy" 
                className="flex items-center justify-between w-full px-4 py-4 rounded-lg transition-all duration-200 hover:bg-brand-yellow-dark/50 active:bg-brand-yellow-dark focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:ring-offset-1 min-h-[56px] touch-manipulation text-brand-black/80"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <Info className="h-5 w-5 text-brand-black/60" />
                  <span className="font-medium">Privacy Policy</span>
                </div>
                <ChevronRight className="h-4 w-4 text-brand-black/40" />
              </Link>
              <Button 
                variant="default" 
                className="bg-brand-purple text-white hover:bg-brand-purple-dark mx-4 mt-4 py-4 rounded-lg font-medium shadow-sm w-full min-h-[56px] touch-manipulation"
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
