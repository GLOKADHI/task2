import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { type Restaurant } from "@shared/schema";
import { useSearch } from "@/hooks/use-search";
import RestaurantCard from "@/components/cards/restaurant-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Restaurants() {
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants"],
  });

  const { searchQuery } = useSearch();

  const filteredRestaurants = useMemo(() => {
    if (!restaurants || !searchQuery.trim()) return restaurants;
    
    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [restaurants, searchQuery]);

  return (
    <section id="restaurants" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark dark:text-white mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Restaurants'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {searchQuery 
              ? `Found ${filteredRestaurants?.length || 0} restaurants matching your search`
              : 'Top-rated restaurants loved by our customers'
            }
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No restaurants found matching "{searchQuery}"</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">Try searching for a different cuisine or restaurant name</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants?.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
