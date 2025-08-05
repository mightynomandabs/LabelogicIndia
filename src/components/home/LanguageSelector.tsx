
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
];

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // Here you would normally implement language change logic
    console.log(`Language changed to: ${value}`);
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="flex items-center">
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[140px] h-10 border-2 border-brand-black rounded-full bg-brand-white shadow-md hover:shadow-lg transition-all duration-200" aria-label="Select language">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className="text-lg" aria-hidden="true">{selectedLang?.flag}</span>
              <span className="font-medium text-brand-black">{selectedLang?.code.toUpperCase()}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="border-2 border-brand-black rounded-lg shadow-lg">
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
