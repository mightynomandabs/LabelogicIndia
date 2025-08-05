import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AboutUs from './AboutUs';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AboutUs Page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<AboutUs />);
    expect(screen.getByText('About Labelogic')).toBeInTheDocument();
  });

  it('displays hero section content', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText(/Empowering Indian consumers/)).toBeInTheDocument();
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
  });

  it('displays team section', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
    expect(screen.getByText('Arjun Patel')).toBeInTheDocument();
  });

  it('displays trust statistics', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText('10,000+')).toBeInTheDocument();
    expect(screen.getByText('50,000+')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
  });

  it('displays contact form', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Message *')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText('+91 98765 43210')).toBeInTheDocument();
    expect(screen.getByText('hello@labelogic.com')).toBeInTheDocument();
    expect(screen.getByText('Mumbai, Maharashtra')).toBeInTheDocument();
  });

  it('displays journey timeline', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText('Our Journey')).toBeInTheDocument();
    expect(screen.getByText('Founded')).toBeInTheDocument();
    expect(screen.getByText('Beta Launch')).toBeInTheDocument();
    expect(screen.getByText('Series A')).toBeInTheDocument();
    expect(screen.getByText('Vision 2025')).toBeInTheDocument();
  });

  it('displays testimonials', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText('Trusted by Thousands')).toBeInTheDocument();
    expect(screen.getByText(/Labelogic helped me find/)).toBeInTheDocument();
    expect(screen.getByText(/Finally, a platform/)).toBeInTheDocument();
    expect(screen.getByText(/As a tech enthusiast/)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<AboutUs />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('About Labelogic');
  });

  it('displays mission and vision sections', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Our Vision')).toBeInTheDocument();
  });

  it('displays join us section', () => {
    renderWithRouter(<AboutUs />);
    
    expect(screen.getByText('Join Our Mission')).toBeInTheDocument();
    expect(screen.getByText('View Open Positions')).toBeInTheDocument();
    expect(screen.getByText('Partner With Us')).toBeInTheDocument();
  });
}); 