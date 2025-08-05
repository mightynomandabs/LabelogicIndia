import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuickLinks from './quick-links';

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('QuickLinks Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<QuickLinks />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });

  it('displays all navigation links', () => {
    renderWithRouter(<QuickLinks />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search Products')).toBeInTheDocument();
    expect(screen.getByText('Product Categories')).toBeInTheDocument();
    expect(screen.getByText('User Account')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<QuickLinks />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Quick navigation');
  });

  it('renders with footer variant by default', () => {
    renderWithRouter(<QuickLinks variant="footer" />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });

  it('renders with mobile variant', () => {
    renderWithRouter(<QuickLinks variant="mobile" />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });
}); 