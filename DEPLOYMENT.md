# GitHub Pages Deployment Guide

## Quick Setup

1. **Fork or Upload** this repository to GitHub
2. **Enable GitHub Pages** in repository Settings → Pages
3. **Set source** to "GitHub Actions"
4. **Push to main branch** to trigger automatic deployment

## Configuration Steps

### 1. Repository Setup
- Repository name will be used in the URL: `username.github.io/repo-name`
- Make sure the repository is public (or have GitHub Pro for private repos)

### 2. Update Base Path (if needed)
If your repository isn't named exactly as your GitHub Pages URL, update the base path in `vite.config.ts`:

```typescript
base: "/your-repository-name/"
```

### 3. GitHub Actions Configuration
The `.github/workflows/deploy.yml` file is already configured to:
- Install dependencies
- Build the project
- Deploy to GitHub Pages automatically

### 4. Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. Under **Source**, select "**GitHub Actions**"
3. Save the settings

## Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# The files will be in dist/public/
# Upload these files to your hosting service
```

## Features for GitHub Pages

✅ **Static Site Generation**: Uses mock API for all data
✅ **Client-Side Routing**: SPA routing with fallback handling
✅ **Dark/Light Mode**: Persistent theme preferences
✅ **Responsive Design**: Works on all devices
✅ **Search Functionality**: Real-time restaurant filtering
✅ **Cart Management**: localStorage-based cart persistence
✅ **SEO Optimized**: Meta tags and descriptions included

## Mock Data

For GitHub Pages deployment, the app uses mock data from `client/src/lib/mockApiClient.ts`:

- **3 Restaurants**: Bella Vista (Italian), Sakura Sushi (Japanese), Spice Garden (Indian)
- **4 Food Items**: Various dishes from different cuisines
- **4 Categories**: Pizza, Sushi, Burger, Curry
- **Cart Functionality**: Persistent using localStorage

## Customization

### Adding More Restaurants
Edit `client/src/lib/mockApiClient.ts` and add to the `mockRestaurants` array:

```typescript
{
  id: "4",
  name: "Your Restaurant",
  description: "Description here",
  cuisine: "Cuisine Type",
  rating: "4.8",
  deliveryTime: "20-30 min",
  priceRange: "$$",
  imageUrl: "https://your-image-url.com/image.jpg"
}
```

### Updating Colors
Modify CSS variables in `client/src/index.css`:

```css
:root {
  --primary: your-color;
  --secondary: your-color;
  --accent: your-color;
}
```

## Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Ensure all dependencies are installed: `npm ci`
- Check for TypeScript errors: `npm run check`

### Deployment Issues
- Verify GitHub Actions are enabled
- Check the Actions tab for error logs
- Ensure repository is public or you have GitHub Pro

### Routing Issues
- The `404.html` and redirect script handle SPA routing
- Ensure base path is correctly set if using subdirectory

## Performance

- **Bundle Size**: ~320KB (gzipped ~99KB)
- **Load Time**: Fast initial load with code splitting
- **SEO**: Optimized meta tags and descriptions
- **Caching**: Browser caching for static assets

## Support

For issues with deployment:
1. Check GitHub Actions logs
2. Verify all files are committed
3. Ensure GitHub Pages is enabled
4. Check browser console for errors

---

Your food delivery website is now ready for GitHub Pages! 🚀