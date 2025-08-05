
import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import styles from "./SubscriptionPlans.module.css";
import { 
  Check, 
  Star, 
  IndianRupee, 
  List, 
  HelpCircle, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Crown,
  Sparkles,
  Target,
  Award,
  Clock,
  Gift,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MessageCircle,
  Search,
  FileText,
  BarChart3,
  Smartphone,
  Brain,
  Bell,
  Download,
  Code,
  PieChart,
  Infinity,
  Info,
  UserCheck,
  Palette,
  ShieldCheck,
  CreditCard,
  X,
  CheckCircle,
  XCircle,
  Home,
  Info as InfoIcon,
  MapPin,
  FileText as FileTextIcon
} from "lucide-react";

const SubscriptionPlans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  
  // Lucide icons mapping
  const lucideIcons: { [key: string]: any } = {
    CheckCircle,
    Info,
    Users,
    Mail,
    BarChart3,
    Infinity,
    List,
    Star,
    Zap,
    Download,
    Check,
    Code,
    Link: TrendingUp,
    UserCheck,
    FileText,
    Palette
  };

  // Plan details with enhanced features
  const planDetails = {
    free: {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for casual product research",
      features: [
        { text: "5 product analyses per month", icon: "CheckCircle", included: true },
        { text: "Basic ingredient information", icon: "Info", included: true },
        { text: "Community access", icon: "Users", included: true },
        { text: "Email support", icon: "Mail", included: false },
        { text: "Advanced analytics", icon: "BarChart3", included: false }
      ],
      cta: "Get Started Free",
      ctaStyle: "secondary"
    },
    premium: {
      name: "Premium",
      price: { monthly: 199, yearly: 1899 },
      description: "Best for regular shoppers and families",
      features: [
        { text: "Unlimited product analyses", icon: "Infinity", included: true },
        { text: "Detailed ingredient breakdown", icon: "List", included: true },
        { text: "Personalized recommendations", icon: "Star", included: true },
        { text: "Priority email support", icon: "Zap", included: true },
        { text: "Advanced analytics dashboard", icon: "BarChart3", included: true },
        { text: "Price tracking alerts", icon: "TrendingUp", included: true },
        { text: "Export reports (PDF/Excel)", icon: "Download", included: true }
      ],
      cta: "Start 14-Day Free Trial",
      ctaStyle: "primary"
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      description: "For businesses and bulk users",
      features: [
        { text: "Everything in Premium", icon: "Check", included: true },
        { text: "API access", icon: "Code", included: true },
        { text: "Custom integrations", icon: "TrendingUp", included: true },
        { text: "Dedicated account manager", icon: "UserCheck", included: true },
        { text: "Custom reports & analytics", icon: "FileText", included: true },
        { text: "White-label options", icon: "Palette", included: true }
      ],
      cta: "Contact Sales Team",
      ctaStyle: "outline"
    }
  };

  // Social proof data
  const socialProof = {
    users: "50,000+",
    rating: "4.8",
    reviews: "2,500+",
    savings: "₹15,000+",
    uptime: "99.9%"
  };

  // Testimonials with enhanced data
  const testimonials = [
    {
      name: "Noman Mohammad Rafulla",
      location: "Mumbai, Maharashtra",
      quote: "Labelogic helped me make better choices for my family. The ingredient analysis is incredible!",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Noman+Mohammad+Rafulla&background=9b87f5&color=fff"
    },
    {
      name: "Dr. Rajesh Kumar",
      location: "Delhi",
      quote: "As a nutritionist, I recommend Labelogic to all my clients. Accurate and detailed information.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10B981&color=fff"
    },
    {
      name: "Anjali Patel",
      location: "Bangalore, Karnataka",
      quote: "The Premium plan saved me ₹8,000 on my smartphone purchase. Price tracking is amazing!",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Anjali+Patel&background=8B5CF6&color=fff"
    }
  ];
  
  const faqs = [
    {
      icon: <HelpCircle size={20} />,
      question: "How does the 14-day free trial work?",
      answer: "Start with full Premium access for 14 days. No credit card required upfront. Cancel anytime during the trial with no charges."
    },
    {
      icon: <CreditCard size={20} />,
      question: "Can I cancel my subscription anytime?",
      answer: "Yes! You can cancel your subscription at any time. Your access continues until the end of your billing period, and you won't be charged again."
    },
    {
      icon: <ShieldCheck size={20} />,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets popular in India."
    },
    {
      icon: <Shield size={20} />,
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-grade encryption and never share your personal data. Your search history and preferences are completely private."
    },
    {
      icon: <Award size={20} />,
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund."
    }
  ];

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    // Scroll to the plan cards
    document.getElementById('plan-cards')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateSavings = () => {
    const monthlyTotal = planDetails.premium.price.monthly * 12;
    const yearlyPrice = planDetails.premium.price.yearly;
    return Math.round(((monthlyTotal - yearlyPrice) / monthlyTotal) * 100);
  };

  // Sticky CTA effect
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Skip link for accessibility */}
        <a href="#pricing-cards" className={styles.skipLink}>
          Skip to pricing plans
        </a>

        {/* Hero Section */}
        <section className={`py-8 px-6 ${styles.heroSection}`}>
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-6 w-6 text-brand-purple" />
              <Badge variant="secondary" className="bg-brand-purple/10 text-brand-purple">
                Most Trusted Platform
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-brand-black">
              Choose Your Plan
              <span className="block text-brand-purple">Unlock Product Transparency</span>
            </h1>
            <p className="text-lg text-brand-black/80 max-w-2xl mx-auto mb-8">
              Get detailed insights on thousands of products across India. 
              Start free, upgrade when you need more.
            </p>

            {/* Social Proof */}
            <div className={`flex flex-wrap justify-center gap-8 mb-12 ${styles.socialProof}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-purple">{socialProof.users}</div>
                <div className="text-sm text-brand-black/60">Products Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-purple">{socialProof.rating}★</div>
                <div className="text-sm text-brand-black/60">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-purple">{socialProof.reviews}</div>
                <div className="text-sm text-brand-black/60">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-purple">{socialProof.uptime}</div>
                <div className="text-sm text-brand-black/60">Uptime</div>
              </div>
            </div>
            
            {/* Enhanced Billing Toggle */}
            <div className="flex justify-center mb-12">
              <div className={styles.billingToggleContainer}>
                <button
                  className={`${styles.billingOption} ${!isYearly ? styles.active : ''}`}
                  onClick={() => setIsYearly(false)}
                  aria-label="Select monthly billing"
                >
                  Monthly
                </button>
                <button
                  className={`${styles.billingOption} ${isYearly ? styles.active : ''}`}
                  onClick={() => setIsYearly(true)}
                  aria-label="Select yearly billing with 25% savings"
                >
                  Yearly
                  <span className={styles.savingsPill}>Save {calculateSavings()}%</span>
                </button>
              </div>
            </div>
            {isYearly && (
              <div className={styles.savingsHighlight}>
                <TrendingUp size={20} />
                <span>Save ₹489 annually with yearly billing!</span>
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Plan Cards */}
        <section id="plan-cards" className="py-8 px-6 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {Object.entries(planDetails).map(([planKey, plan], index) => {
                const displayPrice = typeof plan.price === 'object' 
                  ? (isYearly ? plan.price.yearly : plan.price.monthly)
                  : plan.price;
                const isPopular = planKey === 'premium';

                return (
                  <div key={planKey} className="flex">
                    <div className={`${styles.pricingCard} ${isPopular ? styles.mostPopular : ''}`}>
                      {isPopular && (
                        <div className={styles.popularRibbon}>
                          <Star size={16} />
                          <span>Most Popular</span>
                        </div>
                      )}
                      
                      <div className={styles.cardContent}>
                        <div className="text-center mb-6">
                          <div className="flex items-center justify-center mb-2">
                            {planKey === 'premium' && <Crown className="h-6 w-6 text-brand-purple mr-2" />}
                            {planKey === 'enterprise' && <Award className="h-6 w-6 text-brand-yellow-dark mr-2" />}
                            {planKey === 'free' && <Gift className="h-6 w-6 text-brand-black mr-2" />}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                          <p className="text-brand-black/70 mb-4">{plan.description}</p>
                          
                          <div className="flex justify-center items-baseline mb-4">
                            <span className="flex items-center text-3xl md:text-4xl font-bold text-brand-black">
                              {typeof displayPrice === 'number' ? (
                                <>
                                  <IndianRupee className="h-6 w-6 mr-1" />
                                  {displayPrice}
                                </>
                              ) : (
                                displayPrice
                              )}
                            </span>
                            {typeof displayPrice === 'number' && displayPrice > 0 && (
                              <span className="ml-1 text-sm text-muted-foreground">
                                /{isYearly ? 'year' : 'month'}
                              </span>
                            )}
                          </div>
                          
                          {isYearly && typeof plan.price === 'object' && plan.price.monthly > displayPrice && (
                            <div className="text-sm text-gray-500 mb-4">
                              <span className="line-through">₹{plan.price.monthly * 12}/year</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Enhanced Feature List */}
                        <div className={styles.featuresContainer}>
                          <h4 className={styles.featuresTitle}>What's included:</h4>
                          <ul className={styles.featuresList}>
                            {plan.features.map((feature, idx) => {
                              const IconComponent = lucideIcons[feature.icon];
                              return (
                                <li key={idx} className={styles.featureItem}>
                                  <div className={styles.featureIconWrapper}>
                                    {feature.included ? (
                                      <CheckCircle className={`${styles.featureIcon} ${styles.included}`} size={18} />
                                    ) : (
                                      <XCircle className={`${styles.featureIcon} ${styles.excluded}`} size={18} />
                                    )}
                                  </div>
                                  <span className={`${styles.featureText} ${feature.included ? styles.included : styles.excluded}`}>
                                    {feature.text}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        
                        {/* Enhanced CTA */}
                        <div className={styles.cardActions}>
                          <button 
                            className={`${styles.ctaBtn} ${styles[`cta${plan.ctaStyle.charAt(0).toUpperCase() + plan.ctaStyle.slice(1)}`]} ${styles.ctaLarge}`}
                            onClick={() => handlePlanSelection(planKey)}
                            aria-label={`${plan.cta} for ${plan.name} plan`}
                          >
                            {plan.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                          {planKey === 'premium' && (
                            <p className={styles.noCardRequired}>
                              <CreditCard size={16} />
                              No credit card required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Trust & Social Proof Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-brand-black mb-12">
              Trusted by Thousands
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={styles.reviewerAvatar}
                    />
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>{testimonial.name}</h4>
                      <p className={styles.reviewerLocation}>{testimonial.location}</p>
                      <div className={styles.ratingStars}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < testimonial.rating ? styles.filled : styles.empty}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className={styles.testimonialQuote}>
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className={styles.trustBadgesSection}>
              <h3 className="text-xl font-bold text-center text-brand-black mb-8">
                Trusted & Secure
              </h3>
              <div className={styles.trustBadgesGrid}>
                <div className={styles.trustBadge}>
                  <ShieldCheck size={24} />
                  <span>SSL Secured</span>
                </div>
                <div className={styles.trustBadge}>
                  <CreditCard size={24} />
                  <span>Secure Payments</span>
                </div>
                <div className={styles.trustBadge}>
                  <Award size={24} />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced FAQ Section */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-8">
              <HelpCircle className="h-6 w-6 text-brand-purple" />
              <h2 className="text-3xl font-bold text-center text-brand-black">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className={styles.faqAccordion}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <button
                    className={styles.faqToggle}
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    aria-expanded={openFAQ === index}
                  >
                    <div className={styles.faqQuestionContent}>
                      {faq.icon}
                      <span>{faq.question}</span>
                    </div>
                    <ChevronDown 
                      className={`${styles.chevron} ${openFAQ === index ? styles.rotated : ''}`}
                      size={20}
                    />
                  </button>
                  <div className={`${styles.faqAnswer} ${openFAQ === index ? styles.expanded : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className={`py-16 px-6 text-white ${styles.ctaSection}`}>
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6" />
              <h3 className="text-3xl font-bold">
                Ready to make smarter purchase decisions?
              </h3>
            </div>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of Indian shoppers who use Labelogic to find products they can trust.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className={`${styles.ctaBtn} ${styles.ctaPrimary} ${styles.ctaLarge}`}>
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className={`${styles.ctaBtn} ${styles.ctaOutline} ${styles.ctaLarge}`}>
                Contact Sales
                <MessageSquare className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className={`py-12 px-6 ${styles.supportSection}`}>
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-2xl font-bold text-brand-black mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-brand-black/70 mb-8">
              Our team is here to help you find the perfect plan for your needs
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className={`flex items-center gap-2 text-brand-black/70 ${styles.supportItem}`}>
                <Phone className="h-5 w-5 text-brand-purple" />
                <span>+91 98765 43210</span>
              </div>
              <div className={`flex items-center gap-2 text-brand-black/70 ${styles.supportItem}`}>
                <Mail className="h-5 w-5 text-brand-purple" />
                <span>sales@labelogic.com</span>
              </div>
              <div className={`flex items-center gap-2 text-brand-black/70 ${styles.supportItem}`}>
                <MessageCircle className="h-5 w-5 text-brand-purple" />
                <span>Live Chat</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Sticky CTA */}
      <div className={`${styles.stickyCtaBar} ${showSticky ? styles.visible : ''}`}>
        <div className={styles.stickyContent}>
          <span>Ready to discover product truth?</span>
          <button className={`${styles.ctaBtn} ${styles.ctaPrimary} ${styles.ctaMedium}`}>
            Start Free Trial
          </button>
        </div>
      </div>

      {/* Floating Help Button */}
      <button 
        className={styles.helpFloat}
        aria-label="Get help choosing a plan"
      >
        <MessageCircle className="h-6 w-6" />
        <span className={styles.helpTooltip}>Need help choosing?</span>
      </button>
      
      <Footer />
    </div>
  );
};

export default SubscriptionPlans;
