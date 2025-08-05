
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/home/LanguageSelector";

interface SearchExample {
  category: string;
  prompt: string;
  description?: string;
}

const searchExamples: SearchExample[] = [
  {
    category: "Electronics",
    prompt: "Phone with best battery under ₹25K",
    description: "Find smartphones with excellent battery life in the budget range"
  },
  {
    category: "Kitchen",
    prompt: "Mixer grinder below ₹3K with best reviews",
    description: "Discover top-rated affordable mixer grinders"
  },
  {
    category: "Clothing",
    prompt: "Women's kurtas under ₹800 on sale",
    description: "Browse discounted women's ethnic wear options"
  },
  {
    category: "Home Appliances",
    prompt: "Best inverter AC under ₹35K",
    description: "Energy-efficient air conditioners at competitive prices"
  },
  {
    category: "Audio",
    prompt: "Noise cancelling earbuds below ₹5K",
    description: "Affordable earbuds with active noise cancellation"
  },
  {
    category: "Health",
    prompt: "Blood pressure monitor with good accuracy",
    description: "Reliable health monitoring devices with precise readings"
  }
];

const SearchExamples = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste this in the search bar",
    });
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleSearch = (prompt: string) => {
    navigate(`/search?q=${encodeURIComponent(prompt)}`);
  };

  return (
    <Layout>
      {/* Skip to content link - visible only for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-black focus:text-brand-white focus:outline-none focus:rounded-md"
      >
        Skip to Content
      </a>

      <main className="container mx-auto py-8 px-4" id="main-content">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black">Not Sure What to Search? Try These Examples!</h1>
          <LanguageSelector />
        </div>

        <p className="text-lg mb-8 text-brand-black/80 max-w-3xl">
          Finding the perfect product can be challenging. Here are some example search phrases to help you get started with specific queries across different categories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchExamples.map((example, index) => (
            <Card key={index} className="border-2 hover:border-brand-purple hover:shadow-md transition-all">
              <CardHeader className="bg-brand-yellow/50 border-b">
                <CardTitle className="text-xl font-bold text-brand-black">{example.category}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <p className="text-lg font-medium text-brand-black">{example.prompt}</p>
                  {example.description && (
                    <p className="text-sm text-brand-black/70 mt-1">{example.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white"
                    onClick={() => handleCopy(example.prompt, index)}
                    aria-label={`Copy prompt: ${example.prompt}`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="mr-1 h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-4 w-4" /> Copy
                      </>
                    )}
                  </Button>
                  <Button
                    className="flex-1 bg-brand-purple hover:bg-brand-purple-dark text-white"
                    onClick={() => handleSearch(example.prompt)}
                  >
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-brand-black">Keyboard Navigation Guide</h2>
          <div className="bg-brand-yellow/30 p-6 rounded-lg">
            <ul className="space-y-2 text-brand-black">
              <li><strong>Tab:</strong> Navigate between interactive elements</li>
              <li><strong>Enter/Space:</strong> Activate buttons or links</li>
              <li><strong>Shift+Tab:</strong> Navigate backward</li>
              <li><strong>Esc:</strong> Close dialogs or dropdowns</li>
              <li><strong>Alt+Home:</strong> Return to homepage</li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default SearchExamples;
