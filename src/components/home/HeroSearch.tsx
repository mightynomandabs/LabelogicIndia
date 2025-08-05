
import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock Indian popular searches and categories
const popularIndianProducts = [
  "boAt Airdopes 141",
  "Noise ColorFit Pro 3",
  "OnePlus Nord CE 3",
  "Samsung Galaxy S23 FE",
  "POCO F5",
  "Redmi Note 13 Pro",
  "Fire-Boltt Phoenix",
  "Realme Buds Air 3",
  "Sony WF-1000XM4",
  "Allen Solly Kurta",
  "Banarasi Silk Saree",
  "Titan Watch"
];

const popularCategories = [
  "Wireless Earbuds",
  "Smartwatches",
  "Smartphones",
  "Sarees",
  "Kurtas",
  "Men's Footwear",
  "Kitchen Appliances"
];

const trendingSearches = [
  "Diwali sale offers",
  "Budget true wireless earbuds",
  "Best phone under 20000",
  "SmartWatch with calling",
  "AMOLED display phones"
];

interface SearchHistoryItem {
  term: string;
  timestamp: number;
}

const HeroSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showTrending, setShowTrending] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load search history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      try {
        setSearchHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse search history", e);
      }
    }
  }, []);

  // Handle clicks outside of search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowTrending(false);
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Smart search suggestions with typo tolerance and Hindi transliteration support
  const getSuggestions = (input: string) => {
    if (input.length < 2) return [];
    
    const normalizeTerm = (term: string) => {
      // Handle common transliterations and typos
      let normalized = term.toLowerCase()
        .replace(/sari|saari/g, 'saree')
        .replace(/boat/g, 'boAt')
        .replace(/noize|noise/g, 'Noise');
      
      return normalized;
    };
    
    const fuzzyMatch = (needle: string, haystack: string) => {
      needle = normalizeTerm(needle);
      haystack = haystack.toLowerCase();
      
      // Exact match
      if (haystack.includes(needle)) return 3;
      
      // Close match (allow one character difference)
      const needleChars = needle.split('');
      let matches = 0;
      
      for (const char of needleChars) {
        if (haystack.includes(char)) matches++;
      }
      
      // Return score based on match percentage
      return matches / needle.length;
    };
    
    const allItems = [...popularIndianProducts, ...popularCategories];
    
    // Score and sort suggestions
    const matchedSuggestions = allItems
      .map(item => ({
        item,
        score: fuzzyMatch(input, item)
      }))
      .filter(result => result.score > 0.4) // Only show reasonable matches
      .sort((a, b) => b.score - a.score)
      .map(result => result.item)
      .slice(0, 6); // Limit to 6 suggestions
      
    return matchedSuggestions;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestions(getSuggestions(value));
    setShowTrending(false);
    setShowHistory(false);
  };

  const handleInputFocus = () => {
    if (searchTerm.length === 0) {
      setShowTrending(true);
      setShowHistory(searchHistory.length > 0);
    } else {
      setSuggestions(getSuggestions(searchTerm));
    }
  };

  const saveToSearchHistory = (term: string) => {
    const newHistoryItem = { term, timestamp: Date.now() };
    const updatedHistory = [
      newHistoryItem,
      ...searchHistory.filter(item => item.term !== term).slice(0, 9)
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleSearch = (term: string = searchTerm) => {
    if (term.trim()) {
      saveToSearchHistory(term.trim());
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowTrending(false);
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
    setShowHistory(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="relative flex items-center">
        <Search size={22} className="absolute left-4 text-brand-black" />
        <input
          type="text"
          placeholder="Search for a product, brand, or category..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="hero-search pl-12 bg-brand-white"
          aria-label="Search for products"
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className="absolute right-16 text-brand-black hover:text-brand-purple"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
        <Button 
          className="absolute right-2 bg-brand-black hover:bg-brand-black/80 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => handleSearch()}
          aria-label="Search"
        >
          <Search size={18} className="text-brand-white" />
        </Button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute w-full bg-brand-white rounded-xl mt-2 shadow-lg z-10 overflow-hidden border border-brand-black/10 animate-fade-in">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  className="w-full text-left px-6 py-3 hover:bg-brand-yellow/50 transition-colors flex items-center"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    handleSearch(suggestion);
                  }}
                >
                  <Search size={15} className="mr-2 text-brand-black/70" />
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trending searches dropdown */}
      {showTrending && suggestions.length === 0 && (
        <div className="absolute w-full bg-brand-white rounded-xl mt-2 shadow-lg z-10 overflow-hidden border border-brand-black/10 animate-fade-in">
          {searchHistory.length > 0 && showHistory && (
            <div>
              <div className="px-4 py-2 bg-gray-50 flex justify-between items-center">
                <h3 className="text-sm font-medium">Recent Searches</h3>
                <button 
                  onClick={handleClearHistory}
                  className="text-xs text-muted-foreground hover:text-brand-purple"
                >
                  Clear all
                </button>
              </div>
              <ul>
                {searchHistory.slice(0, 3).map((item, index) => (
                  <li key={`history-${index}`}>
                    <button
                      className="w-full text-left px-6 py-2 hover:bg-brand-yellow/50 transition-colors flex items-center"
                      onClick={() => {
                        setSearchTerm(item.term);
                        handleSearch(item.term);
                      }}
                    >
                      <Search size={15} className="mr-2 text-brand-black/70" />
                      {item.term}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-100"></div>
            </div>
          )}
          
          <div className="px-4 py-2 bg-gray-50 flex items-center">
            <TrendingUp size={14} className="mr-2 text-brand-purple" />
            <h3 className="text-sm font-medium">Trending in India</h3>
          </div>
          <ul>
            {trendingSearches.map((trend, index) => (
              <li key={index}>
                <button
                  className="w-full text-left px-6 py-3 hover:bg-brand-yellow/50 transition-colors flex items-center"
                  onClick={() => {
                    setSearchTerm(trend);
                    handleSearch(trend);
                  }}
                >
                  <TrendingUp size={15} className="mr-2 text-brand-purple" />
                  {trend}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeroSearch;
