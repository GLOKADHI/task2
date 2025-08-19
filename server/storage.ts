import { type Restaurant, type InsertRestaurant, type FoodItem, type InsertFoodItem, type Category, type InsertCategory, type CartItem, type InsertCartItem, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Restaurants
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: string): Promise<Restaurant | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Food Items
  getFoodItems(): Promise<FoodItem[]>;
  getFoodItemsByRestaurant(restaurantId: string): Promise<FoodItem[]>;
  getFoodItem(id: string): Promise<FoodItem | undefined>;
  getPopularFoodItems(): Promise<FoodItem[]>;
  createFoodItem(foodItem: InsertFoodItem): Promise<FoodItem>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private restaurants: Map<string, Restaurant>;
  private foodItems: Map<string, FoodItem>;
  private categories: Map<string, Category>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.restaurants = new Map();
    this.foodItems = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Categories
    const sampleCategories: Category[] = [
      { id: "1", name: "Pizza", icon: "fas fa-pizza-slice", color: "from-red-500 to-red-400", isActive: true },
      { id: "2", name: "Burgers", icon: "fas fa-hamburger", color: "from-teal-500 to-teal-400", isActive: true },
      { id: "3", name: "Desserts", icon: "fas fa-ice-cream", color: "from-yellow-500 to-yellow-400", isActive: true },
      { id: "4", name: "Healthy", icon: "fas fa-leaf", color: "from-green-500 to-green-400", isActive: true },
      { id: "5", name: "Drinks", icon: "fas fa-cocktail", color: "from-purple-500 to-purple-400", isActive: true },
      { id: "6", name: "All", icon: "fas fa-utensils", color: "from-orange-500 to-orange-400", isActive: true },
    ];

    sampleCategories.forEach(category => this.categories.set(category.id, category));

    // Restaurants
    const sampleRestaurants: Restaurant[] = [
      {
        id: "1",
        name: "Bella Vista",
        description: "Authentic Italian cuisine with wood-fired pizzas",
        cuisine: "Italian • Pizza • Pasta",
        rating: "4.8",
        deliveryTime: "25-35 min",
        priceRange: "$$",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Sakura Sushi",
        description: "Fresh sushi and traditional Japanese dishes",
        cuisine: "Japanese • Sushi • Ramen",
        rating: "4.9",
        deliveryTime: "20-30 min",
        priceRange: "$$$",
        imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Burger Palace",
        description: "Gourmet burgers made with premium ingredients",
        cuisine: "American • Burgers • Fries",
        rating: "4.7",
        deliveryTime: "15-25 min",
        priceRange: "$$",
        imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
      },
    ];

    sampleRestaurants.forEach(restaurant => this.restaurants.set(restaurant.id, restaurant));

    // Food Items
    const sampleFoodItems: FoodItem[] = [
      {
        id: "1",
        restaurantId: "1",
        name: "Margherita Pizza",
        description: "Fresh mozzarella, basil, tomato sauce on wood-fired crust",
        price: "12.99",
        category: "Pizza",
        imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        isAvailable: true,
        isPopular: true,
        createdAt: new Date(),
      },
      {
        id: "2",
        restaurantId: "3",
        name: "Classic Burger",
        description: "Beef patty, cheese, lettuce, tomato, special sauce",
        price: "9.99",
        category: "Burgers",
        imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        isAvailable: true,
        isPopular: true,
        createdAt: new Date(),
      },
      {
        id: "3",
        restaurantId: "2",
        name: "Salmon Sushi",
        description: "Fresh salmon nigiri with wasabi and pickled ginger",
        price: "15.99",
        category: "Sushi",
        imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        isAvailable: true,
        isPopular: true,
        createdAt: new Date(),
      },
      {
        id: "4",
        restaurantId: "1",
        name: "Buddha Bowl",
        description: "Quinoa, avocado, chickpeas, tahini dressing",
        price: "11.99",
        category: "Healthy",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        isAvailable: true,
        isPopular: true,
        createdAt: new Date(),
      },
    ];

    sampleFoodItems.forEach(foodItem => this.foodItems.set(foodItem.id, foodItem));
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values()).filter(r => r.isActive);
  }

  async getRestaurant(id: string): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = randomUUID();
    const restaurant: Restaurant = {
      ...insertRestaurant,
      id,
      createdAt: new Date(),
      isActive: insertRestaurant.isActive ?? true,
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  async getFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(f => f.isAvailable);
  }

  async getFoodItemsByRestaurant(restaurantId: string): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(
      f => f.restaurantId === restaurantId && f.isAvailable
    );
  }

  async getFoodItem(id: string): Promise<FoodItem | undefined> {
    return this.foodItems.get(id);
  }

  async getPopularFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(
      f => f.isPopular && f.isAvailable
    );
  }

  async createFoodItem(insertFoodItem: InsertFoodItem): Promise<FoodItem> {
    const id = randomUUID();
    const foodItem: FoodItem = {
      ...insertFoodItem,
      id,
      createdAt: new Date(),
      isAvailable: insertFoodItem.isAvailable ?? true,
      isPopular: insertFoodItem.isPopular ?? false,
    };
    this.foodItems.set(id, foodItem);
    return foodItem;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(c => c.isActive);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      ...insertCategory, 
      id,
      isActive: insertCategory.isActive ?? true
    };
    this.categories.set(id, category);
    return category;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.sessionId === insertCartItem.sessionId && 
               item.foodItemId === insertCartItem.foodItemId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += (insertCartItem.quantity ?? 1);
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = {
      ...insertCartItem,
      id,
      createdAt: new Date(),
      quantity: insertCartItem.quantity ?? 1,
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
    items.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
      status: insertOrder.status ?? "pending",
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
