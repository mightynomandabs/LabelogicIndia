import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Search, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VoiceSearch from "./VoiceSearch";
import ConfettiAnimation from "@/components/ui/ConfettiAnimation";
import TypewriterAnimation from "@/components/ui/TypewriterAnimation";
import LanguageSelector from "./LanguageSelector";

interface EnhancedHeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const EnhancedHero = ({ onSearch, searchQuery, setSearchQuery }: EnhancedHeroProps) => {
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [liveUserCount, setLiveUserCount] = useState(0);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  // Simulate live user count
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUserCount(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(150, Math.min(300, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate success notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowSuccessNotification(true);
        setTimeout(() => setShowSuccessNotification(false), 4000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
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

  const handleSurpriseMe = () => {
    const categories = [
      "Samsung phone under ₹30,000",
      "Best laptop for college students",
      "Wireless headphones with noise cancellation",
      "Smartwatch for fitness tracking",
      "Gaming mouse with RGB lighting"
    ];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setSearchQuery(randomCategory);
    navigate(`/search?q=${encodeURIComponent(randomCategory)}`);
    
    // Trigger confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const searchSuggestions = [
    "Samsung phone under ₹30,000 with good battery",
    "Best laptop for college students",
    "Wireless headphones with noise cancellation",
    "Smartwatch for fitness tracking",
    "Gaming mouse with RGB lighting"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element" />
        <div className="floating-element" />
        <div className="floating-element" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Live Activity Counter with Language Selector */}
        <div className="flex flex-col sm:flex-row justify-center items-center mb-8 md:mb-12 gap-4">
          <div className="live-indicator inline-flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg border border-brand-black/10">
            <div className="live-dot" />
            <span className="text-xs md:text-sm font-semibold text-brand-black/90">{liveUserCount} users finding deals right now</span>
          </div>
          <div className="sm:ml-6">
            <LanguageSelector />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="max-w-6xl mx-auto text-center mb-12 md:mb-20">
          <TypewriterAnimation />
        </div>

        {/* Enhanced Search Form */}
        <div className="max-w-5xl mx-auto mb-16 md:mb-24 relative z-20" id="main-search">
          <form onSubmit={handleSearch} className="relative group">
            <div className="relative">
              <Search className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-brand-black/60 h-5 w-5 md:h-6 md:w-6 z-10" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe what you're looking for: e.g., 'Samsung phone under ₹30,000 with good battery'"
                className="pl-12 md:pl-20 pr-24 md:pr-32 py-6 md:py-10 text-base md:text-xl rounded-xl md:rounded-2xl border-2 border-brand-black/20 shadow-xl md:shadow-2xl 
                         focus:ring-4 focus:ring-brand-purple/20 focus:border-brand-purple 
                         transition-all duration-300 hover:shadow-2xl md:hover:shadow-3xl hover:shadow-brand-purple/10
                         group-hover:border-brand-purple/50 bg-white/95 backdrop-blur-sm relative z-10
                         min-h-[64px] md:min-h-[88px] w-full"
                aria-label="Search products"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-brand-yellow/5 
                            rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              
              <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex space-x-2 md:space-x-4 z-20">
                <Button
                  type="button"
                  onClick={handleVoiceSearch}
                  className="bg-brand-purple hover:bg-brand-purple-dark rounded-lg md:rounded-xl w-12 h-12 md:w-16 md:h-16 
                           flex items-center justify-center shadow-lg transition-all duration-200 
                           hover:shadow-xl hover:scale-105 touch-manipulation"
                  aria-label="Activate voice search"
                >
                  <Mic className="h-5 w-5 md:h-7 md:w-7" />
                </Button>
                <Button 
                  type="submit" 
                  className="bg-brand-purple text-white hover:bg-brand-purple-dark 
                           rounded-lg md:rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shadow-lg 
                           transition-all duration-200 hover:shadow-xl hover:scale-105 touch-manipulation"
                  aria-label="Search products"
                >
                  <Search className="h-5 w-5 md:h-7 md:w-7" />
                </Button>
              </div>
            </div>

            {/* Search suggestions with enhanced styling */}
            <div className="mt-6 md:mt-8 relative z-10">
              <div className="flex items-center justify-center mb-3 md:mb-4">
                <TrendingUp className="h-4 w-4 md:h-6 md:w-6 text-brand-purple mr-2 md:mr-3" />
                <span className="text-sm md:text-lg text-brand-black/80 font-semibold">Popular searches:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {searchSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs md:text-base border-brand-purple/30 text-brand-purple hover:bg-brand-purple 
                             hover:text-white rounded-lg md:rounded-xl px-4 md:px-8 py-2 md:py-4 transition-all duration-200
                             hover:scale-105 hover:shadow-lg bg-white/90 backdrop-blur-sm font-medium touch-manipulation"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </form>

          {/* Surprise Me Button */}
          <div className="text-center mt-4 md:mt-6 relative z-10">
            <Button
              onClick={handleSurpriseMe}
              className="bg-gradient-to-r from-brand-yellow to-brand-yellow-dark hover:from-brand-yellow-dark hover:to-brand-yellow 
                       text-brand-black font-bold px-6 md:px-10 py-3 md:py-5 text-base md:text-xl rounded-xl md:rounded-2xl transform hover:scale-105 
                       transition-all duration-300 hover:shadow-2xl shadow-xl touch-manipulation"
            >
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-4" />
              🎲 Surprise Me!
            </Button>
          </div>
        </div>
      </div>

      {/* Success Notifications */}
      {showSuccessNotification && (
        <div className="fixed top-24 right-6 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
              <span className="font-medium">Someone just found a great deal!</span>
            </div>
          </div>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && <ConfettiAnimation />}

      {/* Voice Search Modal */}
      {isVoiceSearchActive && (
        <VoiceSearch
          onResult={onVoiceResult}
          onClose={onVoiceClose}
        />
      )}
    </section>
  );
};

export default EnhancedHero; 