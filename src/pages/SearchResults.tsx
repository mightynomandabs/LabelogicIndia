
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchHeader from "@/components/search/SearchHeader";
import SearchFilters from "@/components/search/SearchFilters";
import ProductCard, { Product } from "@/components/search/ProductCard";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// Enhanced mock data for products with detailed insights
const mockProducts: Product[] = [
  {
    id: "1",
    name: "boAt Airdopes 141 TWS Earbuds",
    brand: "boAt",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop",
    category: "Electronics",
    description: "TWS Earbuds with 42H Playtime, Beast Mode(Low Latency Upto 80ms) for Gaming, ENx Tech, ASAP Charge, IWP, IPX4 Water Resistance, Smooth Touch Controls(Bold Black)",
    prices: [
      { store: "Flipkart", price: "1299", link: "#" },
      { store: "Amazon.in", price: "1499", link: "#" },
      { store: "boAt", price: "1599", link: "#" }
    ],
    reviewCount: 18456,
    rating: 4.3,
    sentiment: {
      positive: 0.74,
      neutral: 0.20,
      negative: 0.06,
      overall: 0.68
    },
    keyPhrases: ["Battery life", "Sound quality", "Value for money", "Build quality"],
    lastUpdated: "2 days ago",
    insights: {
      positive: [
        "Impressive battery life with 42 hours of playback",
        "Good sound quality for the price point",
        "Excellent value for money at ₹1,299",
        "Comfortable fit for extended wear",
        "Quick charging capability is convenient"
      ],
      neutral: [
        "Average microphone quality for calls",
        "Standard design similar to other earbuds",
        "Touch controls can be finicky at times"
      ],
      negative: [
        "Build quality feels slightly cheap",
        "Occasional connectivity issues reported",
        "Bass could be stronger for bass enthusiasts"
      ],
      byFeature: {
        "Battery": {
          positive: ["Long battery life of 42 hours", "Quick charging is very useful"],
          negative: ["Battery indicator can be inaccurate"]
        },
        "Sound": {
          positive: ["Clear sound with good treble", "Balanced audio profile"],
          negative: ["Bass could be stronger", "Audio leakage at high volumes"]
        },
        "Design": {
          positive: ["Comfortable for long wear", "Lightweight design"],
          negative: ["Build feels somewhat cheap", "Case is bulkier than competitors"]
        },
        "Price": {
          positive: ["Excellent value for money", "Often available on sale"],
          negative: []
        },
        "Comfort": {
          positive: ["Comfortable for extended wear", "Multiple ear tip sizes included"],
          negative: ["Can become uncomfortable after 3+ hours"]
        }
      }
    }
  },
  {
    id: "2",
    name: "Noise ColorFit Pro 3 Smart Watch",
    brand: "Noise",
    image: "https://images.unsplash.com/photo-1615540732409-324643693fac?w=800&auto=format&fit=crop",
    category: "Electronics",
    description: "Noise ColorFit Pro 3 with 1.55\" HD Display, 10 Day Battery, 60 Sports Modes, SpO2, Heart Rate, Sleep, Stress Monitor & IP68 Waterproof (Jet Black)",
    prices: [
      { store: "Amazon.in", price: "2999", link: "#" },
      { store: "Reliance Digital", price: "3499", link: "#" },
      { store: "Croma", price: "3299", link: "#" }
    ],
    reviewCount: 14523,
    rating: 4.2,
    sentiment: {
      positive: 0.71,
      neutral: 0.22,
      negative: 0.07,
      overall: 0.64
    },
    keyPhrases: ["Battery life", "Display quality", "Health tracking", "Comfort"],
    lastUpdated: "3 days ago",
    insights: {
      positive: [
        "Excellent battery life lasting 7-10 days",
        "Bright and clear 1.55\" display",
        "Comprehensive health tracking features",
        "Good value for the price point",
        "Comfortable for all-day wear"
      ],
      neutral: [
        "Average build quality compared to premium watches",
        "Health metrics reasonably accurate but not medical-grade",
        "App interface could be more intuitive"
      ],
      negative: [
        "Some users report syncing issues with the app",
        "Heart rate monitor occasionally inaccurate",
        "Limited third-party app integration"
      ],
      byFeature: {
        "Battery": {
          positive: ["Long battery life of 7-10 days", "Fast charging capability"],
          negative: ["Battery life decreases with all features enabled"]
        },
        "Sound": {
          positive: [],
          negative: []
        },
        "Design": {
          positive: ["Sleek modern appearance", "Durable IP68 waterproofing"],
          negative: ["Screen scratches relatively easily"]
        },
        "Price": {
          positive: ["Good value compared to similar smartwatches", "Affordable price point"],
          negative: []
        },
        "Comfort": {
          positive: ["Lightweight and comfortable for all-day wear", "Adjustable strap"],
          negative: ["Some users report skin irritation after prolonged wear"]
        }
      }
    }
  },
  {
    id: "3",
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop",
    category: "Electronics",
    description: "Industry-leading noise cancellation with Dual Noise Sensor technology, exceptional sound quality with HD Noise Cancelling Processor QN1.",
    prices: [
      { store: "Flipkart", price: "24999", link: "#" },
      { store: "Amazon.in", price: "25990", link: "#" },
      { store: "Croma", price: "26999", link: "#" }
    ],
    reviewCount: 12876,
    rating: 4.7,
    sentiment: {
      positive: 0.82,
      neutral: 0.15,
      negative: 0.03,
      overall: 0.79
    },
    keyPhrases: ["Noise cancellation", "Battery life", "Sound quality", "Comfortable"],
    lastUpdated: "1 week ago",
    insights: {
      positive: [
        "Industry-leading noise cancellation performance",
        "Exceptional sound quality across all frequencies",
        "Comfortable for extended listening sessions",
        "Impressive 30-hour battery life",
        "Intuitive touch controls and app integration"
      ],
      neutral: [
        "Premium price point may not be for everyone",
        "Limited color options available",
        "No significant improvement in design from previous model"
      ],
      negative: [
        "Occasional connection issues when switching between devices",
        "Expensive compared to competitors",
        "Cannot use while charging"
      ],
      byFeature: {
        "Battery": {
          positive: ["30-hour battery life is excellent", "Quick charging provides hours of playback in minutes"],
          negative: ["Cannot use while charging"]
        },
        "Sound": {
          positive: ["Exceptional sound quality", "Great balance across all frequencies", "Customizable EQ"],
          negative: ["Default sound profile may be too bass-heavy for some"]
        },
        "Design": {
          positive: ["Premium build quality", "Foldable design for portability"],
          negative: ["Limited color options available"]
        },
        "Price": {
          positive: ["Worth the investment for audiophiles"],
          negative: ["Premium pricing makes it expensive compared to competitors"]
        },
        "Comfort": {
          positive: ["Very comfortable for extended wear", "Lightweight for its size"],
          negative: ["Ear cups can get warm during long sessions"]
        }
      }
    }
  },
  {
    id: "4",
    name: "Samsung Galaxy S22 Ultra 256GB",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1644677986236-d9c66746fb08?w=800&auto=format&fit=crop",
    category: "Electronics",
    description: "The Samsung Galaxy S22 Ultra features an embedded S Pen, Nightography camera with 108MP main sensor, and a 6.8-inch Dynamic AMOLED 2X display.",
    prices: [
      { store: "Flipkart", price: "74999", link: "#" },
      { store: "Amazon.in", price: "76990", link: "#" },
      { store: "Samsung Shop", price: "72999", link: "#" }
    ],
    reviewCount: 7532,
    rating: 4.6,
    sentiment: {
      positive: 0.77,
      neutral: 0.18,
      negative: 0.05,
      overall: 0.72
    },
    keyPhrases: ["Camera quality", "S Pen", "Display", "Battery"],
    lastUpdated: "1 week ago",
    insights: {
      positive: [
        "Exceptional camera quality especially in low light",
        "Bright, vibrant Dynamic AMOLED 2X display",
        "S Pen integration is seamless and useful",
        "Premium build quality and design",
        "Powerful performance for all tasks"
      ],
      neutral: [
        "Battery life is adequate but not spectacular",
        "OneUI has improved but still has some bloatware",
        "Expensive but competitive with similar flagship phones"
      ],
      negative: [
        "Battery drains quickly with heavy use",
        "Heating issues during intensive gaming",
        "Very expensive price point"
      ],
      byFeature: {
        "Battery": {
          positive: ["Fast charging capability", "Wireless charging support"],
          negative: ["Battery drains quickly with heavy use", "Not as long-lasting as advertised"]
        },
        "Sound": {
          positive: ["Good stereo speaker quality", "Clear call quality"],
          negative: ["No headphone jack"]
        },
        "Design": {
          positive: ["Premium build with Gorilla Glass", "Elegant design", "S Pen integration is seamless"],
          negative: ["Large size can be difficult to handle", "Quite heavy compared to other phones"]
        },
        "Price": {
          positive: ["Premium features justify the price for some users"],
          negative: ["Very expensive compared to non-flagship alternatives"]
        },
        "Comfort": {
          positive: ["S Pen is comfortable to use"],
          negative: ["Large size can be uncomfortable for one-handed use"]
        }
      }
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

  useEffect(() => {
    // Simulating API call to fetch search results
    setIsLoading(true);
    
    setTimeout(() => {
      // In a real app, we would filter based on the query and filters
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, [query, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SearchHeader />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Search results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-20">
              <SearchFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-4 shadow-md mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Tabs defaultValue="all" className="w-full sm:w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All Results</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                  <Select 
                    value={sortBy} 
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex gap-6">
                      <Skeleton className="h-48 w-64 rounded-md" />
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-20 rounded-full" />
                          <Skeleton className="h-8 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-32 w-full rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
