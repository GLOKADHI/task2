import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type CartItem, type FoodItem } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
// Generate session ID for cart
const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const getSessionId = () => {
  let sessionId = localStorage.getItem("foodieHubSessionId");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("foodieHubSessionId", sessionId);
  }
  return sessionId;
};

export function useCart() {
  const [sessionId] = useState(getSessionId);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart", sessionId],
  });

  const { data: foodItems = [] } = useQuery<FoodItem[]>({
    queryKey: ["/api/food-items"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ foodItemId, quantity }: { foodItemId: string; quantity: number }) => {
      const response = await apiRequest("POST", "/api/cart", {
        sessionId,
        foodItemId,
        quantity,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const response = await apiRequest("PUT", `/api/cart/${id}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/cart/session/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    },
  });

  const addToCart = (foodItemId: string, quantity: number = 1) => {
    addToCartMutation.mutate({ foodItemId, quantity });
  };

  const updateCartItem = (id: string, quantity: number) => {
    updateCartMutation.mutate({ id, quantity });
  };

  const removeFromCart = (id: string) => {
    removeFromCartMutation.mutate(id);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  // Get cart items with food details
  const cartItemsWithDetails = cartItems.map(cartItem => {
    const foodItem = foodItems.find(item => item.id === cartItem.foodItemId);
    return {
      ...cartItem,
      foodItem,
    };
  });

  const totalAmount = cartItemsWithDetails.reduce((total, item) => {
    if (item.foodItem) {
      return total + (parseFloat(item.foodItem.price) * item.quantity);
    }
    return total;
  }, 0);

  return {
    cartItems: cartItemsWithDetails,
    totalAmount,
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    sessionId,
  };
}
