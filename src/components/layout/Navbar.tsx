
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 py-4 px-6 md:px-10 w-full bg-brand-yellow shadow-md border-b border-brand-black/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/daf0e64c-0daa-47c0-b0f5-c3ed2ef7fabb.png" 
            alt="Labelogic Logo" 
            className="h-12 md:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-brand-black font-medium hover:text-brand-purple transition-colors duration-200 px-3 py-2 rounded-md hover:bg-brand-yellow-dark">
            Home
          </Link>
          <Link to="/search-examples" className="text-brand-black font-medium hover:text-brand-purple transition-colors duration-200 px-3 py-2 rounded-md hover:bg-brand-yellow-dark">
            Search Examples
          </Link>
          <Link to="/about-us" className="text-brand-black font-medium hover:text-brand-purple transition-colors duration-200 px-3 py-2 rounded-md hover:bg-brand-yellow-dark">
            About Us
          </Link>
          <Link to="/contact-us" className="text-brand-black font-medium hover:text-brand-purple transition-colors duration-200 px-3 py-2 rounded-md hover:bg-brand-yellow-dark">
            Contact Us
          </Link>
          <Link to="/subscriptions" className="text-brand-black font-medium hover:text-brand-purple transition-colors duration-200 px-3 py-2 rounded-md hover:bg-brand-yellow-dark">
            Subscriptions
          </Link>
          <Link to="/subscription" className="text-brand-black font-medium hover:text-brand-purple transition-colors duration-200 px-3 py-2 rounded-md hover:bg-brand-yellow-dark">
            Subscribe
          </Link>
          <Link to="/accessibility" className="text-brand-black font-medium hover:text-brand-purple transition-colors duration-200 px-3 py-2 rounded-md hover:bg-brand-yellow-dark">
            Accessibility
          </Link>
          <Button 
            variant="default" 
            className="bg-brand-black text-brand-white hover:bg-brand-black/90 px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-brand-black p-2 rounded-md hover:bg-brand-yellow-dark transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden pt-6 pb-6 animate-fade-in bg-brand-yellow border-t border-black/10 mt-4 shadow-lg">
          <div className="flex flex-col space-y-2 max-w-7xl mx-auto px-6">
            <Link 
              to="/" 
              className="text-brand-black font-medium hover:text-brand-purple transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search-examples" 
              className="text-brand-black font-medium hover:text-brand-purple transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark"
              onClick={() => setIsOpen(false)}
            >
              Search Examples
            </Link>
            <Link 
              to="/about-us" 
              className="text-brand-black font-medium hover:text-brand-purple transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact-us" 
              className="text-brand-black font-medium hover:text-brand-purple transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <Link 
              to="/subscriptions" 
              className="text-brand-black font-medium hover:text-brand-purple transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark"
              onClick={() => setIsOpen(false)}
            >
              Subscriptions
            </Link>
            <Link 
              to="/subscription" 
              className="text-brand-black font-medium hover:text-brand-purple transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark"
              onClick={() => setIsOpen(false)}
            >
              Subscribe
            </Link>
            <Link 
              to="/accessibility" 
              className="text-brand-black font-medium hover:text-brand-purple transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark"
              onClick={() => setIsOpen(false)}
            >
              Accessibility
            </Link>
            <Link 
              to="/privacy-policy" 
              className="text-brand-black font-medium hover:text-brand-purple transition-colors px-4 py-3 rounded-md hover:bg-brand-yellow-dark"
              onClick={() => setIsOpen(false)}
            >
              Privacy Policy
            </Link>
            <Button 
              variant="default" 
              className="bg-brand-black text-brand-white hover:bg-brand-black/90 mx-4 mt-2 py-3 rounded-full font-semibold shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
