
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Search, Smartphone, Laptop, Headphones, Watch, Mouse, Camera, BookOpen, Utensils, Shirt, Home, Car, Gamepad2, Heart, Zap, Shield, Star, TrendingUp, Users, Globe, Target } from "lucide-react";
import Layout from "@/components/layout/Layout";
import LanguageSelector from "@/components/home/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./SearchExamples.module.css";

interface SearchExample {
  category: string;
  prompt: string;
  description?: string;
}

const SearchExamples = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const searchExamples: SearchExample[] = [
    {
      category: t("electronics"),
      prompt: t("phone_battery_example"),
      description: t("phone_battery_desc")
    },
    {
      category: t("kitchen"),
      prompt: t("mixer_grinder_example"),
      description: t("mixer_grinder_desc")
    },
    {
      category: t("clothing"),
      prompt: t("womens_kurtas_example"),
      description: t("womens_kurtas_desc")
    },
    {
      category: t("home_appliances"),
      prompt: t("inverter_ac_example"),
      description: t("inverter_ac_desc")
    },
    {
      category: t("audio"),
      prompt: t("noise_cancelling_example"),
      description: t("noise_cancelling_desc")
    },
    {
      category: t("health"),
      prompt: t("bp_monitor_example"),
      description: t("bp_monitor_desc")
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: t("copied"),
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-purple focus:text-white focus:outline-none focus:rounded-md"
      >
        Skip to Content
      </a>

      <main className={`py-8 ${styles.heroSection}`} id="main-content">
        <div className="container mx-auto px-4">
                  <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black">{t("search_examples_title")}</h1>
          <LanguageSelector />
        </div>

        <p className="text-lg mb-8 text-brand-black/80 max-w-3xl">
          {t("search_examples_subtitle")}
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
                    className="flex-1 border-2 border-brand-black/20 text-brand-black hover:bg-brand-yellow-dark/50 hover:border-brand-purple hover:text-brand-black"
                    onClick={() => handleCopy(example.prompt, index)}
                    aria-label={`Copy prompt: ${example.prompt}`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="mr-1 h-4 w-4" /> {t("copied")}
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-4 w-4" /> {t("copy")}
                      </>
                    )}
                  </Button>
                  <Button
                    className="flex-1 bg-brand-purple hover:bg-brand-purple-dark text-white"
                    onClick={() => handleSearch(example.prompt)}
                  >
                    {t("search")}
                  </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-black">{t("keyboard_navigation")}</h2>
            <div className="bg-brand-yellow/30 p-6 rounded-lg">
              <ul className="space-y-2 text-brand-black">
                <li><strong>Tab:</strong> {t("tab_navigate")}</li>
                <li><strong>Enter/Space:</strong> {t("enter_activate")}</li>
                <li><strong>Shift+Tab:</strong> {t("shift_tab_backward")}</li>
                <li><strong>Esc:</strong> {t("esc_close")}</li>
                <li><strong>Alt+Home:</strong> {t("alt_home")}</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default SearchExamples;
