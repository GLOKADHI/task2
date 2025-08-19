// Mock API client for GitHub Pages deployment
import { type Restaurant, type FoodItem, type Category } from "@shared/schema";

// Mock data for GitHub Pages deployment
const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Bella Vista",
    description: "Authentic Italian cuisine with a modern twist",
    cuisine: "Italian",
    rating: "4.5",
    deliveryTime: "25-35 min",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600"
  },
  {
    id: "2",
    name: "Sakura Sushi",
    description: "Fresh sushi and Japanese delicacies",
    cuisine: "Japanese",
    rating: "4.7",
    deliveryTime: "30-40 min",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600"
  },
  {
    id: "3",
    name: "Spice Garden",
    description: "Aromatic Indian dishes with authentic spices",
    cuisine: "Indian",
    rating: "4.3",
    deliveryTime: "35-45 min",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600"
  }
];

const mockFoodItems: FoodItem[] = [
  {
    id: "1",
    restaurantId: "1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: "14.99",
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400",
    isAvailable: true,
    isPopular: true
  },
  {
    id: "2",
    restaurantId: "1",
    name: "Pasta Carbonara",
    description: "Creamy pasta with pancetta, eggs, and parmesan cheese",
    price: "16.99",
    category: "Pasta",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400",
    isAvailable: true,
    isPopular: false
  },
  {
    id: "3",
    restaurantId: "2",
    name: "California Roll",
    description: "Fresh sushi roll with crab, avocado, and cucumber",
    price: "8.99",
    category: "Sushi",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400",
    isAvailable: true,
    isPopular: true
  },
  {
    id: "4",
    restaurantId: "3",
    name: "Chicken Tikka Masala",
    description: "Tender chicken in a rich, creamy tomato-based sauce",
    price: "18.99",
    category: "Curry",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400",
    isAvailable: true,
    isPopular: true
  }
];

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Pizza",
    icon: "fas fa-pizza-slice",
    color: "#FF6B35",
    isActive: true
  },
  {
    id: "2",
    name: "Sushi",
    icon: "fas fa-fish",
    color: "#4ECDC4",
    isActive: true
  },
  {
    id: "3",
    name: "Burger",
    icon: "fas fa-hamburger",
    color: "#FFE66D",
    isActive: true
  },
  {
    id: "4",
    name: "Curry",
    icon: "fas fa-pepper-hot",
    color: "#FF8B94",
    isActive: true
  }
];

// Check if running on GitHub Pages
const isGitHubPages = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.includes('github.io') || 
         window.location.hostname.includes('github.com') ||
         process.env.NODE_ENV === 'production';
};

// Mock API functions
export const mockApiClient = {
  getRestaurants: async (): Promise<Restaurant[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRestaurants;
  },

  getRestaurant: async (id: string): Promise<Restaurant | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRestaurants.find(restaurant => restaurant.id === id);
  },

  getFoodItems: async (): Promise<FoodItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockFoodItems;
  },

  getCategories: async (): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCategories;
  },

  getCart: async (sessionId: string): Promise<any[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    // For GitHub Pages, return cart from localStorage
    const cart = localStorage.getItem(`cart_${sessionId}`);
    return cart ? JSON.parse(cart) : [];
  },

  addToCart: async (sessionId: string, foodItemId: string, quantity: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem(`cart_${sessionId}`) || '[]');
    
    // Check if item already exists
    const existingItemIndex = currentCart.findIndex((item: any) => item.foodItemId === foodItemId);
    
    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({
        sessionId,
        foodItemId,
        quantity,
        id: `${Date.now()}_${Math.random()}`
      });
    }
    
    // Save back to localStorage
    localStorage.setItem(`cart_${sessionId}`, JSON.stringify(currentCart));
    
    return currentCart[currentCart.length - 1];
  }
};

export { isGitHubPages };