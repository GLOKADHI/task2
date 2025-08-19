import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/components/cart/cart-provider";
import { SearchProvider } from "@/hooks/use-search";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AnimatedBackground from "@/components/background/animated-background";
import Home from "@/pages/home";
import Restaurant from "@/pages/restaurant";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/restaurant/:id" component={Restaurant} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="foodiehub-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SearchProvider>
            <CartProvider>
              <AnimatedBackground />
              <Toaster />
              <Router />
            </CartProvider>
          </SearchProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
