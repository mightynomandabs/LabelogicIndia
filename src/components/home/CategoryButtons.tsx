
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smartphone, Laptop, Utensils, ShoppingCart, Headphones, Watch, Camera, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Mobiles", icon: Smartphone, query: "mobile phones", color: "text-blue-600" },
  { name: "Laptops", icon: Laptop, query: "laptops", color: "text-purple-600" },
  { name: "Headphones", icon: Headphones, query: "wireless headphones", color: "text-green-600" },
  { name: "Smartwatches", icon: Watch, query: "smartwatches", color: "text-red-600" },
  { name: "Cameras", icon: Camera, query: "digital cameras", color: "text-orange-600" },
  { name: "Gaming", icon: Gamepad2, query: "gaming accessories", color: "text-indigo-600" },
  { name: "Kitchen", icon: Utensils, query: "kitchen appliances", color: "text-pink-600" },
  { name: "Groceries", icon: ShoppingCart, query: "groceries", color: "text-yellow-600" }
];

const CategoryButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-brand-black mb-2">
          Popular Categories
        </h3>
        <p className="text-sm text-brand-black/60">
          Quick search by category
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => handleCategoryClick(category.query)}
            variant="outline"
            className="border-2 border-brand-black/20 hover:border-brand-purple bg-white hover:bg-brand-purple hover:text-white text-brand-black px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200 hover:shadow-md group"
          >
            <category.icon className={`h-5 w-5 ${category.color} group-hover:text-white transition-colors duration-200`} />
            <span className="font-medium">{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
