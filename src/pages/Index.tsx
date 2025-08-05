import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-black focus:text-brand-white focus:outline-none focus:rounded-md"
      >
        Skip to Search
      </a>

      <Navbar />
      
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>
          
          {/* Main content */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-brand-black leading-tight">
                Your Smart Shopping Assistant
              </h1>
              <p className="text-lg md:text-xl text-brand-black/80 max-w-2xl mx-auto leading-relaxed">
                Find the perfect product with honest reviews and the best prices across Indian marketplaces
              </p>
            </div>

            {/* Category buttons */}
            <div className="mb-8">
              <CategoryButtons />
            </div>

            {/* Main search form */}
            <div className="max-w-4xl mx-auto mb-16" id="main-search">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-black/60 h-5 w-5" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Describe what you're looking for: e.g., 'Samsung phone under ₹30,000 with good battery'"
                    className="pl-12 pr-24 py-6 text-lg rounded-full border-2 border-brand-black shadow-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-200"
                    aria-label="Search products"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                    <Button
                      type="button"
                      onClick={handleVoiceSearch}
                      className="bg-brand-purple hover:bg-brand-purple-dark rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg"
                      aria-label="Activate voice search"
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-brand-black text-brand-white hover:bg-brand-black/80 rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg"
                      aria-label="Search products"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Search suggestions */}
                <div className="mt-6">
                  <div className="flex items-center justify-center mb-3">
                    <TrendingUp className="h-4 w-4 text-brand-purple mr-2" />
                    <span className="text-sm text-brand-black/70 font-medium">Popular searches:</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {searchSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-sm border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white rounded-full px-4 py-2 transition-all duration-200"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </form>

              {/* Voice search overlay */}
              {isVoiceSearchActive && (
                <VoiceSearch onResult={onVoiceResult} onClose={onVoiceClose} />
              )}
            </div>

            {/* How it works button */}
            <div className="text-center mb-12">
              <Button
                variant="outline"
                className="border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white px-8 py-3 text-lg rounded-full transition-all duration-200 hover:shadow-md"
                onClick={() => alert("This would open a how-to video!")}
              >
                <span className="mr-2">▶</span> How It Works
              </Button>
            </div>
            
            {/* Search Examples Link */}
            <div className="text-center mb-16">
              <Button 
                variant="outline" 
                onClick={() => navigate('/search-examples')}
                className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-8 py-3 text-lg rounded-full transition-all duration-200 hover:shadow-md"
              >
                Not Sure What to Search? Try Our Examples!
              </Button>
            </div>

            {/* Product Grid */}
            <ProductGrid />
          </section>

          {/* Features Section */}
          <Features />

          {/* Trust Indicators */}
          <TrustIndicators />

          {/* Testimonials Section */}
          <Testimonials />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
