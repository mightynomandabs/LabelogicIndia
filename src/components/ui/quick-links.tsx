import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search, 
  Info, 
  Mail, 
  Grid3X3, 
  User, 
  ChevronDown,
  ChevronUp,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickLink {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  priority: number;
  description?: string;
}

const quickLinks: QuickLink[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home,
    priority: 1,
    description: 'Return to homepage'
  },
  {
    id: 'search',
    label: 'Search Products',
    href: '/search',
    icon: Search,
    priority: 2,
    description: 'Find products and reviews'
  },
  {
    id: 'categories',
    label: 'Product Categories',
    href: '/search-examples',
    icon: Grid3X3,
    priority: 3,
    description: 'Browse by category'
  },
  {
    id: 'account',
    label: 'User Account',
    href: '/subscription',
    icon: User,
    priority: 4,
    description: 'Manage your account'
  },
  {
    id: 'about',
    label: 'About Us',
    href: '/about-us',
    icon: Info,
    priority: 5,
    description: 'Learn about Labelogic'
  },
  {
    id: 'contact',
    label: 'Contact Us',
    href: '/contact-us',
    icon: Mail,
    priority: 6,
    description: 'Get in touch with us'
  }
];

interface QuickLinksProps {
  className?: string;
  variant?: 'footer' | 'sidebar' | 'mobile';
}

const QuickLinks: React.FC<QuickLinksProps> = ({ 
  className, 
  variant = 'footer' 
}) => {
  const location = useLocation();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // Sort links by priority
  const sortedLinks = [...quickLinks].sort((a, b) => a.priority - b.priority);

  const handleLinkClick = (linkId: string) => {
    setIsLoading(linkId);
    // Simulate loading state for better UX
    setTimeout(() => setIsLoading(null), 300);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  // Desktop/Tablet Layout
  const DesktopLayout = () => (
    <nav 
      className="space-y-4" 
      role="navigation" 
      aria-label="Quick navigation"
    >
      <h3 className="font-semibold text-brand-black text-lg">Quick Links</h3>
      <div className="grid gap-3">
        {sortedLinks.map((link) => {
          const IconComponent = link.icon;
          const isActive = isActiveLink(link.href);
          const isLinkLoading = isLoading === link.id;
          
          return (
            <Link
              key={link.id}
              to={link.href}
              onClick={() => handleLinkClick(link.id)}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "bg-white/50 hover:bg-white/80 border border-transparent hover:border-brand-purple/20",
                "shadow-sm hover:shadow-md transform hover:scale-[1.02]",
                "focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:ring-offset-2",
                "min-h-[44px] touch-manipulation",
                isActive && "bg-brand-purple/10 border-brand-purple/30 text-brand-purple",
                isLinkLoading && "pointer-events-none opacity-75"
              )}
              aria-describedby={`tooltip-${link.id}`}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center justify-center w-5 h-5">
                <IconComponent 
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    isActive ? "text-brand-purple" : "text-brand-black/60 group-hover:text-brand-purple"
                  )} 
                />
              </div>
              <span className="font-semibold text-brand-black group-hover:text-brand-purple transition-colors duration-200">
                {link.label}
              </span>
              {isLinkLoading && (
                <div className="ml-auto">
                  <div className="w-4 h-4 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
                </div>
              )}
              {isActive && (
                <div className="absolute right-2 w-2 h-2 bg-brand-purple rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );

  // Mobile Accordion Layout
  const MobileLayout = () => (
    <div className="border border-brand-black/10 rounded-lg bg-white/50">
      <button
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="w-full flex items-center justify-between px-4 py-4 text-left touch-manipulation min-h-[56px]"
        aria-expanded={isMobileExpanded}
        aria-controls="mobile-quick-links"
      >
        <h3 className="font-semibold text-brand-black text-lg">Quick Links</h3>
        {isMobileExpanded ? (
          <ChevronUp className="h-5 w-5 text-brand-black/60" />
        ) : (
          <ChevronDown className="h-5 w-5 text-brand-black/60" />
        )}
      </button>
      
      <div
        id="mobile-quick-links"
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isMobileExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4 space-y-2">
          {sortedLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = isActiveLink(link.href);
            const isLinkLoading = isLoading === link.id;
            
            return (
              <Link
                key={link.id}
                to={link.href}
                onClick={() => {
                  handleLinkClick(link.id);
                  setIsMobileExpanded(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-4 rounded-lg transition-all duration-200",
                  "hover:bg-brand-yellow-dark/50 active:bg-brand-yellow-dark",
                  "focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:ring-offset-1",
                  "min-h-[56px] touch-manipulation",
                  isActive && "bg-brand-purple/10 text-brand-purple",
                  isLinkLoading && "pointer-events-none opacity-75"
                )}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent 
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      isActive ? "text-brand-purple" : "text-brand-black/60"
                    )} 
                  />
                  <span className="font-medium text-brand-black">
                    {link.label}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-brand-black/40" />
                {isLinkLoading && (
                  <div className="ml-2">
                    <div className="w-4 h-4 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Footer Layout
  const FooterLayout = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-brand-black text-lg">Quick Links</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sortedLinks.map((link) => {
          const IconComponent = link.icon;
          const isActive = isActiveLink(link.href);
          
          return (
            <Link
              key={link.id}
              to={link.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                "hover:bg-brand-yellow-dark/50 hover:text-brand-purple",
                "focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:ring-offset-1",
                "min-h-[44px] touch-manipulation",
                isActive && "text-brand-purple font-medium"
              )}
            >
              <IconComponent className="h-4 w-4" />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop/Tablet Layout */}
      <div className="hidden md:block">
        <DesktopLayout />
      </div>
      
      {/* Mobile Layout */}
      <div className="md:hidden">
        <MobileLayout />
      </div>
      
      {/* Footer Layout */}
      {variant === 'footer' && (
        <div className="md:hidden">
          <FooterLayout />
        </div>
      )}
    </div>
  );
};

export default QuickLinks; 