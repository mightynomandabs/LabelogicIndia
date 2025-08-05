
import { useState } from "react";
import { Filter, ChevronDown, ChevronUp, Check, Battery, Smartphone, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const FilterSection = ({ 
  title, 
  children,
  defaultOpen = true
}: { 
  title: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-gray-200 pb-4 mb-4">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-2 hover:bg-transparent text-left">
          <span className="font-medium text-brand-black">{title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">{children}</CollapsibleContent>
    </Collapsible>
  );
};

interface CheckboxFilterProps {
  options: { value: string; label: string; count?: number }[];
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
    <div className="space-y-3">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-3">
          <Checkbox 
            id={option.value} 
            checked={selectedValues.includes(option.value)} 
            onCheckedChange={() => handleToggle(option.value)}
            className="data-[state=checked]:bg-brand-purple data-[state=checked]:border-brand-purple"
          />
          <label 
            htmlFor={option.value} 
            className="text-sm cursor-pointer flex-1 flex justify-between items-center"
          >
            <span>{option.label}</span>
            {option.count && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {option.count}
              </span>
            )}
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
  const [selectedBatteryCapacity, setSelectedBatteryCapacity] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);

  const updateFilters = () => {
    onFilterChange({
      brands: selectedBrands,
      categories: selectedCategories,
      ratings: selectedRatings,
      sentiment: selectedSentiment,
      batteryCapacity: selectedBatteryCapacity,
      priceRange: priceRange
    });
  };

  // Phone-specific filter options
  const brands = [
    { value: "samsung", label: "Samsung", count: 3 },
    { value: "xiaomi", label: "Xiaomi", count: 2 },
    { value: "oneplus", label: "OnePlus", count: 1 },
    { value: "realme", label: "Realme", count: 2 },
    { value: "oppo", label: "OPPO", count: 1 }
  ];

  const categories = [
    { value: "smartphones", label: "Smartphones", count: 8 },
    { value: "tablets", label: "Tablets", count: 3 },
    { value: "accessories", label: "Accessories", count: 12 }
  ];

  const ratings = [
    { value: "4.5", label: "4.5★ & Above", count: 3 },
    { value: "4", label: "4★ & Above", count: 5 },
    { value: "3.5", label: "3.5★ & Above", count: 7 },
    { value: "3", label: "3★ & Above", count: 8 }
  ];

  const sentiment = [
    { value: "highly-positive", label: "Highly Positive (80%+)", count: 2 },
    { value: "positive", label: "Positive (60-80%)", count: 4 },
    { value: "moderate", label: "Moderate (40-60%)", count: 2 },
    { value: "negative", label: "Negative (<40%)", count: 0 }
  ];

  const batteryCapacity = [
    { value: "6000mah", label: "6000mAh & Above", count: 2 },
    { value: "5000mah", label: "5000mAh & Above", count: 5 },
    { value: "4500mah", label: "4500mAh & Above", count: 7 },
    { value: "4000mah", label: "4000mAh & Above", count: 8 }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg text-brand-black flex items-center">
          <Filter size={18} className="mr-2 text-brand-purple" />
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
            setSelectedBatteryCapacity([]);
            setPriceRange([0, 30000]);
            updateFilters();
          }}
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-2">
        {/* Price Range Filter */}
        <FilterSection title="Price Range" defaultOpen={true}>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-brand-black/70">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value as [number, number]);
                updateFilters();
              }}
              max={30000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setPriceRange([0, 15000]);
                  updateFilters();
                }}
                className="text-xs"
              >
                Under ₹15K
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setPriceRange([15000, 30000]);
                  updateFilters();
                }}
                className="text-xs"
              >
                ₹15K-30K
              </Button>
            </div>
          </div>
        </FilterSection>

        {/* Battery Capacity Filter */}
        <FilterSection title="Battery Capacity" defaultOpen={true}>
          <CheckboxFilter 
            options={batteryCapacity} 
            selectedValues={selectedBatteryCapacity} 
            onChange={(values) => {
              setSelectedBatteryCapacity(values);
              updateFilters();
            }}
          />
        </FilterSection>

        {/* Brands Filter */}
        <FilterSection title="Brands" defaultOpen={false}>
          <CheckboxFilter 
            options={brands} 
            selectedValues={selectedBrands} 
            onChange={(values) => {
              setSelectedBrands(values);
              updateFilters();
            }}
          />
        </FilterSection>

        {/* Categories Filter */}
        <FilterSection title="Categories" defaultOpen={false}>
          <CheckboxFilter 
            options={categories} 
            selectedValues={selectedCategories} 
            onChange={(values) => {
              setSelectedCategories(values);
              updateFilters();
            }}
          />
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Rating" defaultOpen={false}>
          <CheckboxFilter 
            options={ratings} 
            selectedValues={selectedRatings} 
            onChange={(values) => {
              setSelectedRatings(values);
              updateFilters();
            }}
          />
        </FilterSection>

        {/* Sentiment Filter */}
        <FilterSection title="Sentiment" defaultOpen={false}>
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

      {/* Active Filters Summary */}
      {(selectedBrands.length > 0 || selectedCategories.length > 0 || 
        selectedRatings.length > 0 || selectedSentiment.length > 0 || 
        selectedBatteryCapacity.length > 0 || 
        (priceRange[0] > 0 || priceRange[1] < 30000)) && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-brand-black mb-3">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedBrands.map(brand => (
              <Badge key={brand} variant="secondary" className="text-xs">
                {brands.find(b => b.value === brand)?.label}
              </Badge>
            ))}
            {selectedBatteryCapacity.map(battery => (
              <Badge key={battery} variant="secondary" className="text-xs">
                {batteryCapacity.find(b => b.value === battery)?.label}
              </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 30000) && (
              <Badge variant="secondary" className="text-xs">
                ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
