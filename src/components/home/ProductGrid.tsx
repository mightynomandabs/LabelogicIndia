
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ExternalLink } from "lucide-react";

const ProductGrid: React.FC = () => {
  // Sample data that would be replaced with real data from API calls
  const sampleProducts = [
    {
      id: 1,
      name: "Samsung Galaxy M34",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&h=300",
      price: "₹16,499",
      rating: 4.3,
      originalPrice: "₹18,999",
      discount: "13% OFF"
    },
    {
      id: 2,
      name: "OnePlus Nord CE 3",
      image: "https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?auto=format&fit=crop&w=300&h=300",
      price: "₹24,999",
      rating: 4.5,
      originalPrice: "₹26,999",
      discount: "7% OFF"
    },
    {
      id: 3,
      name: "Redmi Note 13 Pro",
      image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=300&h=300",
      price: "₹21,999",
      rating: 4.2,
      originalPrice: "₹23,999",
      discount: "8% OFF"
    }
  ];

  const marketplaces = [
    { 
      name: "Amazon", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
      price: "₹16,499",
      delivery: "Free delivery",
      rating: 4.8
    },
    { 
      name: "Flipkart", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flipkart_logo.svg/2560px-Flipkart_logo.svg.png",
      price: "₹16,599",
      delivery: "Free delivery",
      rating: 4.6
    },
    { 
      name: "Croma", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Croma_logo.svg/2560px-Croma_logo.svg.png",
      price: "₹16,990",
      delivery: "Free delivery",
      rating: 4.4
    }
  ];

  // Sample highlights that would come from review analysis
  const highlights = [
    "6.5-inch Super AMOLED display",
    "50MP main camera with OIS",
    "6000mAh battery lasts 2 days",
    "Smooth performance for daily use",
    "Good value for money under ₹20,000"
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? "fill-brand-purple text-brand-purple" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Column 1: Product Results */}
      <Card className="lg:col-span-1 border-2 border-brand-black/10 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-brand-black flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-brand-purple" />
            Product Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sampleProducts.map(product => (
              <div 
                key={product.id} 
                className="border-2 border-brand-black/10 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-brand-purple/30 bg-white"
              >
                <div className="flex items-start space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-24 h-24 object-cover rounded-lg border border-brand-black/10" 
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-brand-black text-lg mb-1 truncate">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                        <span className="ml-1 text-sm text-brand-black/70">({product.rating})</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl font-bold text-brand-black">{product.price}</span>
                      <span className="text-sm text-brand-black/50 line-through">{product.originalPrice}</span>
                      <span className="text-xs bg-brand-purple text-white px-2 py-1 rounded-full font-medium">
                        {product.discount}
                      </span>
                    </div>
                    <Button 
                      className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white rounded-lg"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Column 2: Summary/Highlights */}
      <Card className="lg:col-span-1 border-2 border-brand-black/10 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-brand-black flex items-center">
            <Star className="h-5 w-5 mr-2 text-brand-purple" />
            Expert Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-brand-black mb-3">Samsung Galaxy M34</h4>
            <div className="flex items-center mb-4">
              {renderStars(4.3)}
              <span className="ml-2 text-sm text-brand-black/70">4.3/5 from 2,847 reviews</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-semibold text-brand-black">Key Features:</h5>
            <ul className="space-y-2">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-brand-purple mr-2 mt-1">•</span>
                  <span className="text-brand-black/80">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 p-4 bg-brand-yellow/50 rounded-xl border border-brand-yellow-dark">
            <h4 className="font-semibold text-brand-black mb-2 flex items-center">
              <Star className="h-4 w-4 mr-2 text-brand-purple fill-current" />
              Expert Opinion
            </h4>
            <p className="text-brand-black/80 leading-relaxed">
              Great value for money with excellent battery life and camera performance. 
              Recommended for budget-conscious users who prioritize battery life and photography.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Column 3: Buy Options */}
      <Card className="lg:col-span-1 border-2 border-brand-black/10 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-brand-black flex items-center">
            <ExternalLink className="h-5 w-5 mr-2 text-brand-purple" />
            Buy Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketplaces.map((market, index) => (
              <div key={index} className="border-2 border-brand-black/10 rounded-xl p-4 hover:border-brand-purple/30 transition-all duration-200 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={market.logo} 
                      alt={`${market.name} logo`}
                      className="h-8 w-auto object-contain"
                    />
                    <div>
                      <span className="font-semibold text-brand-black">{market.name}</span>
                      <div className="flex items-center">
                        {renderStars(market.rating)}
                        <span className="ml-1 text-xs text-brand-black/70">({market.rating})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg text-brand-black">{market.price}</span>
                    <p className="text-xs text-brand-black/60">{market.delivery}</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  View Deal
                </Button>
              </div>
            ))}
            <div className="text-center mt-4">
              <p className="text-xs text-brand-black/60">
                Prices last updated: {new Date().toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductGrid;
