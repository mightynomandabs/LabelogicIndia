
import React from "react";
import { Shield, Lock, CheckCircle, Users, Award, Zap } from "lucide-react";

const TrustIndicators: React.FC = () => {
  const trustItems = [
    {
      icon: Shield,
      title: "SSL Secured",
      description: "256-bit encryption protects your data"
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Your personal info stays private"
    },
    {
      icon: CheckCircle,
      title: "Verified Reviews",
      description: "All reviews are verified and authentic"
    },
    {
      icon: Users,
      title: "10,000+ Users",
      description: "Trusted by thousands of shoppers"
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Guaranteed lowest prices across India"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get results in seconds, not minutes"
    }
  ];

  return (
    <section className="py-12 bg-white border-t border-brand-black/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-brand-black mb-2">
            Why Trust Labelogic?
          </h3>
          <p className="text-brand-black/70 max-w-2xl mx-auto">
            We're committed to providing you with the most reliable and secure shopping experience
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className="text-center p-4 rounded-lg hover:bg-brand-yellow/30 transition-all duration-200 group"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-brand-purple/10 rounded-full group-hover:bg-brand-purple/20 transition-colors duration-200">
                  <item.icon className="h-6 w-6 text-brand-purple" />
                </div>
              </div>
              <h4 className="font-semibold text-brand-black text-sm mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-brand-black/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional trust badges */}
        <div className="mt-8 pt-8 border-t border-brand-black/10">
          <div className="flex flex-wrap justify-center items-center gap-6 text-brand-black/60">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-brand-purple" />
              <span className="text-sm">Google Safe Browsing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-brand-purple" />
              <span className="text-sm">McAfee Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-brand-purple" />
              <span className="text-sm">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-brand-purple" />
              <span className="text-sm">ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
