
import React, { useState } from "react";
import { 
  Users, 
  Target, 
  Eye, 
  TrendingUp, 
  Shield, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Globe,
  Zap,
  Send
} from "lucide-react";
import styles from "./AboutUs.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Noman Mohammad Rafulla",
    role: "CEO",
    bio: "Former product manager at Flipkart with 8+ years in e-commerce. Passionate about consumer empowerment and transparent shopping experiences.",
    photo: "/team/noman-rafulla.jpg",
    linkedin: "https://linkedin.com/in/noman-rafulla",
    twitter: "https://twitter.com/nomanrafulla"
  },
  {
    id: 2,
    name: "Arjun Patel",
    role: "CTO",
    bio: "Ex-Google engineer with expertise in AI and data analytics. Led multiple consumer-facing products serving millions of users.",
    photo: "/team/arjun-patel.jpg",
    linkedin: "https://linkedin.com/in/arjun-patel",
    twitter: "https://twitter.com/arjunpatel"
  },
  {
    id: 3,
    name: "Meera Reddy",
    role: "Head of Product",
    bio: "Product strategist with deep understanding of Indian consumer behavior. Previously led growth at Myntra and Amazon.",
    photo: "/team/meera-reddy.jpg",
    linkedin: "https://linkedin.com/in/meera-reddy",
    twitter: "https://twitter.com/meerareddy"
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "Lead Data Scientist",
    bio: "PhD in Machine Learning from IIT Delhi. Specializes in sentiment analysis and recommendation systems.",
    photo: "/team/rahul-verma.jpg",
    linkedin: "https://linkedin.com/in/rahul-verma",
    twitter: "https://twitter.com/rahulverma"
  },
  {
    id: 5,
    name: "Anjali Desai",
    role: "UX/UI Designer",
    bio: "Award-winning designer focused on creating intuitive, accessible experiences for diverse Indian users.",
    photo: "/team/anjali-desai.jpg",
    linkedin: "https://linkedin.com/in/anjali-desai",
    twitter: "https://twitter.com/anjalidesai"
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Head of Operations",
    bio: "Operations expert with 10+ years scaling consumer businesses. Previously at Swiggy and Zomato.",
    photo: "/team/vikram-singh.jpg",
    linkedin: "https://linkedin.com/in/vikram-singh",
    twitter: "https://twitter.com/vikramsingh"
  }
];

// Trust statistics
const trustStats = [
  { number: "10,000+", label: "Products Analyzed", icon: Target },
  { number: "50,000+", label: "Happy Users", icon: Heart },
  { number: "95%", label: "Accuracy Rate", icon: Shield },
  { number: "15+", label: "Languages Supported", icon: Globe }
];

// Journey milestones
const milestones = [
  {
    year: "2023",
    title: "Founded",
    description: "Started with a vision to democratize product transparency in India"
  },
  {
    year: "2024",
    title: "Beta Launch",
    description: "Launched beta version with 1,000+ products and 5,000+ users"
  },
  {
    year: "2024",
    title: "Series A",
    description: "Raised $2M to scale operations and expand product catalog"
  },
  {
    year: "2025",
    title: "Vision 2025",
    description: "Targeting 1M+ users and 100K+ products by end of 2025"
  }
];

// Testimonials
const testimonials = [
  {
    quote: "Labelogic helped me find the perfect smartphone by showing real user experiences. No more guesswork!",
    author: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    rating: 5
  },
  {
    quote: "Finally, a platform that tells the truth about products. The sentiment analysis is spot-on!",
    author: "Neha Gupta",
    location: "Delhi, NCR",
    rating: 5
  },
  {
    quote: "As a tech enthusiast, I love how Labelogic aggregates reviews from multiple sources. Very reliable!",
    author: "Amit Patel",
    location: "Bangalore, Karnataka",
    rating: 5
  }
];

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className={`relative py-8 lg:py-12 overflow-hidden ${styles.heroSection}`}>
        <div className={`absolute inset-0 ${styles.gridPattern}`}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-black mb-6 leading-tight">
              About <span className="text-brand-purple">Labelogic</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-black/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Empowering Indian consumers with product transparency and honest insights. 
              We're on a mission to make every shopping decision informed and confident.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-4 text-lg">
                Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-8 py-4 text-lg">
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
                  Welcome to Labelogic
                </h2>
                <p className="text-lg text-brand-black/80 mb-6 leading-relaxed">
                  We started Labelogic because we were tired of making blind purchasing decisions. 
                  Every product review seemed biased, every recommendation felt sponsored. 
                  That's when we realized - Indian consumers deserve better.
                </p>
                <p className="text-lg text-brand-black/80 mb-8 leading-relaxed">
                  Today, we aggregate reviews from trusted platforms like Flipkart and Amazon.in, 
                  analyze sentiments using advanced AI, and present you with honest, 
                  data-driven insights to make informed buying decisions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="bg-brand-purple/10 text-brand-purple px-4 py-2">
                    <Shield className="h-4 w-4 mr-2" />
                    Trusted Platform
                  </Badge>
                  <Badge variant="secondary" className="bg-brand-purple/10 text-brand-purple px-4 py-2">
                    <Zap className="h-4 w-4 mr-2" />
                    AI-Powered
                  </Badge>
                  <Badge variant="secondary" className="bg-brand-purple/10 text-brand-purple px-4 py-2">
                    <Globe className="h-4 w-4 mr-2" />
                    Made in India
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-purple/20 to-brand-yellow/20 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <Target className="h-8 w-8 text-brand-purple mx-auto mb-2" />
                      <p className="text-sm font-medium text-brand-black">Product Analysis</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <Eye className="h-8 w-8 text-brand-purple mx-auto mb-2" />
                      <p className="text-sm font-medium text-brand-black">Transparency</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-brand-purple mx-auto mb-2" />
                      <p className="text-sm font-medium text-brand-black">Growth</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <Heart className="h-8 w-8 text-brand-purple mx-auto mb-2" />
                      <p className="text-sm font-medium text-brand-black">User-First</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-8 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Mission */}
              <Card className={`border-0 shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${styles.missionCard}`}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-brand-purple/10 rounded-full p-3 mr-4">
                      <Target className="h-8 w-8 text-brand-purple" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-black">Our Mission</h3>
                  </div>
                  <p className="text-lg text-brand-black/80 leading-relaxed mb-6">
                    To democratize product transparency in India by providing honest, 
                    reliable insights that help every consumer make informed buying decisions.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-brand-black/70">
                      <CheckCircle className="h-5 w-5 text-brand-purple mr-3" />
                      Aggregate reviews from trusted platforms
                    </li>
                    <li className="flex items-center text-brand-black/70">
                      <CheckCircle className="h-5 w-5 text-brand-purple mr-3" />
                      Analyze sentiments using advanced AI
                    </li>
                    <li className="flex items-center text-brand-black/70">
                      <CheckCircle className="h-5 w-5 text-brand-purple mr-3" />
                      Present data-driven insights
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className={`border-0 shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${styles.missionCard}`}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-brand-purple/10 rounded-full p-3 mr-4">
                      <Eye className="h-8 w-8 text-brand-purple" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-black">Our Vision</h3>
                  </div>
                  <p className="text-lg text-brand-black/80 leading-relaxed mb-6">
                    To become India's most trusted product discovery platform, 
                    serving 1 million+ users by 2025 with transparent, 
                    localized product insights in multiple languages.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-brand-black/70">
                      <CheckCircle className="h-5 w-5 text-brand-purple mr-3" />
                      Multi-language support for all Indians
                    </li>
                    <li className="flex items-center text-brand-black/70">
                      <CheckCircle className="h-5 w-5 text-brand-purple mr-3" />
                      AI-powered personalization
                    </li>
                    <li className="flex items-center text-brand-black/70">
                      <CheckCircle className="h-5 w-5 text-brand-purple mr-3" />
                      Real-time product analysis
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Statistics Section */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-brand-black/60 mb-12 max-w-3xl mx-auto">
              Our platform has helped countless Indian consumers make informed decisions
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {trustStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-brand-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-brand-purple" />
                    </div>
                    <div className={`text-3xl md:text-4xl font-bold text-brand-black mb-2 ${styles.statNumber}`}>
                      {stat.number}
                    </div>
                    <div className="text-brand-black/60 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className={`border-0 shadow-lg transition-all duration-300 ${styles.testimonialCard}`}>
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-brand-black/80 mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <cite className="text-brand-black font-medium">
                      - {testimonial.author}, {testimonial.location}
                    </cite>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-8 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black text-center mb-12">
              Our Journey
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute top-0 bottom-0 ${styles.timelineLine}`}></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:px-8">
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="bg-brand-purple text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                              {milestone.year}
                            </div>
                            <h3 className="text-xl font-bold text-brand-black">{milestone.title}</h3>
                          </div>
                          <p className="text-brand-black/70">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className={`absolute ${styles.timelineDot}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-brand-black/60 max-w-3xl mx-auto">
                We're a passionate team of product experts, engineers, and designers 
                committed to making product discovery transparent and accessible for every Indian.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className={`border-0 shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${styles.teamCard}`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-purple/20 to-brand-yellow/20 flex items-center justify-center">
                      <Users className="h-16 w-16 text-brand-purple" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-black mb-2">{member.name}</h3>
                    <p className="text-brand-purple font-medium mb-4">{member.role}</p>
                    <p className="text-brand-black/70 mb-6 leading-relaxed">{member.bio}</p>
                    <div className="flex justify-center space-x-4">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`text-brand-black/60 transition-colors ${styles.socialLink}`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a 
                          href={member.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`text-brand-black/60 transition-colors ${styles.socialLink}`}
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-brand-black/60 max-w-3xl mx-auto">
                Have questions, suggestions, or want to join our mission? 
                We'd love to hear from you!
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold text-brand-black mb-8">Contact Information</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center">
                    <div className="bg-brand-purple/10 rounded-full p-3 mr-4">
                      <Phone className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-black">Phone</p>
                      <a href="tel:+919876543210" className="text-brand-black/70 hover:text-brand-purple transition-colors">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-brand-purple/10 rounded-full p-3 mr-4">
                      <Mail className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-black">Email</p>
                      <a href="mailto:hello@labelogic.com" className="text-brand-black/70 hover:text-brand-purple transition-colors">
                        hello@labelogic.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-brand-purple/10 rounded-full p-3 mr-4">
                      <MapPin className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-black">Office</p>
                      <p className="text-brand-black/70">
                        Mumbai, Maharashtra<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-brand-purple/10 rounded-full p-3 mr-4">
                      <MessageSquare className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-black">WhatsApp</p>
                      <a href="https://wa.me/919876543210" className="text-brand-black/70 hover:text-brand-purple transition-colors">
                        Chat with us
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-bold text-brand-black mb-4">Business Hours</h4>
                  <div className="space-y-2 text-sm text-brand-black/70">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <Card className={`border-0 shadow-lg ${styles.contactForm}`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-brand-black mb-6">Send us a Message</h3>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-brand-black mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full min-h-[120px]"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-16 bg-brand-purple text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for talented individuals who share our passion for 
              transparency and consumer empowerment. Come help us build the future of 
              product discovery in India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-brand-purple hover:bg-gray-100 px-8 py-4 text-lg">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-purple px-8 py-4 text-lg">
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
