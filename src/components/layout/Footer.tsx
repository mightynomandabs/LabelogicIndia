
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";
import QuickLinks from "@/components/ui/quick-links";

const Footer = () => {
  return (
    <footer className="bg-brand-yellow border-t border-brand-black/10 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
                      <img
          src="/labelogic-logo.png" 
                alt="Labelogic Logo" 
                className="h-12"
              />
            </div>
            <p className="text-brand-black/80 leading-relaxed">
              Your smart shopping assistant helping you find the best products with honest reviews and competitive prices across Indian marketplaces.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-black hover:text-brand-purple transition-colors duration-200 p-2 rounded-full hover:bg-brand-yellow-dark"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-black hover:text-brand-purple transition-colors duration-200 p-2 rounded-full hover:bg-brand-yellow-dark"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-black hover:text-brand-purple transition-colors duration-200 p-2 rounded-full hover:bg-brand-yellow-dark"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-black hover:text-brand-purple transition-colors duration-200 p-2 rounded-full hover:bg-brand-yellow-dark"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <QuickLinks variant="footer" />

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-brand-black text-lg">Support</h3>
            <div className="space-y-2">
              <Link to="/privacy-policy" className="block text-brand-black/80 hover:text-brand-purple transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/accessibility" className="block text-brand-black/80 hover:text-brand-purple transition-colors duration-200">
                Accessibility
              </Link>
              <a href="#" className="block text-brand-black/80 hover:text-brand-purple transition-colors duration-200">
                Help Center
              </a>
              <a href="#" className="block text-brand-black/80 hover:text-brand-purple transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-brand-black text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-purple" />
                <span className="text-brand-black/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-purple" />
                <span className="text-brand-black/80">hello@labelogic.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-brand-purple mt-1" />
                <span className="text-brand-black/80">
                  Mumbai, Maharashtra<br />
                  India
                </span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-brand-black/60">
                Business Hours:<br />
                Mon - Fri: 9:00 AM - 6:00 PM<br />
                Sat: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-brand-black/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brand-black/70 text-sm">
              © 2025 Labelogic. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-brand-black/60">Made with ❤️ in India</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                <span className="text-brand-black/60">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
