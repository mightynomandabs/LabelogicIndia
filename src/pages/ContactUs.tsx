
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  User, 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  XCircle,
  ExternalLink
} from "lucide-react";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  // Auto-focus first field on page load
  useEffect(() => {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    if (nameInput) {
      nameInput.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus('idle');

    try {
      // This is a mock implementation since we don't have direct Supabase access
      // Replace this with actual Supabase call when database is set up
      console.log('Submitting contact form:', { name, email, message });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      setSubmitStatus('success');
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
        duration: 5000
      });
      
      // Clear form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className={`flex-1 py-8 px-6 ${styles.heroSection}`}>
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-brand-black/80 max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you! 
              Our team typically responds within 24 hours.
            </p>
          </div>
          
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Form Card */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-brand-black flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-brand-purple" />
                  Contact Form
                </CardTitle>
                <p className="text-brand-black/70">
                  Fill out the form below and we'll get back to you soon.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-semibold text-brand-black"
                      aria-describedby="name-description"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-black/40" />
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 rounded-lg transition-all duration-200"
                        aria-describedby="name-description"
                        aria-required="true"
                      />
                    </div>
                    <div id="name-description" className="sr-only">
                      Enter your full name
                    </div>
                  </div>
                  
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-semibold text-brand-black"
                      aria-describedby="email-description"
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-black/40" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 rounded-lg transition-all duration-200"
                        aria-describedby="email-description"
                        aria-required="true"
                      />
                    </div>
                    <div id="email-description" className="sr-only">
                      Enter your email address
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-semibold text-brand-black"
                      aria-describedby="message-description"
                    >
                      Your Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-brand-black/40" />
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 rounded-lg min-h-[120px] resize-none transition-all duration-200"
                        aria-describedby="message-description"
                        aria-required="true"
                      />
                    </div>
                    <div id="message-description" className="sr-only">
                      Enter your message or question
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                    aria-describedby="submit-status"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                  {/* Status Message */}
                  <div id="submit-status" className="mt-4">
                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Message sent successfully!</span>
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <XCircle className="h-5 w-5" />
                        <span className="font-medium">Failed to send message. Please try again.</span>
                      </div>
                    )}
                  </div>
                </form>
                
                {/* Response Time Notice */}
                <div className="mt-6 p-4 bg-brand-yellow/30 rounded-lg border border-brand-yellow/50">
                  <div className="flex items-center gap-2 text-brand-black/80">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">We typically reply within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Details & Map */}
            <div className="space-y-6">
              
              {/* Contact Details Card */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-brand-black flex items-center gap-2">
                    <Phone className="h-6 w-6 text-brand-purple" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-brand-purple" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-brand-black/60">Email</p>
                      <a 
                        href="mailto:support@labelogic.in" 
                        className="text-lg font-semibold text-brand-purple hover:text-brand-purple-dark transition-colors duration-200 flex items-center gap-1"
                        aria-label="Send email to support@labelogic.in"
                      >
                        support@labelogic.in
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-brand-purple" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-brand-black/60">Phone</p>
                      <a 
                        href="tel:+919876543210" 
                        className="text-lg font-semibold text-brand-purple hover:text-brand-purple-dark transition-colors duration-200 flex items-center gap-1"
                        aria-label="Call +91 98765 43210"
                      >
                        +91 98765 43210
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Business Hours */}
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-brand-purple" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-brand-black/60">Business Hours</p>
                      <p className="text-lg font-semibold text-brand-black">
                        Mon - Fri: 9:00 AM - 6:00 PM IST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Office Address Card */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-brand-black flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-brand-purple" />
                    Find Us
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Address */}
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center mt-1">
                        <MapPin className="h-5 w-5 text-brand-purple" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-brand-black/60 mb-1">Office Address</p>
                        <address className="text-lg font-semibold text-brand-black not-italic leading-relaxed">
                          Labelogic Technology Solutions<br />
                          #42, 100 Feet Road<br />
                          Indiranagar, Bangalore<br />
                          Karnataka, India 560038
                        </address>
                      </div>
                    </div>
                    
                    {/* Map Embed */}
                    <div className="mt-6">
                      <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1234567890123!2d77.6408!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzgnMjYuOSJF!5e0!3m2!1sen!2sin!4v1234567890123"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Labelogic Office Location"
                          aria-label="Interactive map showing Labelogic office location in Indiranagar, Bangalore"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Social Links Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-brand-black mb-6">
              Connect With Us
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-50 border-2 border-brand-purple text-brand-purple hover:text-brand-purple-dark transition-all duration-200"
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                aria-label="Contact us on WhatsApp"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-50 border-2 border-brand-purple text-brand-purple hover:text-brand-purple-dark transition-all duration-200"
                onClick={() => window.open('mailto:support@labelogic.in', '_blank')}
                aria-label="Send us an email"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
