import { useQuery } from "@tanstack/react-query";
import { type FoodItem } from "@shared/schema";
import FoodCard from "@/components/cards/food-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularDishes() {
  const { data: foodItems, isLoading } = useQuery<FoodItem[]>({
    queryKey: ["/api/food-items"],
    select: (data) => data.filter(item => item.isPopular),
  });

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark dark:text-white mb-4">Today's Special</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Most ordered dishes right now</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodItems?.map((item) => (
              <FoodCard key={item.id} foodItem={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
