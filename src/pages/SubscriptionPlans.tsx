
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Check, Star, IndianRupee, List } from "lucide-react";

const SubscriptionPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const plans = [
    {
      name: "Free",
      description: "Basic features for casual shoppers",
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        "Basic product search",
        "Limited review summaries",
        "Price comparison across 3 platforms",
        "Mobile-friendly experience",
        "5 searches per day"
      ],
      buttonText: "Sign Up Free",
      popular: false
    },
    {
      name: "Premium",
      description: "Advanced features for smart shoppers",
      price: {
        monthly: 2999,
        yearly: 29999
      },
      features: [
        "Unlimited product searches",
        "Comprehensive review analysis",
        "Price tracking and alerts",
        "Price comparison across all platforms",
        "Advanced sentiment analysis",
        "Export data to PDF",
        "Email notifications for price drops"
      ],
      buttonText: "Get Premium",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Comprehensive insights for businesses",
      price: {
        monthly: 9999,
        yearly: 99999
      },
      features: [
        "All Premium features",
        "API access",
        "Custom reports and analytics",
        "Competitor analysis",
        "Dedicated account manager",
        "Brand sentiment monitoring",
        "Customer insights dashboard",
        "Team collaboration features"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];
  
  const faqs = [
    {
      question: "What analytics are included in Premium?",
      answer: "Premium plan includes comprehensive sentiment analysis, review trend tracking over time, feature-specific analysis (e.g., battery life, sound quality), comparative insights against similar products, and exportable reports in multiple formats."
    },
    {
      question: "How does the price tracking work?",
      answer: "Our system monitors prices across major Indian e-commerce platforms like Flipkart, Amazon.in, Myntra, and more. We'll notify you when prices drop for products you're tracking, helping you make purchases at the optimal time."
    },
    {
      question: "Are there discounts available?",
      answer: "Yes! Registered Indian startups get 20% off Premium and Enterprise plans. We also offer educational discounts for students and faculty members at Indian universities. Contact our sales team for verification."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can upgrade your plan at any time and the new features will be available immediately. If you downgrade, you'll continue to have access to your current plan until the end of the billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial of our Premium plan so you can experience the full range of features before committing to a subscription."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-16 px-6 bg-brand-yellow">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-black">
              Choose the Perfect Plan for You
            </h1>
            <p className="text-lg text-brand-black/80 max-w-2xl mx-auto mb-12">
              Get access to India's most comprehensive product review analysis platform with a plan that suits your needs
            </p>
            
            <div className="flex justify-center mb-12">
              <div className="bg-brand-white p-1 rounded-full inline-flex">
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    billingCycle === 'monthly'
                      ? 'bg-brand-black text-brand-white'
                      : 'text-brand-black hover:bg-brand-yellow/50'
                  }`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    billingCycle === 'yearly'
                      ? 'bg-brand-black text-brand-white'
                      : 'text-brand-black hover:bg-brand-yellow/50'
                  }`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Yearly (Save 20%)
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div key={index} className="flex">
                  <Card 
                    className={`flex flex-col w-full border-2 ${
                      plan.popular 
                        ? 'border-brand-yellow-dark shadow-lg transform hover:scale-105' 
                        : 'border-gray-200 hover:shadow-md'
                    } transition-all duration-300 relative`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <Badge className="bg-brand-yellow-dark text-brand-black flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-brand-black" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className={`text-center ${plan.popular ? 'pb-4' : ''}`}>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex justify-center items-baseline my-6">
                        <span className="flex items-center text-3xl md:text-4xl font-bold text-brand-black">
                          {plan.price[billingCycle] > 0 ? (
                            <>
                              <IndianRupee className="h-5 w-5 mr-1" />
                              {billingCycle === 'monthly' 
                                ? plan.price.monthly.toLocaleString('en-IN') 
                                : plan.price.yearly.toLocaleString('en-IN')}
                            </>
                          ) : "Free"}
                        </span>
                        {plan.price[billingCycle] > 0 && (
                          <span className="ml-1 text-sm text-muted-foreground">
                            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-3 text-left">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-brand-yellow-dark hover:bg-brand-yellow text-brand-black' 
                            : 'bg-brand-black hover:bg-brand-black/80'
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-6 bg-brand-white">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-center gap-2 mb-8">
              <List className="h-5 w-5 text-brand-black" />
              <h2 className="text-2xl font-bold text-center text-brand-black">
                Frequently Asked Questions
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 px-6 bg-brand-black text-brand-white text-center">
          <div className="container mx-auto max-w-3xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to make smarter purchase decisions?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of Indian shoppers who use Labelogic to find products they can trust.
            </p>
            <Button className="bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-bold py-3 px-8 rounded-full">
              Start Your Free Trial
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubscriptionPlans;
