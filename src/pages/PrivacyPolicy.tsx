
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className={`flex-1 py-16 px-6 ${styles.heroSection}`}>
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-brand-black mb-8 text-center">Privacy Policy</h1>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Introduction</h2>
            <p className="text-lg text-brand-black/80">
              At Labelogic, we value your privacy. This Privacy Policy explains how we collect, use, 
              and protect your data when you use our platform.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Data We Collect</h2>
            <p className="text-lg text-brand-black/80">
              We collect the following information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-lg text-brand-black/80">
              <li>Your email address and password during sign-up</li>
              <li>Search history to improve suggestions and personalize your experience</li>
              <li>Contact form submissions to respond to your inquiries</li>
              <li>Usage data to understand how you interact with our platform</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black mb-4">How We Use Your Data</h2>
            <p className="text-lg text-brand-black/80">
              Your data is used to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-lg text-brand-black/80">
              <li>Personalize your experience with tailored product recommendations</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our services and develop new features</li>
              <li>Send relevant promotional materials if you've opted in</li>
            </ul>
            <p className="text-lg text-brand-black/80 mt-4">
              We do not sell your personal data to third parties.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Data Security</h2>
            <p className="text-lg text-brand-black/80">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. We use industry-standard encryption technologies and regularly 
              update our security practices.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-brand-black mb-4">Contact Us</h2>
            <p className="text-lg text-brand-black/80">
              For any privacy concerns or to exercise your data rights, please reach out to us at support@labelogic.in.
            </p>
            <div className="mt-6 text-center">
              <a 
                href="/contact-us" 
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-medium py-2 px-6 rounded-lg transition-colors inline-block"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
