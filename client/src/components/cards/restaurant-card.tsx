import { Link } from "wouter";
import { type Restaurant } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="card-hover bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <img 
        src={restaurant.imageUrl} 
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-dark dark:text-white">{restaurant.name}</h3>
          <Badge className="bg-success text-white hover:bg-success/90">
            <Star className="w-4 h-4 mr-1 fill-current" />
            {restaurant.rating}
          </Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{restaurant.cuisine}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-3">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {restaurant.deliveryTime}
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {restaurant.priceRange}
            </div>
          </div>
          <Link href={`/restaurant/${restaurant.id}`}>
            <Button className="btn-animate bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
