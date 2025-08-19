import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import { Search, MapPin, Bike } from "lucide-react";

export default function Hero() {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [localLocation, setLocalLocation] = useState("");
  const { setSearchQuery, setDeliveryAddress, deliveryAddress } = useSearch();

  const handleSearch = () => {
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery.trim());
    }
    if (localLocation.trim()) {
      setDeliveryAddress(localLocation.trim());
    }
    // Scroll to restaurants section
    document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Food delivery hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Delicious Food
            <span className="block text-accent">Delivered Fast</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Order from your favorite restaurants and get fresh, hot meals delivered to your doorstep in minutes
          </p>
          
          {/* Search Bar */}
          <div className="glass-effect rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  type="text" 
                  placeholder="Search restaurants or dishes..." 
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 focus:ring-2 focus:ring-primary text-dark font-medium"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  type="text" 
                  placeholder="Enter delivery address" 
                  value={localLocation}
                  onChange={(e) => setLocalLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 focus:ring-2 focus:ring-primary text-dark font-medium"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="btn-animate bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg whitespace-nowrap hover:bg-primary/90"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Food
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 md:space-x-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
              <div className="text-sm opacity-80">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">1M+</div>
              <div className="text-sm opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">30min</div>
              <div className="text-sm opacity-80">Avg Delivery</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating delivery icon */}
      <div className="absolute bottom-10 right-10 floating-animation hidden lg:block">
        <div className="bg-secondary p-4 rounded-full shadow-lg">
          <Bike className="text-white w-8 h-8" />
        </div>
      </div>
    </section>
  );
}
