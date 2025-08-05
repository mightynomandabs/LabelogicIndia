
import { useState } from "react";
import { Share2 } from "lucide-react";
import { Product } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SocialShareButtonsProps {
  product: Product;
}

export const SocialShareButtons = ({ product }: SocialShareButtonsProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // Format sentiment percentage
  const sentimentPercent = Math.round(product.sentiment.positive * 100);
  
  // Create sharing text
  const shareText = `Check out ${product.name} on Labelogic: ${sentimentPercent}% positive reviews! Find the best prices on Flipkart, Amazon.in and more.`;
  
  // Mock URL for the product page
  const shareUrl = `https://labelogic.in/product/${product.id}`;
  
  const handleShare = async (platform: string) => {
    try {
      setIsSharing(true);
      
      // Track share event (mock)
      console.log(`Shared ${product.name} on ${platform}`);
      
      // Prepare share URL based on platform
      let shareUrl = '';
      
      switch (platform) {
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
          break;
        case 'x':
          shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'instagram':
          // Instagram doesn't have a direct sharing URL, so we'll copy to clipboard
          await navigator.clipboard.writeText(shareText + ' ' + shareUrl);
          toast({
            title: "Link copied!",
            description: "Now you can paste it in Instagram",
            duration: 3000
          });
          setIsSharing(false);
          setIsOpen(false);
          return;
        default:
          try {
            await navigator.share({
              title: product.name,
              text: shareText,
              url: shareUrl,
            });
            setIsSharing(false);
            setIsOpen(false);
            return;
          } catch (err) {
            console.error("Share API error:", err);
            // Fall back to opening a new window
            shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          }
      }
      
      // Open share URL in new window
      window.open(shareUrl, '_blank');
      
      toast({
        title: "Shared!",
        description: `Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
        duration: 2000,
      });
    } catch (error) {
      console.error("Sharing failed:", error);
      toast({
        title: "Sharing failed",
        description: "Please try again later",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSharing(false);
      setIsOpen(false);
    }
  };
  
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs flex items-center"
        disabled={isSharing}
      >
        <Share2 className="mr-2 h-3 w-3" />
        Share
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-40 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => handleShare('whatsapp')}
              disabled={isSharing}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-brand-yellow/20 flex items-center"
              role="menuitem"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" className="w-4 h-4 mr-2" />
              WhatsApp
            </button>
            <button
              onClick={() => handleShare('x')}
              disabled={isSharing}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-brand-yellow/20 flex items-center"
              role="menuitem"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" alt="X" className="w-4 h-4 mr-2" />
              X (Twitter)
            </button>
            <button
              onClick={() => handleShare('instagram')}
              disabled={isSharing}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-brand-yellow/20 flex items-center"
              role="menuitem"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" className="w-4 h-4 mr-2" />
              Instagram
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
