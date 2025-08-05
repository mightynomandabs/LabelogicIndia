
import { useState } from "react";
import { Filter, ChevronDown, ChevronUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

const FilterSection = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b pb-4">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-2 hover:bg-transparent">
          <span className="font-medium">{title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};

interface CheckboxFilterProps {
  options: { value: string; label: string }[];
  onChange: (values: string[]) => void;
  selectedValues: string[];
}

const CheckboxFilter = ({ options, onChange, selectedValues }: CheckboxFilterProps) => {
  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox 
            id={option.value} 
            checked={selectedValues.includes(option.value)} 
            onCheckedChange={() => handleToggle(option.value)}
          />
          <label 
            htmlFor={option.value} 
            className="text-sm cursor-pointer flex-1"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedSentiment, setSelectedSentiment] = useState<string[]>([]);

  const updateFilters = () => {
    onFilterChange({
      brands: selectedBrands,
      categories: selectedCategories,
      ratings: selectedRatings,
      sentiment: selectedSentiment
    });
  };

  // Example filter options
  const brands = [
    { value: "apple", label: "Apple" },
    { value: "samsung", label: "Samsung" },
    { value: "sony", label: "Sony" },
    { value: "microsoft", label: "Microsoft" },
    { value: "lg", label: "LG" }
  ];

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "home", label: "Home & Kitchen" },
    { value: "clothing", label: "Clothing" },
    { value: "beauty", label: "Beauty & Personal Care" },
    { value: "sports", label: "Sports & Outdoors" }
  ];

  const ratings = [
    { value: "4", label: "4★ & Above" },
    { value: "3", label: "3★ & Above" },
    { value: "2", label: "2★ & Above" },
    { value: "1", label: "1★ & Above" }
  ];

  const sentiment = [
    { value: "positive", label: "Highly Positive" },
    { value: "moderate", label: "Moderately Positive" },
    { value: "neutral", label: "Neutral" },
    { value: "negative", label: "Negative" }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold flex items-center">
          <Filter size={16} className="mr-2" />
          Filters
        </h2>
        <Button 
          variant="ghost" 
          className="text-sm h-8 hover:text-brand-purple hover:bg-transparent"
          onClick={() => {
            setSelectedBrands([]);
            setSelectedCategories([]);
            setSelectedRatings([]);
            setSelectedSentiment([]);
            updateFilters();
          }}
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <FilterSection title="Brands">
          <CheckboxFilter 
            options={brands} 
            selectedValues={selectedBrands} 
            onChange={(values) => {
              setSelectedBrands(values);
              updateFilters();
            }}
          />
        </FilterSection>

        <FilterSection title="Categories">
          <CheckboxFilter 
            options={categories} 
            selectedValues={selectedCategories} 
            onChange={(values) => {
              setSelectedCategories(values);
              updateFilters();
            }}
          />
        </FilterSection>

        <FilterSection title="Rating">
          <CheckboxFilter 
            options={ratings} 
            selectedValues={selectedRatings} 
            onChange={(values) => {
              setSelectedRatings(values);
              updateFilters();
            }}
          />
        </FilterSection>

        <FilterSection title="Sentiment">
          <CheckboxFilter 
            options={sentiment} 
            selectedValues={selectedSentiment} 
            onChange={(values) => {
              setSelectedSentiment(values);
              updateFilters();
            }}
          />
        </FilterSection>
      </div>
    </div>
  );
};

export default SearchFilters;
