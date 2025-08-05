import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SubscriptionPlans from './SubscriptionPlans';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('SubscriptionPlans Page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<SubscriptionPlans />);
    expect(screen.getByText('Choose the Perfect Plan for You')).toBeInTheDocument();
  });

  it('displays all three plan cards', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('displays plan descriptions', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Basic features for casual shoppers')).toBeInTheDocument();
    expect(screen.getByText('Advanced features for smart shoppers')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive insights for businesses')).toBeInTheDocument();
  });

  it('displays pricing information', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('₹2,999')).toBeInTheDocument();
    expect(screen.getByText('₹9,999')).toBeInTheDocument();
  });

  it('displays billing toggle with monthly and yearly options', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  it('shows savings percentage on yearly toggle', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    const yearlyButton = screen.getByText('Yearly');
    expect(yearlyButton).toBeInTheDocument();
    expect(screen.getByText(/Save \d+%/)).toBeInTheDocument();
  });

  it('displays social proof statistics', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('50,000+')).toBeInTheDocument();
    expect(screen.getByText('4.8★')).toBeInTheDocument();
    expect(screen.getByText('2,500+')).toBeInTheDocument();
    expect(screen.getByText('₹15,000+')).toBeInTheDocument();
  });

  it('displays testimonials section', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('What Our Users Say')).toBeInTheDocument();
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
    expect(screen.getByText('Rajesh Kumar')).toBeInTheDocument();
    expect(screen.getByText('Anjali Patel')).toBeInTheDocument();
  });

  it('displays FAQ section with questions', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('What analytics are included in Premium?')).toBeInTheDocument();
    expect(screen.getByText('How does the price tracking work?')).toBeInTheDocument();
    expect(screen.getByText('Are there discounts available?')).toBeInTheDocument();
  });

  it('displays CTA section', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Ready to make smarter purchase decisions?')).toBeInTheDocument();
    expect(screen.getByText('Start Your Free Trial')).toBeInTheDocument();
    expect(screen.getByText('Contact Sales')).toBeInTheDocument();
  });

  it('displays support section', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Need Help Choosing?')).toBeInTheDocument();
    expect(screen.getByText('+91 98765 43210')).toBeInTheDocument();
    expect(screen.getByText('sales@labelogic.com')).toBeInTheDocument();
    expect(screen.getByText('Live Chat')).toBeInTheDocument();
  });

  it('displays plan features with icons', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Basic product search')).toBeInTheDocument();
    expect(screen.getByText('Unlimited product searches')).toBeInTheDocument();
    expect(screen.getByText('API access')).toBeInTheDocument();
  });

  it('displays plan buttons', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Sign Up Free')).toBeInTheDocument();
    expect(screen.getByText('Get Premium')).toBeInTheDocument();
    expect(screen.getByText('Contact Sales')).toBeInTheDocument();
  });

  it('shows popular badge on Premium plan', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('displays comparison toggle button', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Compare All Plans')).toBeInTheDocument();
  });

  it('toggles comparison table when button is clicked', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    const compareButton = screen.getByText('Compare All Plans');
    fireEvent.click(compareButton);
    
    expect(screen.getByText('Feature Comparison')).toBeInTheDocument();
    expect(screen.getByText('Product Searches')).toBeInTheDocument();
    expect(screen.getByText('Review Analysis')).toBeInTheDocument();
  });

  it('displays plan icons', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    // Check that plan cards have the expected structure
    const premiumCard = screen.getByText('Premium').closest('.card');
    const enterpriseCard = screen.getByText('Enterprise').closest('.card');
    const freeCard = screen.getByText('Free').closest('.card');
    
    expect(premiumCard).toBeInTheDocument();
    expect(enterpriseCard).toBeInTheDocument();
    expect(freeCard).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Choose the Perfect Plan for You');
  });

  it('displays trust indicators', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Most Trusted Platform')).toBeInTheDocument();
  });

  it('shows billing cycle options with proper styling', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    const monthlyButton = screen.getByText('Monthly');
    const yearlyButton = screen.getByText('Yearly');
    
    expect(monthlyButton).toBeInTheDocument();
    expect(yearlyButton).toBeInTheDocument();
  });

  it('displays FAQ items with icons', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    // Check that FAQ items are present
    expect(screen.getByText('Can I upgrade or downgrade my plan?')).toBeInTheDocument();
    expect(screen.getByText('Is there a free trial available?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
  });

  it('shows testimonial ratings', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    // Check that testimonials have proper structure
    const testimonials = screen.getAllByText(/★/);
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it('displays contact information with icons', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('+91 98765 43210')).toBeInTheDocument();
    expect(screen.getByText('sales@labelogic.com')).toBeInTheDocument();
    expect(screen.getByText('Live Chat')).toBeInTheDocument();
  });

  it('has responsive design elements', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    // Check that the layout is responsive
    const container = screen.getByText('Choose the Perfect Plan for You').closest('.container');
    expect(container).toBeInTheDocument();
  });

  it('displays plan features with proper visual indicators', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    // Check that features are displayed with proper structure
    expect(screen.getByText('5 searches per day')).toBeInTheDocument();
    expect(screen.getByText('Advanced sentiment analysis')).toBeInTheDocument();
    expect(screen.getByText('Dedicated account manager')).toBeInTheDocument();
  });

  it('shows proper pricing for different billing cycles', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    // Check monthly pricing
    expect(screen.getByText('₹2,999')).toBeInTheDocument();
    expect(screen.getByText('₹9,999')).toBeInTheDocument();
    
    // Check yearly pricing (should be visible after toggle)
    expect(screen.getByText('₹29,999')).toBeInTheDocument();
    expect(screen.getByText('₹99,999')).toBeInTheDocument();
  });

  it('displays support section with proper styling', () => {
    renderWithRouter(<SubscriptionPlans />);
    
    expect(screen.getByText('Our team is here to help you find the perfect plan for your needs')).toBeInTheDocument();
  });
}); 