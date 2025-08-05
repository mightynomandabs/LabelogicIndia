import React, { useEffect, useRef, useState } from "react";
import { Search, Shield, TrendingUp, Users, Zap, Award, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EnhancedFeatures: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Describe what you want in natural language and get personalized product recommendations",
      color: "text-brand-purple",
      delay: 0
    },
    {
      icon: Shield,
      title: "Verified Reviews",
      description: "All reviews are verified and analyzed for authenticity to ensure you get honest opinions",
      color: "text-green-600",
      delay: 100
    },
    {
      icon: TrendingUp,
      title: "Price Comparison",
      description: "Compare prices across Amazon, Flipkart, Croma and other major Indian retailers",
      color: "text-blue-600",
      delay: 200
    },
    {
      icon: Users,
      title: "Expert Analysis",
      description: "Get expert insights and recommendations based on real user experiences and expert reviews",
      color: "text-orange-600",
      delay: 300
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive product analysis and price comparisons in seconds, not minutes",
      color: "text-yellow-600",
      delay: 400
    },
    {
      icon: Award,
      title: "Best Deals",
      description: "Find the best deals, discounts, and offers across all major Indian e-commerce platforms",
      color: "text-red-600",
      delay: 500
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Describe Your Need",
      description: "Tell us what you're looking for in simple, natural language",
      delay: 0
    },
    {
      number: 2,
      title: "Get Smart Results",
      description: "Receive personalized recommendations with expert analysis",
      delay: 200
    },
    {
      number: 3,
      title: "Compare & Choose",
      description: "Compare prices and reviews to make the best decision",
      delay: 400
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (entry.target.classList.contains('feature-card')) {
              setVisibleFeatures(prev => [...prev, index]);
            } else if (entry.target.classList.contains('step-card')) {
              setVisibleSteps(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
    const stepCards = stepsRef.current?.querySelectorAll('.step-card');

    featureCards?.forEach((card, index) => {
      card.setAttribute('data-index', index.toString());
      observer.observe(card);
    });

    stepCards?.forEach((card, index) => {
      card.setAttribute('data-index', index.toString());
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-brand-yellow/20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element" style={{ top: '10%', right: '5%', animationDelay: '0s' }} />
        <div className="floating-element" style={{ top: '60%', left: '5%', animationDelay: '3s' }} />
        <div className="floating-element" style={{ bottom: '20%', right: '15%', animationDelay: '6s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 animate-fade-in">
            How Labelogic Works
          </h2>
          <p className="text-lg text-brand-black/70 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Our intelligent platform combines AI-powered search, verified reviews, and real-time price comparison 
            to help you make informed shopping decisions
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`feature-card border-2 border-brand-black/10 shadow-lg hover:shadow-xl 
                         transition-all duration-500 bg-white group transform
                         ${visibleFeatures.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-4 rounded-full bg-brand-purple/10 group-hover:bg-brand-purple/20 
                                  transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-8 w-8 ${feature.color} group-hover:animate-pulse-brand`} />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-brand-black text-center group-hover:text-brand-purple transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-black/70 text-center leading-relaxed group-hover:text-brand-black/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it works steps */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-brand-black text-center mb-8 animate-fade-in">
            Simple 3-Step Process
          </h3>
          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`step-card text-center transform transition-all duration-500
                           ${visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${step.delay}ms` }}
              >
                <div className="w-16 h-16 bg-brand-purple text-white rounded-full flex items-center justify-center 
                                text-2xl font-bold mx-auto mb-4 hover:scale-110 transition-transform duration-300
                                hover:shadow-lg hover:shadow-brand-purple/30">
                  {step.number}
                </div>
                <h4 className="text-lg font-semibold text-brand-black mb-2 hover:text-brand-purple transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-brand-black/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-brand-purple/10 to-brand-yellow/10 rounded-2xl p-8 max-w-4xl mx-auto
                        hover:shadow-xl transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-brand-purple mr-2 animate-pulse-brand" />
              <h3 className="text-2xl font-bold text-brand-black">
                Ready to Start Shopping Smarter?
              </h3>
              <Sparkles className="h-6 w-6 text-brand-purple ml-2 animate-pulse-brand" />
            </div>
            <p className="text-brand-black/70 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust Labelogic for their shopping decisions. 
              Get started with your first search today!
            </p>
            <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-3 rounded-full 
                             font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105
                             group">
              <span className="mr-2">Start Searching Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-brand-purple mb-2 animate-count-up">
              50K+
            </div>
            <div className="text-brand-black/70">Happy Users</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-brand-purple mb-2 animate-count-up">
              1M+
            </div>
            <div className="text-brand-black/70">Products Analyzed</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-brand-purple mb-2 animate-count-up">
              95%
            </div>
            <div className="text-brand-black/70">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeatures; 