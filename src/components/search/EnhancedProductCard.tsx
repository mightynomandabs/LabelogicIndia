import { 
  CalendarDays, 
  Star, 
  ThumbsUp,
  ArrowUpRight,
  Headphones,
  Play,
  Pause,
  Share2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  Battery,
  Smartphone,
  Camera,
  HardDrive,
  RefreshCw,
  Image as ImageIcon,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SentimentPieChart } from "./SentimentPieChart";
import { SocialShareButtons } from "./SocialShareButtons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { useProductImage } from "@/hooks/useProductImage";

interface Price {
  store: string;
  price: string;
  link: string;
}

interface SentimentScore {
  positive: number;
  neutral: number;
  negative: number;
  overall: number; // -1 to 1 range
}

interface Specs {
  battery?: string;
  display?: string;
  camera?: string;
  storage?: string;
  ram?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: string;
  description: string;
  prices: Price[];
  reviewCount: number;
  rating: number;
  sentiment: SentimentScore;
  keyPhrases: string[];
  lastUpdated: string;
  specs?: Specs;
  insights?: {
    positive: string[];
    neutral: string[];
    negative: string[];
    byFeature?: {
      [key: string]: {
        positive: string[];
        negative: string[];
      }
    }
  };
}

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
  isBookmarked?: boolean;
  onSelect?: () => void;
  onBookmark?: () => void;
  highlightTerms?: string;
}

// Mock reviews data for text-to-speech
const mockReviewSummary = {
  "samsung-1": "Samsung Galaxy M34 5G has received excellent reviews from Indian users. 78% of reviews are positive, with users praising the 6000mAh battery life and 5G connectivity. The AMOLED display and camera performance are also highly rated. Available at ₹18,999 on Flipkart.",
  "samsung-2": "Samsung Galaxy F14 5G has been well-received by Indian customers with 72% positive reviews. Users appreciate the 6000mAh battery and 5G connectivity. Some concerns were noted about charging speed. Available at ₹15,999 on Flipkart.",
  "samsung-3": "Samsung Galaxy A14 5G has received 68% positive reviews from Indian users. The 5000mAh battery and 5G connectivity are highlighted as good features. Some users mentioned the battery could be larger. Available at ₹13,999 on Flipkart.",
  "other-1": "Redmi Note 12 Pro 5G has received 75% positive reviews from Indian customers. The 5000mAh battery with 67W fast charging and AMOLED display are highly praised. Some users mentioned MIUI bloatware. Available at ₹19,999 on Flipkart."
};

// Mock feature categories
const featureCategories = ["All", "Battery", "Sound", "Design", "Price", "Comfort"];

const EnhancedProductCard = ({ 
  product, 
  isSelected = false, 
  isBookmarked = false, 
  onSelect, 
  onBookmark, 
  highlightTerms = "" 
}: ProductCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showInsights, setShowInsights] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("All");
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPriceDrop, setShowPriceDrop] = useState(false);
  const { toast } = useToast();

  // Use the new image service
  const { imageUrl, isLoading, error, source, retry } = useProductImage(product.name);

  const bestPrice = product.prices.reduce((lowest, current) => 
    parseFloat(current.price.replace(/[^0-9.]/g, '')) < parseFloat(lowest.price.replace(/[^0-9.]/g, '')) 
      ? current 
      : lowest
  );

  // Simulate price drop animation
  useState(() => {
    if (Math.random() > 0.7) {
      setTimeout(() => setShowPriceDrop(true), 2000);
    }
  });

  // Highlight search terms in text
  const highlightSearchTerms = (text: string) => {
    if (!highlightTerms) return text;
    
    const searchTerms = highlightTerms.toLowerCase().split(' ').filter(term => term.length > 2);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<strong class="text-brand-purple">$1</strong>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  // Mock TTS functionality
  const handleTTS = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const summary = mockReviewSummary[product.id] || 
        `${product.name} has ${product.rating.toFixed(1)} stars based on ${product.reviewCount} reviews.`;
      
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.rate = playbackRate;
      utterance.lang = 'en-IN';
      
      // Try to find an Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(voice => voice.lang === 'en-IN');
      if (indianVoice) utterance.voice = indianVoice;
      
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      toast({
        title: "Review Summary",
        description: "Playing review summary audio...",
        duration: 3000,
      });
    } else {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in your browser",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Handle playback rate change
  const changePlaybackRate = (newRate: number) => {
    setPlaybackRate(newRate);
    if (isPlaying) {
      handleTTS(); // Stop current playback
      setTimeout(() => {
        setPlaybackRate(newRate);
        handleTTS(); // Restart with new rate
      }, 100);
    }
  };

  // Get filtered insights based on selected feature
  const getFilteredInsights = () => {
    if (!product.insights) return { positive: [], negative: [] };
    
    if (selectedFeature === "All") {
      return {
        positive: product.insights.positive,
        negative: product.insights.negative
      };
    }
    
    // Return feature-specific insights if available
    return product.insights.byFeature?.[selectedFeature] || { positive: [], negative: [] };
  };

  const filteredInsights = getFilteredInsights();

  return (
    <div className={`relative group perspective-1000 ${
      isSelected ? 'ring-2 ring-brand-purple ring-opacity-50' : ''
    }`}>
      {/* Price Drop Badge */}
      {showPriceDrop && (
        <div className="absolute -top-2 -right-2 z-20 animate-bounce">
          <Badge className="bg-sentiment-positive text-white font-bold px-3 py-1 shadow-lg">
            <TrendingUp className="w-3 h-3 mr-1" />
            Price Drop!
          </Badge>
        </div>
      )}

      <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-500 
                      transform hover:scale-105 hover:shadow-2xl hover:shadow-brand-purple/20
                      ${isSelected ? 'border-brand-purple bg-brand-purple/5' : 'border-transparent hover:border-brand-purple/30'}`}>
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-64 h-48 md:h-auto overflow-hidden relative group">
            {/* Image Loading States */}
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="h-6 w-6 animate-spin text-brand-purple" />
                  <span className="text-sm text-gray-500">Loading image...</span>
                </div>
              </div>
            ) : error ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Image unavailable</span>
                  <Button size="sm" variant="outline" onClick={retry} className="hover:scale-105 transition-transform">
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <img 
                src={imageUrl || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => {
                  console.warn('Image failed to load, using fallback');
                }}
              />
            )}
            
            {/* Image Source Badge */}
            {source && (
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                  Mock Image
                </Badge>
              </div>
            )}
            
            {/* Selection and Bookmark Overlay */}
            <div className="absolute top-3 left-3 flex gap-2">
              {onSelect && (
                <div className="flex items-center justify-center w-8 h-8 bg-white/90 rounded-full shadow-md 
                              hover:scale-110 transition-transform duration-200">
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={onSelect}
                    className="data-[state=checked]:bg-brand-purple data-[state=checked]:border-brand-purple"
                  />
                </div>
              )}
              
              {onBookmark && (
                <Button
                  onClick={onBookmark}
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md p-0
                           hover:scale-110 transition-transform duration-200"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4 text-brand-purple fill-brand-purple" />
                  ) : (
                    <Bookmark className="h-4 w-4 text-gray-600" />
                  )}
                </Button>
              )}
            </div>
            
            {/* Best Price Badge with animation */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-sentiment-positive text-white font-semibold animate-pulse-brand">
                <Sparkles className="w-3 h-3 mr-1" />
                Best Price
              </Badge>
            </div>

            {/* Hover overlay with quick actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-brand-purple hover:bg-brand-purple-dark text-white"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  {isFlipped ? "Show Details" : "Quick View"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center text-sm mb-2">
                  <Badge variant="outline" className="mr-2 hover:scale-105 transition-transform">
                    {product.category}
                  </Badge>
                  <span className="text-muted-foreground">{product.brand}</span>
                </div>
                
                <Link to={`/product/${product.id}`} className="hover:text-brand-purple transition-colors">
                  <h2 className="text-xl font-semibold mt-1 mb-2 hover:scale-105 transition-transform">
                    {highlightSearchTerms(product.name)}
                  </h2>
                </Link>
                
                <p className="text-muted-foreground line-clamp-2 mb-3">
                  {highlightSearchTerms(product.description)}
                </p>
                
                {/* Key Specs Highlight */}
                {product.specs && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.specs.battery && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 
                                                           hover:scale-105 transition-transform">
                        <Battery className="h-3 w-3 mr-1" />
                        {product.specs.battery}
                      </Badge>
                    )}
                    {product.specs.display && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 
                                                           hover:scale-105 transition-transform">
                        <Smartphone className="h-3 w-3 mr-1" />
                        {product.specs.display}
                      </Badge>
                    )}
                    {product.specs.camera && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 
                                                           hover:scale-105 transition-transform">
                        <Camera className="h-3 w-3 mr-1" />
                        {product.specs.camera}
                      </Badge>
                    )}
                    {product.specs.storage && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 
                                                           hover:scale-105 transition-transform">
                        <HardDrive className="h-3 w-3 mr-1" />
                        {product.specs.storage}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center text-sm mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{product.reviewCount.toLocaleString()} reviews</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>Updated {product.lastUpdated}</span>
                  </div>
                </div>
                
                {/* Sentiment and Key Highlights Section */}
                <div className="mt-4 space-y-4">
                  {/* Sentiment Analysis - Prominent Position */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 
                                hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-brand-black">Customer Sentiment</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-sentiment-positive rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-green-700">
                            {Math.round(product.sentiment.positive * 100)}% Positive
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-600">
                            {Math.round(product.sentiment.neutral * 100)}% Neutral
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-sentiment-negative rounded-full"></div>
                          <span className="text-xs font-medium text-red-700">
                            {Math.round(product.sentiment.negative * 100)}% Negative
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16">
                        <SentimentPieChart 
                          positive={product.sentiment.positive}
                          neutral={product.sentiment.neutral}
                          negative={product.sentiment.negative}
                          keyPhrases={product.keyPhrases}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.keyPhrases.map((phrase, index) => (
                            <Badge key={index} variant="secondary" className="text-xs hover:scale-105 transition-transform">
                              {highlightSearchTerms(phrase)}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={handleTTS}
                            className="text-xs flex items-center bg-brand-purple hover:bg-brand-purple-dark text-white
                                     hover:scale-105 transition-transform"
                            size="sm"
                          >
                            {isPlaying ? <Pause className="h-3 w-3 mr-1" /> : <Headphones className="h-3 w-3 mr-1" />}
                            {isPlaying ? "Stop" : "Listen to Reviews"}
                          </Button>
                          
                          {isPlaying && (
                            <ToggleGroup type="single" value={playbackRate.toString()} onValueChange={(value) => value && changePlaybackRate(parseFloat(value))}>
                              <ToggleGroupItem value="0.5" size="sm" className="text-xs">0.5x</ToggleGroupItem>
                              <ToggleGroupItem value="1" size="sm" className="text-xs">1x</ToggleGroupItem>
                              <ToggleGroupItem value="1.5" size="sm" className="text-xs">1.5x</ToggleGroupItem>
                            </ToggleGroup>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Detailed Insights Toggle */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-brand-black">Detailed Insights</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowInsights(!showInsights)}
                      className="flex items-center text-xs text-brand-purple hover:text-brand-purple-dark
                               hover:scale-105 transition-transform"
                    >
                      {showInsights ? "Hide Details" : "Show Details"}
                      {showInsights ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                    </Button>
                  </div>
                  
                  {/* Social Sharing Section */}
                  <div className="flex justify-end">
                    <SocialShareButtons product={product} />
                  </div>
                </div>
                
                {/* Collapsible Detailed Insights Section */}
                {showInsights && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Detailed Insights</h3>
                      <ToggleGroup type="single" value={selectedFeature} onValueChange={(value) => value && setSelectedFeature(value)}>
                        {featureCategories.map(feature => (
                          <ToggleGroupItem key={feature} value={feature} size="sm" className="text-xs">
                            {feature}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-sentiment-positive mb-2">Pros:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {filteredInsights.positive.map((insight, idx) => (
                            <li key={`pos-${idx}`}>{insight}</li>
                          ))}
                          {filteredInsights.positive.length === 0 && (
                            <li className="text-muted-foreground">No positive insights for this feature</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-sentiment-negative mb-2">Cons:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {filteredInsights.negative.map((insight, idx) => (
                            <li key={`neg-${idx}`}>{insight}</li>
                          ))}
                          {filteredInsights.negative.length === 0 && (
                            <li className="text-muted-foreground">No negative insights for this feature</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:w-52 flex flex-col items-start space-y-4">
                <div className="w-full">
                  <div className="text-sm text-muted-foreground mb-1">Best Price</div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-brand-purple-dark animate-count-up">
                      ₹{bestPrice.price.replace(/[^0-9.]/g, '')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      at {bestPrice.store}
                    </div>
                  </div>
                </div>
                
                <div className="w-full space-y-2">
                  <Link to={`/product/${product.id}`}>
                    <Button className="w-full bg-brand-purple hover:bg-brand-purple-dark 
                                     hover:scale-105 transition-transform duration-200">
                      View All Reviews
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full hover:scale-105 transition-transform duration-200">
                    Compare Prices
                  </Button>
                  <a 
                    href={bestPrice.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center text-sm text-brand-purple hover:text-brand-purple-dark 
                             mt-2 hover:scale-105 transition-transform duration-200"
                  >
                    View at {bestPrice.store}
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductCard; 