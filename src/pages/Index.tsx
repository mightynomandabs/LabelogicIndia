import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedNavbar from "@/components/layout/EnhancedNavbar";
import Footer from "@/components/layout/Footer";
import { Mic, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryButtons from "@/components/home/CategoryButtons";
import LanguageSelector from "@/components/home/LanguageSelector";
import VoiceSearch from "@/components/home/VoiceSearch";
import ProductGrid from "@/components/home/ProductGrid";
import Testimonials from "@/components/home/Testimonials";
import TrustIndicators from "@/components/home/TrustIndicators";
import Features from "@/components/home/Features";
import EnhancedHero from "@/components/home/EnhancedHero";
import EnhancedFeatures from "@/components/home/EnhancedFeatures";
import FloatingAIAssistant from "@/components/ui/FloatingAIAssistant";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const navigate = useNavigate();

  // Search suggestions for better UX
  const searchSuggestions = [
    "Samsung phone under ₹30,000 with good battery",
    "Best laptop for college students",
    "Wireless headphones with noise cancellation",
    "Smartwatch for fitness tracking",
    "Gaming mouse with RGB lighting"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVoiceSearch = () => {
    setIsVoiceSearchActive(true);
  };

  const onVoiceResult = (transcript: string) => {
    setSearchQuery(transcript);
    setIsVoiceSearchActive(false);
  };

  const onVoiceClose = () => {
    setIsVoiceSearchActive(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link - visible only for keyboard users */}
      <a 
        href="#main-search" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-purple focus:text-white focus:outline-none focus:rounded-md"
      >
        Skip to Search
      </a>

      <EnhancedNavbar />
      
      <main className="flex-1 py-2 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Enhanced Hero Section */}
          <EnhancedHero 
            onSearch={(query) => navigate(`/search?q=${encodeURIComponent(query)}`)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Category buttons */}
          <div className="mb-12">
            <CategoryButtons />
          </div>

          {/* Search Examples Link */}
          <div className="text-center mb-20">
            <Button 
              variant="outline" 
              onClick={() => navigate('/search-examples')}
              className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-10 py-4 text-lg rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 bg-white/80 backdrop-blur-sm"
            >
              Not Sure What to Search? Try Our Examples!
            </Button>
          </div>

          {/* Product Grid */}
          <ProductGrid />
        </div>

        {/* Enhanced Features Section */}
        <EnhancedFeatures />

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Testimonials Section */}
        <Testimonials />
      </main>
      
      <Footer />
      
      {/* Floating AI Assistant */}
      <FloatingAIAssistant />
    </div>
  );
};

export default Index;
