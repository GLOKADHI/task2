import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { mockApiClient, isGitHubPages } from "./mockApiClient";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Use mock API for GitHub Pages deployment
  if (isGitHubPages()) {
    if (method === 'POST' && url === '/api/cart' && data) {
      const body = data as any;
      const result = await mockApiClient.addToCart(body.sessionId, body.foodItemId, body.quantity);
      return new Response(JSON.stringify(result), { status: 201 });
    }
    throw new Error(`API request not supported in GitHub Pages mode: ${url}`);
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    
    // Use mock API for GitHub Pages deployment
    if (isGitHubPages()) {
      switch (url) {
        case '/api/restaurants':
          return mockApiClient.getRestaurants();
        case '/api/food-items':
          return mockApiClient.getFoodItems();
        case '/api/categories':
          return mockApiClient.getCategories();
        default:
          if (url.startsWith('/api/restaurants/')) {
            const id = url.split('/').pop();
            return mockApiClient.getRestaurant(id!);
          }
          if (url.startsWith('/api/cart/')) {
            const sessionId = url.split('/').pop();
            return mockApiClient.getCart(sessionId!);
          }
          throw new Error(`Unknown API endpoint: ${url}`);
      }
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
