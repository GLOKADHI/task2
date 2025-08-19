// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  restaurants;
  foodItems;
  categories;
  cartItems;
  orders;
  constructor() {
    this.restaurants = /* @__PURE__ */ new Map();
    this.foodItems = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.cartItems = /* @__PURE__ */ new Map();
    this.orders = /* @__PURE__ */ new Map();
    this.initializeData();
  }
  initializeData() {
    const sampleCategories = [
      { id: "1", name: "Pizza", icon: "fas fa-pizza-slice", color: "from-red-500 to-red-400", isActive: true },
      { id: "2", name: "Burgers", icon: "fas fa-hamburger", color: "from-teal-500 to-teal-400", isActive: true },
      { id: "3", name: "Desserts", icon: "fas fa-ice-cream", color: "from-yellow-500 to-yellow-400", isActive: true },
      { id: "4", name: "Healthy", icon: "fas fa-leaf", color: "from-green-500 to-green-400", isActive: true },
      { id: "5", name: "Drinks", icon: "fas fa-cocktail", color: "from-purple-500 to-purple-400", isActive: true },
      { id: "6", name: "All", icon: "fas fa-utensils", color: "from-orange-500 to-orange-400", isActive: true }
    ];
    sampleCategories.forEach((category) => this.categories.set(category.id, category));
    const sampleRestaurants = [
      {
        id: "1",
        name: "Bella Vista",
        description: "Authentic Italian cuisine with wood-fired pizzas",
        cuisine: "Italian \u2022 Pizza \u2022 Pasta",
        rating: "4.8",
        deliveryTime: "25-35 min",
        priceRange: "$$",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: "2",
        name: "Sakura Sushi",
        description: "Fresh sushi and traditional Japanese dishes",
        cuisine: "Japanese \u2022 Sushi \u2022 Ramen",
        rating: "4.9",
        deliveryTime: "20-30 min",
        priceRange: "$$$",
        imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: "3",
        name: "Burger Palace",
        description: "Gourmet burgers made with premium ingredients",
        cuisine: "American \u2022 Burgers \u2022 Fries",
        rating: "4.7",
        deliveryTime: "15-25 min",
        priceRange: "$$",
        imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      }
    ];
    sampleRestaurants.forEach((restaurant) => this.restaurants.set(restaurant.id, restaurant));
    const sampleFoodItems = [
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
        createdAt: /* @__PURE__ */ new Date()
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
        createdAt: /* @__PURE__ */ new Date()
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
        createdAt: /* @__PURE__ */ new Date()
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
        createdAt: /* @__PURE__ */ new Date()
      }
    ];
    sampleFoodItems.forEach((foodItem) => this.foodItems.set(foodItem.id, foodItem));
  }
  async getRestaurants() {
    return Array.from(this.restaurants.values()).filter((r) => r.isActive);
  }
  async getRestaurant(id) {
    return this.restaurants.get(id);
  }
  async createRestaurant(insertRestaurant) {
    const id = randomUUID();
    const restaurant = {
      ...insertRestaurant,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      isActive: insertRestaurant.isActive ?? true
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }
  async getFoodItems() {
    return Array.from(this.foodItems.values()).filter((f) => f.isAvailable);
  }
  async getFoodItemsByRestaurant(restaurantId) {
    return Array.from(this.foodItems.values()).filter(
      (f) => f.restaurantId === restaurantId && f.isAvailable
    );
  }
  async getFoodItem(id) {
    return this.foodItems.get(id);
  }
  async getPopularFoodItems() {
    return Array.from(this.foodItems.values()).filter(
      (f) => f.isPopular && f.isAvailable
    );
  }
  async createFoodItem(insertFoodItem) {
    const id = randomUUID();
    const foodItem = {
      ...insertFoodItem,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      isAvailable: insertFoodItem.isAvailable ?? true,
      isPopular: insertFoodItem.isPopular ?? false
    };
    this.foodItems.set(id, foodItem);
    return foodItem;
  }
  async getCategories() {
    return Array.from(this.categories.values()).filter((c) => c.isActive);
  }
  async createCategory(insertCategory) {
    const id = randomUUID();
    const category = {
      ...insertCategory,
      id,
      isActive: insertCategory.isActive ?? true
    };
    this.categories.set(id, category);
    return category;
  }
  async getCartItems(sessionId) {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }
  async addToCart(insertCartItem) {
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.sessionId === insertCartItem.sessionId && item.foodItemId === insertCartItem.foodItemId
    );
    if (existingItem) {
      existingItem.quantity += insertCartItem.quantity ?? 1;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }
    const id = randomUUID();
    const cartItem = {
      ...insertCartItem,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      quantity: insertCartItem.quantity ?? 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  async updateCartItem(id, quantity) {
    const cartItem = this.cartItems.get(id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
    return void 0;
  }
  async removeFromCart(id) {
    return this.cartItems.delete(id);
  }
  async clearCart(sessionId) {
    const items = Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
    items.forEach((item) => this.cartItems.delete(item.id));
    return true;
  }
  async createOrder(insertOrder) {
    const id = randomUUID();
    const order = {
      ...insertOrder,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      status: insertOrder.status ?? "pending"
    };
    this.orders.set(id, order);
    return order;
  }
  async getOrder(id) {
    return this.orders.get(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  cuisine: text("cuisine").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  deliveryTime: text("delivery_time").notNull(),
  priceRange: text("price_range").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var foodItems = pgTable("food_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: varchar("restaurant_id").notNull().references(() => restaurants.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  isPopular: boolean("is_popular").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  isActive: boolean("is_active").notNull().default(true)
});
var cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  foodItemId: varchar("food_item_id").notNull().references(() => foodItems.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  restaurantId: varchar("restaurant_id").notNull().references(() => restaurants.id),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  deliveryAddress: text("delivery_address").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var insertRestaurantSchema = createInsertSchema(restaurants).omit({
  id: true,
  createdAt: true
});
var insertFoodItemSchema = createInsertSchema(foodItems).omit({
  id: true,
  createdAt: true
});
var insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});
var insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true
});
var insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/restaurants", async (req, res) => {
    try {
      const restaurants2 = await storage.getRestaurants();
      res.json(restaurants2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch restaurants" });
    }
  });
  app2.get("/api/restaurants/:id", async (req, res) => {
    try {
      const restaurant = await storage.getRestaurant(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch restaurant" });
    }
  });
  app2.get("/api/food-items", async (req, res) => {
    try {
      const { restaurantId, popular } = req.query;
      let foodItems2;
      if (restaurantId) {
        foodItems2 = await storage.getFoodItemsByRestaurant(restaurantId);
      } else if (popular === "true") {
        foodItems2 = await storage.getPopularFoodItems();
      } else {
        foodItems2 = await storage.getFoodItems();
      }
      res.json(foodItems2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food items" });
    }
  });
  app2.get("/api/food-items/:id", async (req, res) => {
    try {
      const foodItem = await storage.getFoodItem(req.params.id);
      if (!foodItem) {
        return res.status(404).json({ message: "Food item not found" });
      }
      res.json(foodItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food item" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories2 = await storage.getCategories();
      res.json(categories2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  app2.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const cartItems2 = await storage.getCartItems(req.params.sessionId);
      res.json(cartItems2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });
  app2.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });
  app2.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be a positive number" });
      }
      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });
  app2.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });
  app2.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      await storage.clearCart(req.params.sessionId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  app2.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
