
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchHeader from "@/components/search/SearchHeader";
import SearchFilters from "@/components/search/SearchFilters";
import ProductCard, { Product } from "@/components/search/ProductCard";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Filter, 
  SortAsc, 
  Bookmark, 
  BookmarkCheck,
  Smartphone,
  Battery,
  Star,
  TrendingUp,
  AlertCircle,
  Search,
  ArrowUp
} from "lucide-react";

// Samsung phones under ₹30,000 with good battery - Mock data
const samsungPhones: Product[] = [
  {
    id: "samsung-1",
    name: "Samsung Galaxy M34 5G",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop",
    category: "Smartphones",
    description: "6.5\" FHD+ sAMOLED Display, 6000mAh Battery, 50MP Triple Camera, 5G Ready, 128GB Storage",
    prices: [
      { store: "Flipkart", price: "18999", link: "#" },
      { store: "Amazon.in", price: "19999", link: "#" },
      { store: "Samsung Shop", price: "18999", link: "#" }
    ],
    reviewCount: 12456,
    rating: 4.4,
    sentiment: {
      positive: 0.78,
      neutral: 0.18,
      negative: 0.04,
      overall: 0.74
    },
    keyPhrases: ["6000mAh battery", "5G connectivity", "AMOLED display", "Good camera"],
    lastUpdated: "1 day ago",
    specs: {
      battery: "6000mAh",
      display: "6.5\" FHD+ sAMOLED",
      camera: "50MP Triple Camera",
      storage: "128GB",
      ram: "8GB"
    },
    insights: {
      positive: [
        "Excellent 6000mAh battery lasts 2 days",
        "5G connectivity future-proofs the device",
        "AMOLED display with 120Hz refresh rate",
        "Good camera performance for the price"
      ],
      neutral: [
        "Plastic build but feels premium",
        "OneUI is feature-rich but has bloatware"
      ],
      negative: [
        "Charging speed could be faster",
        "No wireless charging at this price"
      ]
    }
  },
  {
    id: "samsung-2",
    name: "Samsung Galaxy F14 5G",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop",
    category: "Smartphones",
    description: "6.6\" FHD+ Display, 6000mAh Battery, 50MP Camera, 5G, 128GB Storage, Android 13",
    prices: [
      { store: "Flipkart", price: "15999", link: "#" },
      { store: "Amazon.in", price: "16999", link: "#" },
      { store: "Croma", price: "16499", link: "#" }
    ],
    reviewCount: 8923,
    rating: 4.2,
    sentiment: {
      positive: 0.72,
      neutral: 0.22,
      negative: 0.06,
      overall: 0.66
    },
    keyPhrases: ["6000mAh battery", "5G ready", "Good value", "Reliable performance"],
    lastUpdated: "2 days ago",
    specs: {
      battery: "6000mAh",
      display: "6.6\" FHD+",
      camera: "50MP Camera",
      storage: "128GB",
      ram: "6GB"
    },
    insights: {
      positive: [
        "6000mAh battery provides excellent endurance",
        "5G connectivity for future use",
        "Good value for money at ₹15,999",
        "Reliable performance for daily tasks"
      ],
      neutral: [
        "Standard design, nothing special",
        "Camera is decent but not exceptional"
      ],
      negative: [
        "15W charging is slow for 6000mAh battery",
        "Display could be brighter outdoors"
      ]
    }
  },
  {
    id: "samsung-3",
    name: "Samsung Galaxy A14 5G",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop",
    category: "Smartphones",
    description: "6.6\" FHD+ Display, 5000mAh Battery, 50MP Triple Camera, 5G, 128GB Storage",
    prices: [
      { store: "Flipkart", price: "13999", link: "#" },
      { store: "Amazon.in", price: "14999", link: "#" },
      { store: "Reliance Digital", price: "14499", link: "#" }
    ],
    reviewCount: 15678,
    rating: 4.1,
    sentiment: {
      positive: 0.68,
      neutral: 0.26,
      negative: 0.06,
      overall: 0.62
    },
    keyPhrases: ["5000mAh battery", "5G connectivity", "Budget friendly", "Good camera"],
    lastUpdated: "3 days ago",
    specs: {
      battery: "5000mAh",
      display: "6.6\" FHD+",
      camera: "50MP Triple Camera",
      storage: "128GB",
      ram: "6GB"
    },
    insights: {
      positive: [
        "5000mAh battery lasts a full day easily",
        "5G connectivity included",
        "Good camera for the price point",
        "Budget-friendly option"
      ],
      neutral: [
        "Performance is adequate for basic tasks",
        "Design is standard Samsung"
      ],
      negative: [
        "Battery could be larger like M34",
        "Charging speed is only 15W"
      ]
    }
  }
];

// Other phones under ₹30,000 (fallback)
const otherPhones: Product[] = [
  {
    id: "other-1",
    name: "Redmi Note 12 Pro 5G",
    brand: "Xiaomi",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop",
    category: "Smartphones",
    description: "6.67\" AMOLED Display, 5000mAh Battery, 50MP Camera, 5G, 128GB Storage",
    prices: [
      { store: "Flipkart", price: "19999", link: "#" },
      { store: "Amazon.in", price: "20999", link: "#" }
    ],
    reviewCount: 23456,
    rating: 4.3,
    sentiment: {
      positive: 0.75,
      neutral: 0.20,
      negative: 0.05,
      overall: 0.70
    },
    keyPhrases: ["5000mAh battery", "AMOLED display", "Good camera", "5G ready"],
    lastUpdated: "1 day ago",
    specs: {
      battery: "5000mAh",
      display: "6.67\" AMOLED",
      camera: "50MP Camera",
      storage: "128GB",
      ram: "8GB"
    },
    insights: {
      positive: [
        "5000mAh battery with 67W fast charging",
        "AMOLED display with 120Hz refresh rate",
        "Good camera performance",
        "5G connectivity included"
      ],
      neutral: [
        "MIUI has ads but is feature-rich",
        "Performance is good for the price"
      ],
      negative: [
        "MIUI bloatware can be annoying",
        "Camera could be better in low light"
      ]
    }
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("relevance");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [bookmarkedProducts, setBookmarkedProducts] = useState<string[]>([]);

  // Check if search is for Samsung phones under ₹30,000
  const isSamsungSearch = query.toLowerCase().includes('samsung') && 
    query.toLowerCase().includes('₹30,000') && 
    query.toLowerCase().includes('battery');

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (isSamsungSearch) {
        setFilteredProducts(samsungPhones);
      } else {
        // Show other phones if no Samsung matches
        setFilteredProducts(otherPhones);
      }
      setIsLoading(false);
    }, 1000);
  }, [query, filters, isSamsungSearch]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // Apply sorting logic here
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleBookmark = (productId: string) => {
    setBookmarkedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Highlight search terms in text
  const highlightSearchTerms = (text: string) => {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<strong>$1</strong>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <SearchHeader />
      
      <main className="flex-1 container mx-auto py-4 md:py-8 px-4 md:px-6">
        {/* Search Summary */}
        <div className="mb-6 md:mb-8">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <Search className="h-5 w-5 md:h-6 md:w-6 text-brand-purple" />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-black">
                Search Results
              </h1>
            </div>
            
            <div className="text-base md:text-lg text-brand-black/80 mb-3 md:mb-4">
              {isSamsungSearch ? (
                <>
                  <span className="font-semibold">{filteredProducts.length} Samsung phones</span> found for "
                  <span className="font-semibold text-brand-purple">{highlightSearchTerms(query)}</span>"
                </>
              ) : (
                <>
                  <span className="font-semibold">{filteredProducts.length} products</span> found for "
                  <span className="font-semibold text-brand-purple">{highlightSearchTerms(query)}</span>"
                </>
              )}
            </div>

            {!isSamsungSearch && query.toLowerCase().includes('samsung') && (
              <div className="bg-brand-yellow/30 border border-brand-yellow/50 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-brand-black/70 mt-0.5" />
                  <div>
                    <p className="font-medium text-brand-black mb-1 text-sm md:text-base">
                      No matching Samsung phones found
                    </p>
                    <p className="text-xs md:text-sm text-brand-black/70">
                      But here are other top phones under ₹30,000 with good battery life.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Related Searches */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs md:text-sm font-medium text-brand-black/60">Related searches:</span>
              {["Samsung phones under ₹25,000", "Best battery phones", "5G phones under ₹30,000", "Samsung M series"].map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-brand-purple/30 text-brand-purple hover:bg-brand-purple/10 touch-manipulation"
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-20">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full bg-white border-2 border-gray-200 hover:border-brand-purple text-brand-black touch-manipulation py-3"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>
              
              {/* Filters */}
              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                <SearchFilters onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-1">
            {/* Sort and Actions Bar */}
            <div className="bg-white rounded-xl p-3 md:p-4 shadow-md mb-4 md:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4 w-full sm:w-auto">
                  <span className="text-xs md:text-sm font-medium text-brand-black/70">Sort by:</span>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                      <SelectItem value="battery">Battery Capacity</SelectItem>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {selectedProducts.length > 0 && (
                    <Badge variant="secondary" className="bg-brand-purple text-white text-xs md:text-sm">
                      {selectedProducts.length} selected
                    </Badge>
                  )}
                  {selectedProducts.length >= 2 && (
                    <Button size="sm" className="bg-brand-purple hover:bg-brand-purple-dark text-xs md:text-sm touch-manipulation">
                      Compare ({selectedProducts.length})
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Loading State */}
            {isLoading ? (
              <div className="space-y-4 md:space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <Skeleton className="h-32 md:h-48 w-full md:w-64 rounded-md" />
                      <div className="flex-1 space-y-3 md:space-y-4">
                        <Skeleton className="h-5 md:h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 md:h-8 w-16 md:w-20 rounded-full" />
                          <Skeleton className="h-6 md:h-8 w-16 md:w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-24 md:h-32 w-full rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Results */
              <div className="space-y-4 md:space-y-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard 
                        product={product}
                        isSelected={selectedProducts.includes(product.id)}
                        isBookmarked={bookmarkedProducts.includes(product.id)}
                        onSelect={() => toggleProductSelection(product.id)}
                        onBookmark={() => toggleBookmark(product.id)}
                        highlightTerms={query}
                      />
                    </div>
                  ))
                ) : (
                  /* No Results State */
                  <div className="bg-white rounded-xl p-6 md:p-8 text-center shadow-md">
                    <Search className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                    <h3 className="text-lg md:text-xl font-semibold text-brand-black mb-2">
                      No products found
                    </h3>
                    <p className="text-brand-black/70 mb-4 md:mb-6 text-sm md:text-base">
                      We couldn't find exact matches. Try adjusting filters or searching for similar products.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["Samsung phones", "Phones under ₹30,000", "Good battery phones", "5G phones"].map((suggestion, index) => (
                        <Button key={index} variant="outline" size="sm" className="text-xs touch-manipulation">
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-4 md:bottom-6 right-4 md:right-6 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-full w-10 h-10 md:w-12 md:h-12 p-0 shadow-lg touch-manipulation"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
