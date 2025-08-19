import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onAddressChange?: (address: string) => void;
  searchPlaceholder?: string;
  addressPlaceholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  onAddressChange, 
  searchPlaceholder = "Search restaurants, cuisines...",
  addressPlaceholder = "Enter delivery address",
  className = ""
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [address, setAddress] = useState("");

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleAddressSubmit = () => {
    if (onAddressChange && address.trim()) {
      onAddressChange(address.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className={`flex flex-col md:flex-row gap-4 ${className}`}>
      {/* Address Input */}
      <div className="relative flex-1 max-w-xs">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={addressPlaceholder}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, handleAddressSubmit)}
          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, handleSearch)}
          className="pl-10 pr-16 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <Button
          onClick={handleSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 text-sm"
        >
          Search
        </Button>
      </div>
    </div>
  );
}