
import React from "react";
import { Search, Shield, TrendingUp, Users, Zap, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Describe what you want in natural language and get personalized product recommendations",
      color: "text-brand-purple"
    },
    {
      icon: Shield,
      title: "Verified Reviews",
      description: "All reviews are verified and analyzed for authenticity to ensure you get honest opinions",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Price Comparison",
      description: "Compare prices across Amazon, Flipkart, Croma and other major Indian retailers",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Expert Analysis",
      description: "Get expert insights and recommendations based on real user experiences and expert reviews",
      color: "text-orange-600"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive product analysis and price comparisons in seconds, not minutes",
      color: "text-yellow-600"
    },
    {
      icon: Award,
      title: "Best Deals",
      description: "Find the best deals, discounts, and offers across all major Indian e-commerce platforms",
      color: "text-red-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-brand-yellow/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            How Labelogic Works
          </h2>
          <p className="text-lg text-brand-black/70 max-w-3xl mx-auto">
            Our intelligent platform combines AI-powered search, verified reviews, and real-time price comparison 
            to help you make informed shopping decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-2 border-brand-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-4 rounded-full bg-brand-purple/10 group-hover:bg-brand-purple/20 transition-colors duration-200`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-brand-black text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-black/70 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it works steps */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-brand-black text-center mb-8">
            Simple 3-Step Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-brand-black mb-2">
                Describe Your Need
              </h4>
              <p className="text-brand-black/70">
                Tell us what you're looking for in simple, natural language
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-brand-black mb-2">
                Get Smart Results
              </h4>
              <p className="text-brand-black/70">
                Receive personalized recommendations with expert analysis
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-brand-black mb-2">
                Compare & Choose
              </h4>
              <p className="text-brand-black/70">
                Compare prices and reviews to make the best decision
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-brand-purple/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-brand-black mb-4">
              Ready to Start Shopping Smarter?
            </h3>
            <p className="text-brand-black/70 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust Labelogic for their shopping decisions. 
              Get started with your first search today!
            </p>
            <button className="bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:shadow-lg">
              Start Searching Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
