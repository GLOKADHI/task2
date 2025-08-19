import { useQuery } from "@tanstack/react-query";
import { type Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Pizza, 
  Beef, 
  IceCream, 
  Leaf, 
  Wine, 
  Utensils 
} from "lucide-react";

const iconMap = {
  "fas fa-pizza-slice": Pizza,
  "fas fa-hamburger": Beef,
  "fas fa-ice-cream": IceCream,
  "fas fa-leaf": Leaf,
  "fas fa-cocktail": Wine,
  "fas fa-utensils": Utensils,
};

export default function Categories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategoryClick = (category: Category) => {
    console.log("Category clicked:", category.name);
    // TODO: Implement category filtering
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark dark:text-white mb-4">Browse by Category</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Discover amazing food from different cuisines</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories?.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Utensils;
              
              return (
                <div 
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`category-btn bg-gradient-to-br ${category.color} text-white p-6 rounded-2xl text-center cursor-pointer`}
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-3" />
                  <div className="font-semibold">{category.name}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
