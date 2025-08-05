
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This is a mock implementation since we don't have direct Supabase access
      // Replace this with actual Supabase call when database is set up
      console.log('Submitting contact form:', { name, email, message });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
        duration: 5000
      });
      
      // Clear form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again.",
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
      
      <main className="flex-1 bg-white py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-brand-black mb-4 text-center">Contact Us</h1>
          <p className="text-lg text-center mb-8 text-brand-black/80">
            Have a question or feedback? We'd love to hear from you!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-1">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-1">
                Your Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-1">
                Your Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                required
                className="w-full min-h-[150px]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold text-brand-black mb-2">Contact Details</h3>
              <p className="text-brand-black/80">Email: support@labelogic.in</p>
              <p className="text-brand-black/80">Phone: +91 98765 43210</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-brand-black mb-2">Office Address</h3>
              <p className="text-brand-black/80">
                Labelogic Technology Solutions<br />
                #42, 100 Feet Road<br />
                Indiranagar, Bangalore<br />
                Karnataka, India 560038
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
