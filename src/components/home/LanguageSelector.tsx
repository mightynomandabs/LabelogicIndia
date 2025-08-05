
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
];

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const selectedLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="flex items-center">
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger 
          className="w-[140px] h-10 border-2 border-brand-black rounded-full bg-brand-white shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-brand-purple/20" 
          aria-label="Select language"
        >
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className="text-lg" aria-hidden="true">{selectedLang?.flag}</span>
              <span className="font-medium text-brand-black">{selectedLang?.code.toUpperCase()}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="border-2 border-brand-black rounded-lg shadow-lg bg-white">
          {languages.map((language) => (
            <SelectItem 
              key={language.code} 
              value={language.code}
              className="flex items-center space-x-3 py-3 cursor-pointer hover:bg-brand-yellow transition-colors duration-200"
            >
              <span className="text-lg" aria-hidden="true">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-brand-black">{language.name}</span>
                {language.code !== "en" && (
                  <span className="text-sm text-brand-black/70">{language.nativeName}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
