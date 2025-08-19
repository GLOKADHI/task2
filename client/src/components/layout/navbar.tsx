import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useSearch } from "@/hooks/use-search";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import SearchBar from "@/components/search/search-bar";
import { Utensils, ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartItems } = useCart();
  const { setSearchQuery, setDeliveryAddress } = useSearch();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isHomePage = location === '/';

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddressChange = (address: string) => {
    setDeliveryAddress(address);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary p-2 rounded-lg">
              <Utensils className="text-white text-xl w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-dark dark:text-white">FoodieHub</h1>
          </Link>
          
          {/* Search Bar (only on homepage) */}
          {isHomePage && (
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <SearchBar 
                onSearch={handleSearch}
                onAddressChange={handleAddressChange}
                className="w-full"
              />
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-dark dark:text-gray-300'}`}>
              Home
            </Link>
            <a href="#restaurants" className="text-dark dark:text-gray-300 hover:text-primary transition-colors font-medium">
              Restaurants
            </a>
            <a href="#about" className="text-dark dark:text-gray-300 hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-dark dark:text-gray-300 hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </div>
          
          {/* Cart, Theme Toggle and Auth */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-dark dark:text-gray-300 hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                  {totalItems}
                </Badge>
              )}
            </button>
            <ThemeToggle />
            <Button className="btn-animate bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90">
              Sign In
            </Button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-dark dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search (only on homepage) */}
        {isHomePage && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <SearchBar 
              onSearch={handleSearch}
              onAddressChange={handleAddressChange}
              className="w-full"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-dark dark:text-gray-300 hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <a href="#restaurants" className="text-dark dark:text-gray-300 hover:text-primary transition-colors font-medium">
                Restaurants
              </a>
              <a href="#about" className="text-dark dark:text-gray-300 hover:text-primary transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-dark dark:text-gray-300 hover:text-primary transition-colors font-medium">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
