import { type FoodItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Plus } from "lucide-react";

interface FoodCardProps {
  foodItem: FoodItem;
}

export default function FoodCard({ foodItem }: FoodCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(foodItem.id, 1);
  };

  return (
    <div className="food-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
      <img 
        src={foodItem.imageUrl} 
        alt={foodItem.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h4 className="font-semibold text-dark dark:text-white mb-2">{foodItem.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{foodItem.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">${foodItem.price}</span>
          <Button 
            onClick={handleAddToCart}
            className="btn-animate bg-primary text-white p-2 rounded-lg hover:bg-primary/90"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
