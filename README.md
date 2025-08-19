# FoodieHub - Premium Food Delivery Website

A modern, responsive food delivery application built with React, TypeScript, and Tailwind CSS. Features dark/light mode support, animated backgrounds, and a comprehensive food ordering system.

## 🚀 Features

- **Modern UI/UX**: Professional design with animated backgrounds and smooth transitions
- **Dark/Light Mode**: Complete theme support with persistent preferences
- **Search & Filter**: Real-time restaurant and cuisine search functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Shopping Cart**: Full cart management with localStorage persistence
- **Restaurant Pages**: Detailed restaurant and menu browsing
- **Address Management**: Delivery address input and display

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: React Query, Context API
- **Routing**: Wouter
- **Icons**: Lucide React
- **Animations**: CSS animations with custom keyframes

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/foodiehub.git
cd foodiehub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "GitHub Actions"
3. **Push to main branch** to trigger automatic deployment
4. **Update base path** in `vite.config.ts` if needed:
   ```ts
   base: "/your-repo-name/"
   ```

### Manual Build for GitHub Pages

```bash
npm run build
```

The built files will be in `dist/public/` directory.

## 🎨 Customization

### Theme Colors
Update colors in `client/src/index.css`:
```css
:root {
  --primary: 20 14.3% 4.1%;  /* Coral */
  --secondary: 47 9% 10%;     /* Teal */
  --accent: 48 96% 53%;       /* Yellow */
}
```

### Mock Data
For GitHub Pages deployment, mock data is used from `client/src/lib/mockApiClient.ts`. Update this file to customize restaurants, food items, and categories.

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities and API clients
│   │   ├── pages/         # Page components
│   │   └── main.tsx       # Entry point
├── server/                # Backend API (dev only)
├── shared/                # Shared types and schemas
└── .github/workflows/     # GitHub Actions deployment
```

## 🔧 Configuration

### Environment Variables
For development with a real backend:
- `NODE_ENV`: Set to "production" for GitHub Pages build
- Database and API configurations in server files

### GitHub Pages Mode
The application automatically detects GitHub Pages environment and switches to mock data mode.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Optimized external image URLs
- **Bundle Size**: Optimized with Vite's tree shaking
- **Caching**: React Query for efficient data caching

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions, please open a GitHub issue or contact the development team.

---

Built with ❤️ using modern web technologies