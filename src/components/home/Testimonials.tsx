
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Noman Mohammad Rafulla",
      role: "College Student",
      rating: 5,
      text: "Labelogic helped me find the perfect laptop for my studies. The price comparison saved me ₹8,000!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Tech Enthusiast",
      rating: 5,
      text: "The expert reviews are spot-on. I bought a smartphone based on their recommendation and couldn't be happier.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 3,
      name: "Anjali Patel",
      role: "Working Professional",
      rating: 4,
      text: "Saves me so much time! Instead of checking multiple sites, I get all the information in one place.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 4,
      name: "Amit Singh",
      role: "Small Business Owner",
      rating: 5,
      text: "The price tracking feature is amazing. I got notified when my desired laptop went on sale.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? "fill-brand-purple text-brand-purple" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-brand-yellow/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-brand-black/70 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Labelogic for their shopping decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="border-2 border-brand-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-purple/20"
                  />
                  <div className="ml-3">
                    <h4 className="font-semibold text-brand-black">{testimonial.name}</h4>
                    <p className="text-sm text-brand-black/60">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-brand-black/70">({testimonial.rating}/5)</span>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-1 h-6 w-6 text-brand-purple/30" />
                  <p className="text-brand-black/80 leading-relaxed pl-4">
                    "{testimonial.text}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-brand-black/60">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
              <span className="text-sm font-medium">10,000+ Happy Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
              <span className="text-sm font-medium">4.8/5 Average Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
              <span className="text-sm font-medium">₹50L+ Saved by Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
