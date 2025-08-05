
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Speaker, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";

interface MarketplaceData {
  marketplace: string;
  price: string;
  delivery: string;
  condition: string;
  link: string;
}

const ProductDetail = () => {
  const { productId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();
  
  // Sample marketplace data
  const marketplaceData: MarketplaceData[] = [
    { marketplace: "Amazon", price: "₹32,999", delivery: "2 days", condition: "New", link: "#amazon" },
    { marketplace: "Flipkart", price: "₹33,250", delivery: "3 days", condition: "New", link: "#flipkart" },
    { marketplace: "Croma", price: "₹33,499", delivery: "4 days", condition: "New", link: "#croma" },
    { marketplace: "Reliance Digital", price: "₹32,499", delivery: "5 days", condition: "New", link: "#reliance" }
  ];
  
  // Sample review data
  const reviews = [
    { author: "Amit S.", rating: 4.5, content: "Great battery life, decent camera, and smooth performance. Highly recommend for the price!" },
    { author: "Neha M.", rating: 4, content: "I've been using it for a month now. The display is excellent and the battery lasts almost two days." },
    { author: "Rajesh K.", rating: 3.5, content: "Good phone overall, but the camera could be better in low light." }
  ];
  
  // Sample tech specs
  const techSpecs = {
    display: "6.5-inch Super AMOLED, 120Hz",
    processor: "Snapdragon 8 Gen 1",
    battery: "5000mAh, 65W fast charging",
    camera: "50MP main + 12MP ultra-wide + 8MP telephoto",
    storage: "256GB UFS 3.1",
    ram: "12GB LPDDR5",
    os: "Android 13"
  };
  
  // Sample price history
  const priceHistory = [
    { date: "May 1, 2025", price: "₹34,999" },
    { date: "Apr 1, 2025", price: "₹33,999" },
    { date: "Mar 1, 2025", price: "₹32,999" },
    { date: "Feb 1, 2025", price: "₹35,999" }
  ];
  
  // Sample FAQs
  const faqs = [
    { 
      question: "Is this phone water resistant?", 
      answer: "Yes, it has an IP68 rating for water and dust resistance."
    },
    { 
      question: "Does it support wireless charging?", 
      answer: "Yes, it supports 15W Qi wireless charging."
    },
    { 
      question: "How many years of software updates will it receive?", 
      answer: "The manufacturer promises 3 years of OS updates and 4 years of security patches."
    }
  ];

  const handlePlaySummary = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const summary = "This smartphone has received mostly positive reviews from Indian users. 78% of reviews are positive, with users praising the battery life and display quality. Some users reported issues with camera performance in low light. Overall, it offers good value for money, with the best price currently at ₹32,499 on Reliance Digital.";
      
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.lang = 'en-IN';
      
      // Try to find an Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(voice => voice.lang === 'en-IN');
      if (indianVoice) utterance.voice = indianVoice;
      
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      toast({
        title: "Playing Summary",
        description: "Now playing the product review summary",
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

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Product Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Product Image */}
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&h=500"
                alt="Sample product image"
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Product Info */}
            <div className="md:w-2/3">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Samsung Galaxy S23 Ultra</h1>
              <div className="flex items-center mb-4">
                <div className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                  4.5 ★
                </div>
                <span className="ml-2 text-muted-foreground">Based on 1,245 reviews</span>
              </div>
              
              {/* AI Summary */}
              <Card className="mb-4 border-brand-purple border-2">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-2">What Users Say</h2>
                  <p className="text-muted-foreground">
                    This smartphone has received mostly positive reviews from Indian users. 78% of reviews are positive, 
                    with users praising the battery life and display quality. Some users reported issues with camera 
                    performance in low light. Overall, it offers good value for money, with the best price currently 
                    at ₹32,499 on Reliance Digital.
                  </p>
                  <Button 
                    onClick={handlePlaySummary} 
                    className="mt-4 bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark"
                  >
                    <Speaker className="mr-2" />
                    {isPlaying ? 'Stop Audio' : 'Listen to Summary'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Marketplace Comparison */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Price Comparison</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marketplace</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketplaceData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.marketplace}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.delivery}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>
                        <a 
                          href={item.link}
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                            Buy Now
                          </Button>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Tabs for Additional Information */}
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="specs">Tech Specs</TabsTrigger>
              <TabsTrigger value="price-history">Price History</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews" className="p-4 border rounded-md mt-4">
              <h3 className="text-lg font-medium mb-4">User Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{review.author}</span>
                      <span className="bg-brand-yellow text-brand-black px-2 py-1 rounded text-sm">
                        {review.rating} ★
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Tech Specs Tab */}
            <TabsContent value="specs" className="p-4 border rounded-md mt-4">
              <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(techSpecs).map(([key, value], index) => (
                  <div key={index} className="border-b pb-2">
                    <dt className="font-medium capitalize">{key}</dt>
                    <dd className="text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
            
            {/* Price History Tab */}
            <TabsContent value="price-history" className="p-4 border rounded-md mt-4">
              <h3 className="text-lg font-medium mb-4">Price History</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priceHistory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* FAQs Tab */}
            <TabsContent value="faqs" className="p-4 border rounded-md mt-4">
              <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Collapsible key={index} className="border rounded-md">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-medium text-left">
                      {faq.question}
                      <ChevronDown className="h-5 w-5" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0 text-muted-foreground">
                      {faq.answer}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
