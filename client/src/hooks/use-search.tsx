import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  filteredRestaurants: any[];
  setFilteredRestaurants: (restaurants: any[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      deliveryAddress,
      setDeliveryAddress,
      filteredRestaurants,
      setFilteredRestaurants,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}