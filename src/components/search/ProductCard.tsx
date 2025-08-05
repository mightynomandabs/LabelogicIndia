
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
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
}

// Mock reviews data for text-to-speech
const mockReviewSummary = {
  "1": "boAt Airdopes 141 has received mostly positive reviews from Indian users. 74% of reviews are positive, with users praising the battery life and sound quality. However, some users reported issues with build quality. Overall, it offers good value for money at ₹1,299 on Flipkart.",
  "2": "Noise ColorFit Pro 3 Smartwatch has been well-received by Indian customers with 71% positive reviews. Users appreciate the display quality and battery life. Some concerns were noted about the health tracking accuracy. Available at ₹2,999 on Amazon.",
  "3": "Sony WH-1000XM4 headphones are highly rated by Indian users with 82% positive reviews. The noise cancellation feature and sound quality are exceptional according to most reviewers. The price point of ₹24,999 is considered high but justified for the premium features.",
  "4": "Samsung Galaxy S22 Ultra has received 77% positive reviews from Indian customers. The camera quality and display are highlighted as outstanding features. Some users mentioned concerns about battery life. Currently available at ₹72,999 on the Samsung Shop."
};

// Mock feature categories
const featureCategories = ["All", "Battery", "Sound", "Design", "Price", "Comfort"];

const ProductCard = ({ product }: ProductCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showInsights, setShowInsights] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("All");
  const { toast } = useToast();

  const bestPrice = product.prices.reduce((lowest, current) => 
    parseFloat(current.price.replace(/[^0-9.]/g, '')) < parseFloat(lowest.price.replace(/[^0-9.]/g, '')) 
      ? current 
      : lowest
  );

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-64 h-48 md:h-auto overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center text-sm">
                <Badge variant="outline" className="mr-2">
                  {product.category}
                </Badge>
                <span className="text-muted-foreground">{product.brand}</span>
              </div>
              
              <Link to={`/product/${product.id}`} className="hover:text-brand-purple">
                <h2 className="text-xl font-semibold mt-1 mb-2">{product.name}</h2>
              </Link>
              
              <p className="text-muted-foreground line-clamp-2 mb-3">
                {product.description}
              </p>
              
              <div className="flex items-center text-sm mb-4">
                <div className="flex items-center mr-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center mr-4">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground mr-1" />
                  <span>{product.reviewCount} reviews</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span>Updated {product.lastUpdated}</span>
                </div>
              </div>
              
              {/* Sentiment Visualization Section */}
              <div className="flex flex-col md:flex-row gap-4 items-start mt-4">
                <div className="w-full md:w-1/3">
                  <h3 className="text-sm font-medium mb-2">Sentiment Analysis</h3>
                  <div className="bg-brand-white p-3 rounded-lg border border-gray-200">
                    <SentimentPieChart 
                      positive={product.sentiment.positive}
                      neutral={product.sentiment.neutral}
                      negative={product.sentiment.negative}
                      keyPhrases={product.keyPhrases}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Key Highlights</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowInsights(!showInsights)}
                      className="flex items-center text-xs text-brand-black"
                    >
                      {showInsights ? "Hide Details" : "Show Detailed Insights"}
                      {showInsights ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {product.keyPhrases.map((phrase, index) => (
                      <Badge key={index} variant="secondary">
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Accessibility Features */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={handleTTS}
                      className="text-xs flex items-center bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black border-brand-white"
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
                  
                  {/* Social Sharing Section */}
                  <div className="mt-3">
                    <SocialShareButtons product={product} />
                  </div>
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
                  <div className="text-2xl font-bold text-brand-purple-dark">
                    ₹{bestPrice.price.replace(/[^0-9.]/g, '')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    at {bestPrice.store}
                  </div>
                </div>
              </div>
              
              <div className="w-full space-y-2">
                <Link to={`/product/${product.id}`}>
                  <Button className="w-full bg-brand-purple hover:bg-brand-purple-dark">
                    View All Reviews
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Compare Prices
                </Button>
                <a 
                  href={bestPrice.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center text-sm text-brand-purple hover:text-brand-purple-dark mt-2"
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
  );
};

export default ProductCard;
