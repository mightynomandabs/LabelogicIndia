
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
  Image as ImageIcon
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

const ProductCard = ({ 
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
  const { toast } = useToast();

  // Use the new image service
  const { imageUrl, isLoading, error, source, retry } = useProductImage(product.name);

  const bestPrice = product.prices.reduce((lowest, current) => 
    parseFloat(current.price.replace(/[^0-9.]/g, '')) < parseFloat(lowest.price.replace(/[^0-9.]/g, '')) 
      ? current 
      : lowest
  );

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
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl ${
      isSelected ? 'border-brand-purple bg-brand-purple/5' : 'border-transparent hover:border-brand-purple/30'
    }`}>
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:flex-shrink-0 md:w-72 h-48 md:h-auto overflow-hidden relative">
          {/* Image Loading States */}
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="h-8 w-8 animate-spin text-brand-purple" />
                <span className="text-sm text-gray-500 font-medium">Loading image...</span>
              </div>
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <div className="flex flex-col items-center gap-3">
                <ImageIcon className="h-10 w-10 text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">Image unavailable</span>
                <Button size="sm" variant="outline" onClick={retry} className="mt-2">
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <img 
              src={imageUrl || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              onError={() => {
                console.warn('Image failed to load, using fallback');
              }}
            />
          )}
          
          {/* Image Source Badge */}
          {source && (
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 font-medium">
                Mock Image
              </Badge>
            </div>
          )}
          
          {/* Selection and Bookmark Overlay */}
          <div className="absolute top-4 left-4 flex gap-3">
            {onSelect && (
              <div className="flex items-center justify-center w-10 h-10 bg-white/95 rounded-xl shadow-lg touch-manipulation">
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
                className="w-10 h-10 bg-white/95 hover:bg-white rounded-xl shadow-lg p-0 touch-manipulation"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-brand-purple fill-brand-purple" />
                ) : (
                  <Bookmark className="h-5 w-5 text-gray-600" />
                )}
              </Button>
            )}
          </div>
          
          {/* Best Price Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-500 text-white font-bold text-sm px-3 py-1">
              Best Price
            </Badge>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 md:p-8 flex-1">
          <div className="flex flex-col h-full">
            {/* Header Section */}
            <div className="flex-1">
              <div className="flex items-center text-sm mb-3 md:mb-4">
                <Badge variant="outline" className="mr-3 font-medium">
                  {product.category}
                </Badge>
                <span className="text-muted-foreground font-medium">{product.brand}</span>
              </div>
              
              <Link to={`/product/${product.id}`} className="hover:text-brand-purple transition-colors">
                <h2 className="text-xl md:text-2xl font-bold mt-2 mb-3 md:mb-4 leading-tight">
                  {highlightSearchTerms(product.name)}
                </h2>
              </Link>
              
              <p className="text-muted-foreground line-clamp-2 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                {highlightSearchTerms(product.description)}
              </p>
              
              {/* Key Specs Highlight */}
              {product.specs && (
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                  {product.specs.battery && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 font-medium text-xs md:text-sm">
                      <Battery className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      {product.specs.battery}
                    </Badge>
                  )}
                  {product.specs.display && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 font-medium text-xs md:text-sm">
                      <Smartphone className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      {product.specs.display}
                    </Badge>
                  )}
                  {product.specs.camera && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 font-medium text-xs md:text-sm">
                      <Camera className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      {product.specs.camera}
                    </Badge>
                  )}
                  {product.specs.storage && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 font-medium text-xs md:text-sm">
                      <HardDrive className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      {product.specs.storage}
                    </Badge>
                  )}
                </div>
              )}
              
              {/* Rating and Reviews */}
              <div className="flex flex-col sm:flex-row sm:items-center text-sm mb-4 md:mb-6 space-y-2 sm:space-y-0">
                <div className="flex items-center mr-0 sm:mr-6">
                  <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400 mr-2" />
                  <span className="font-bold text-base md:text-lg">{product.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center mr-0 sm:mr-6">
                  <ThumbsUp className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mr-2" />
                  <span className="font-medium">{product.reviewCount.toLocaleString()} reviews</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  <span className="font-medium">Updated {product.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            {/* Sentiment Analysis Section */}
            <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-base md:text-lg font-bold text-brand-black mb-2 md:mb-0">Customer Sentiment</h3>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full"></div>
                      <span className="text-xs md:text-sm font-bold text-green-700">
                        {Math.round(product.sentiment.positive * 100)}% Positive
                      </span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-400 rounded-full"></div>
                      <span className="text-xs md:text-sm font-bold text-gray-600">
                        {Math.round(product.sentiment.neutral * 100)}% Neutral
                      </span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full"></div>
                      <span className="text-xs md:text-sm font-bold text-red-700">
                        {Math.round(product.sentiment.negative * 100)}% Negative
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20">
                    <SentimentPieChart 
                      positive={product.sentiment.positive}
                      neutral={product.sentiment.neutral}
                      negative={product.sentiment.negative}
                      keyPhrases={product.keyPhrases}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                      {product.keyPhrases.map((phrase, index) => (
                        <Badge key={index} variant="secondary" className="text-xs md:text-sm font-medium">
                          {highlightSearchTerms(phrase)}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <Button
                        onClick={handleTTS}
                        className="text-xs md:text-sm flex items-center bg-brand-purple hover:bg-brand-purple-dark text-white font-medium px-3 md:px-4 py-2 touch-manipulation"
                        size="sm"
                      >
                        {isPlaying ? <Pause className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" /> : <Headphones className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />}
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
                <h3 className="text-base md:text-lg font-bold text-brand-black">Detailed Insights</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowInsights(!showInsights)}
                  className="flex items-center text-xs md:text-sm text-brand-purple hover:text-brand-purple-dark font-medium touch-manipulation"
                >
                  {showInsights ? "Hide Details" : "Show Details"}
                  {showInsights ? <ChevronUp className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" /> : <ChevronDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />}
                </Button>
              </div>
              
              {/* Social Sharing Section */}
              <div className="flex justify-end">
                <SocialShareButtons product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
