
import { useState } from "react";
import { Filter, ChevronDown, ChevronUp, Check, Battery, Smartphone, DollarSign, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

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
        <Button variant="ghost" className="flex w-full justify-between p-2 hover:bg-transparent text-left touch-manipulation min-h-[44px]">
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
        <div key={option.value} className="flex items-center space-x-3 min-h-[44px] touch-manipulation">
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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  // Update filters whenever any filter changes
  React.useEffect(() => {
    updateFilters();
  }, [selectedBrands, selectedCategories, selectedRatings, selectedSentiment, selectedBatteryCapacity, priceRange]);

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSelectedSentiment([]);
    setSelectedBatteryCapacity([]);
    setPriceRange([0, 30000]);
  };

  const getActiveFilterCount = () => {
    return selectedBrands.length + selectedCategories.length + selectedRatings.length + 
           selectedSentiment.length + selectedBatteryCapacity.length + 
           (priceRange[0] > 0 || priceRange[1] < 30000 ? 1 : 0);
  };

  const activeFilterCount = getActiveFilterCount();

  // Desktop/Tablet Filters
  const DesktopFilters = () => (
    <div className="w-64 bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-black">Filters</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-brand-purple hover:text-brand-purple-dark"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Price Range" defaultOpen={true}>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={30000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-20 px-2 py-1 text-sm border rounded"
              placeholder="Min"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 30000])}
              className="w-20 px-2 py-1 text-sm border rounded"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" defaultOpen={true}>
        <CheckboxFilter
          options={[
            { value: "samsung", label: "Samsung", count: 45 },
            { value: "apple", label: "Apple", count: 32 },
            { value: "xiaomi", label: "Xiaomi", count: 28 },
            { value: "oneplus", label: "OnePlus", count: 15 },
            { value: "realme", label: "Realme", count: 22 }
          ]}
          selectedValues={selectedBrands}
          onChange={setSelectedBrands}
        />
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Categories" defaultOpen={true}>
        <CheckboxFilter
          options={[
            { value: "smartphones", label: "Smartphones", count: 156 },
            { value: "laptops", label: "Laptops", count: 89 },
            { value: "headphones", label: "Headphones", count: 67 },
            { value: "smartwatches", label: "Smartwatches", count: 34 }
          ]}
          selectedValues={selectedCategories}
          onChange={setSelectedCategories}
        />
      </FilterSection>

      {/* Ratings */}
      <FilterSection title="Rating" defaultOpen={false}>
        <CheckboxFilter
          options={[
            { value: "4.5+", label: "4.5+ Stars", count: 89 },
            { value: "4.0+", label: "4.0+ Stars", count: 156 },
            { value: "3.5+", label: "3.5+ Stars", count: 234 }
          ]}
          selectedValues={selectedRatings}
          onChange={setSelectedRatings}
        />
      </FilterSection>

      {/* Sentiment */}
      <FilterSection title="Sentiment" defaultOpen={false}>
        <CheckboxFilter
          options={[
            { value: "positive", label: "Positive Reviews", count: 123 },
            { value: "neutral", label: "Neutral Reviews", count: 67 },
            { value: "negative", label: "Negative Reviews", count: 12 }
          ]}
          selectedValues={selectedSentiment}
          onChange={setSelectedSentiment}
        />
      </FilterSection>

      {/* Battery Capacity */}
      <FilterSection title="Battery Capacity" defaultOpen={false}>
        <CheckboxFilter
          options={[
            { value: "5000mah+", label: "5000mAh+", count: 45 },
            { value: "4000mah+", label: "4000mAh+", count: 78 },
            { value: "3000mah+", label: "3000mAh+", count: 123 }
          ]}
          selectedValues={selectedBatteryCapacity}
          onChange={setSelectedBatteryCapacity}
        />
      </FilterSection>
    </div>
  );

  // Mobile Filters
  const MobileFilters = () => (
    <>
      {/* Mobile Filter Button */}
      <Button
        variant="outline"
        onClick={() => setIsMobileFilterOpen(true)}
        className="md:hidden flex items-center space-x-2 w-full justify-center py-3"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      {/* Mobile Filter Sheet */}
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle className="flex items-center justify-between">
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs text-brand-purple hover:text-brand-purple-dark"
                >
                  Clear All
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="py-4 space-y-6">
            {/* Price Range */}
            <FilterSection title="Price Range" defaultOpen={true}>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={30000}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-20 px-2 py-1 text-sm border rounded"
                    placeholder="Min"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 30000])}
                    className="w-20 px-2 py-1 text-sm border rounded"
                    placeholder="Max"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Brands */}
            <FilterSection title="Brands" defaultOpen={true}>
              <CheckboxFilter
                options={[
                  { value: "samsung", label: "Samsung", count: 45 },
                  { value: "apple", label: "Apple", count: 32 },
                  { value: "xiaomi", label: "Xiaomi", count: 28 },
                  { value: "oneplus", label: "OnePlus", count: 15 },
                  { value: "realme", label: "Realme", count: 22 }
                ]}
                selectedValues={selectedBrands}
                onChange={setSelectedBrands}
              />
            </FilterSection>

            {/* Categories */}
            <FilterSection title="Categories" defaultOpen={true}>
              <CheckboxFilter
                options={[
                  { value: "smartphones", label: "Smartphones", count: 156 },
                  { value: "laptops", label: "Laptops", count: 89 },
                  { value: "headphones", label: "Headphones", count: 67 },
                  { value: "smartwatches", label: "Smartwatches", count: 34 }
                ]}
                selectedValues={selectedCategories}
                onChange={setSelectedCategories}
              />
            </FilterSection>

            {/* Ratings */}
            <FilterSection title="Rating" defaultOpen={false}>
              <CheckboxFilter
                options={[
                  { value: "4.5+", label: "4.5+ Stars", count: 89 },
                  { value: "4.0+", label: "4.0+ Stars", count: 156 },
                  { value: "3.5+", label: "3.5+ Stars", count: 234 }
                ]}
                selectedValues={selectedRatings}
                onChange={setSelectedRatings}
              />
            </FilterSection>

            {/* Sentiment */}
            <FilterSection title="Sentiment" defaultOpen={false}>
              <CheckboxFilter
                options={[
                  { value: "positive", label: "Positive Reviews", count: 123 },
                  { value: "neutral", label: "Neutral Reviews", count: 67 },
                  { value: "negative", label: "Negative Reviews", count: 12 }
                ]}
                selectedValues={selectedSentiment}
                onChange={setSelectedSentiment}
              />
            </FilterSection>

            {/* Battery Capacity */}
            <FilterSection title="Battery Capacity" defaultOpen={false}>
              <CheckboxFilter
                options={[
                  { value: "5000mah+", label: "5000mAh+", count: 45 },
                  { value: "4000mah+", label: "4000mAh+", count: 78 },
                  { value: "3000mah+", label: "3000mAh+", count: 123 }
                ]}
                selectedValues={selectedBatteryCapacity}
                onChange={setSelectedBatteryCapacity}
              />
            </FilterSection>
          </div>

          {/* Apply Filters Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <Button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full"
            >
              Apply Filters ({activeFilterCount})
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );

  return (
    <div className="space-y-4">
      {/* Desktop/Tablet Filters */}
      <div className="hidden md:block">
        <DesktopFilters />
      </div>
      
      {/* Mobile Filters */}
      <div className="md:hidden">
        <MobileFilters />
      </div>
    </div>
  );
};

export default SearchFilters;
