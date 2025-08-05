
import { useState } from "react";
import { Search, X, Mic } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchHeader = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="py-4 px-6 bg-background sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center">
          <a href="/" className="mr-8">
            <img 
              src="/lovable-uploads/daf0e64c-0daa-47c0-b0f5-c3ed2ef7fabb.png" 
              alt="Labelogic Logo" 
              className="h-8"
            />
          </a>
          
          <div className="flex-1 max-w-2xl relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a product, brand, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-full border pl-10 pr-24 py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              {searchTerm && (
                <button 
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground p-1"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <Button 
                className="bg-brand-purple hover:bg-brand-purple-dark rounded-full h-7 w-7 flex items-center justify-center p-0"
                onClick={handleSearch}
                aria-label="Search"
              >
                <Search size={14} className="text-white" />
              </Button>
            </div>
          </div>
          
          <div className="ml-4">
            <Button 
              onClick={() => navigate('/search-examples')}
              variant="outline" 
              size="sm"
              className="hidden md:flex"
            >
              Search Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
