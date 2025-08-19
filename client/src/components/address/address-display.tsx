import { MapPin, Edit2 } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { Button } from "@/components/ui/button";

export default function AddressDisplay() {
  const { deliveryAddress } = useSearch();

  if (!deliveryAddress) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Delivering to</p>
          <p className="font-medium text-gray-900 dark:text-white">{deliveryAddress}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
        <Edit2 className="w-4 h-4" />
      </Button>
    </div>
  );
}