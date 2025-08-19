# FoodieHub - Food Delivery Application

## Overview

FoodieHub is a premium food delivery application built with a full-stack TypeScript architecture, similar to Zomato/Swiggy. The application features a modern UI with dark/light mode support, animated backgrounds, and professional animations. Users can browse restaurants, view food items, add items to cart, and place orders. It includes a responsive design with a React frontend and Express.js backend, using in-memory storage for development.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### GitHub Pages Deployment Configuration (Latest)
- Added mock API client for static hosting compatibility
- Created GitHub Actions workflow for automatic deployment
- Configured SPA routing with 404.html fallback
- Added comprehensive deployment documentation
- Updated HTML with SEO meta tags and GitHub Pages redirect handling
- Successfully built and tested for static hosting

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home and individual restaurants
- **UI Components**: Comprehensive component library based on shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system including primary colors (coral), secondary (teal), and accent (yellow) colors
- **Theme System**: Complete dark/light mode support with theme provider and toggle component
- **Animations**: Advanced CSS animations including floating particles, glowing orbs, drift motion, and wave effects
- **Background**: Dynamic animated background with geometric shapes and gradient overlays
- **State Management**: React Query (@tanstack/react-query) for server state management and custom hooks for local state
- **Form Handling**: React Hook Form with Zod schema validation
- **Cart Management**: Context-based cart provider with localStorage session management

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API endpoints for restaurants, food items, categories, cart management, and orders
- **Data Access**: Repository pattern with interface-based storage abstraction (IStorage) allowing for different implementations
- **Development Storage**: In-memory storage implementation (MemStorage) with sample data initialization
- **Request Logging**: Custom middleware for API request/response logging with performance metrics
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Tables**: 
  - restaurants (id, name, description, cuisine, rating, delivery_time, price_range, image_url)
  - food_items (id, restaurant_id, name, description, price, category, image_url, is_available, is_popular)
  - categories (id, name, icon, color, is_active)
  - cart_items (id, session_id, food_item_id, quantity)
  - orders (id, session_id, total_amount, status, delivery_address)
- **Schema Validation**: Zod schemas generated from Drizzle tables for type-safe API validation

### Development Environment
- **Build System**: Vite for frontend with hot module replacement and TypeScript support
- **Development Server**: Express server with Vite middleware integration for full-stack development
- **Code Organization**: Monorepo structure with shared types and schemas between frontend and backend
- **Path Aliases**: TypeScript path mapping for clean imports (@/ for client, @shared/ for shared code)

## External Dependencies

### Database & Infrastructure
- **Database**: PostgreSQL with Neon Database serverless driver (@neondatabase/serverless)
- **Database Migrations**: Drizzle Kit for schema migrations and database operations
- **Session Storage**: Connect-pg-simple for PostgreSQL-backed session management

### UI & Design System
- **Component Library**: Extensive Radix UI components ecosystem for accessible UI primitives
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority (cva) for component variants and styling
- **Carousel**: Embla Carousel React for image slideshows and content carousels

### Development Tools
- **Runtime**: TSX for TypeScript execution in development
- **Build Tools**: ESBuild for production server bundling
- **Replit Integration**: Replit-specific plugins for error overlays and development tools
- **CSS Processing**: PostCSS with Autoprefixer for vendor prefixing

### Utility Libraries
- **Date Handling**: date-fns for date manipulation and formatting
- **Validation**: Zod for runtime type validation and schema definition
- **Styling Utilities**: clsx and tailwind-merge for conditional CSS classes
- **Command Interface**: cmdk for command palette and search functionality