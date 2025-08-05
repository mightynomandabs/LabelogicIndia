
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-white py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-brand-black mb-8 text-center">About Labelogic</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Our Mission</h2>
            <p className="text-lg text-brand-black/80">
              At Labelogic, we're on a mission to empower Indian consumers with honest, reliable product insights. 
              We aggregate reviews from trusted platforms like Flipkart and Amazon.in, analyze sentiments, 
              and help you make informed buying decisions—whether it's a smartphone, saree, or earbuds.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Our Vision</h2>
            <p className="text-lg text-brand-black/80">
              We envision a future where every Indian shopper can access transparent product information 
              in their preferred language, tailored to their needs. With 797 million Indian internet users, 
              we aim to be the go-to platform for smart shopping decisions by 2025.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Our Team</h2>
            <p className="text-lg text-brand-black/80">
              We're a small but passionate team based in Bangalore, India. Our founders, Priya and Arjun, 
              started Labelogic to solve their own shopping dilemmas—now we're here to help millions of 
              Indians shop smarter.
            </p>
          </section>
          
          <section className="text-center">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Join Us</h2>
            <p className="text-lg text-brand-black/80 mb-6">
              Want to be part of our mission? We're always looking for talented individuals to join our team!
            </p>
            <a 
              href="/careers" 
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Join Us
            </a>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
