import React from "react";
import QuickLinks from "@/components/ui/quick-links";

interface QuickLinksSectionProps {
  className?: string;
  variant?: 'footer' | 'sidebar' | 'mobile';
  title?: string;
  showTitle?: boolean;
}

const QuickLinksSection: React.FC<QuickLinksSectionProps> = ({
  className,
  variant = 'footer',
  title = "Quick Links",
  showTitle = true
}) => {
  return (
    <section className={className}>
      {showTitle && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-brand-black">{title}</h2>
          <p className="text-sm text-brand-black/60 mt-1">
            Navigate quickly to important pages
          </p>
        </div>
      )}
      <QuickLinks variant={variant} />
    </section>
  );
};

export default QuickLinksSection; 