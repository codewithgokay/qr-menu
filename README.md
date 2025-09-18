# QR Menu - Modern Restaurant Menu Website

A modern, mobile-first QR menu website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- **Mobile-First Design**: Optimized for mobile devices with touch-friendly interactions
- **Modern UI**: Clean, responsive design with shadcn/ui components
- **Real-time Search**: Instant menu item filtering with debounced search
- **Category Filtering**: Horizontal scrollable category tabs
- **Interactive Menu Items**: Detailed item views with modals/sheets
- **Favorites System**: Save favorite items with local storage
- **Smooth Animations**: Framer Motion animations for delightful UX
- **Image Optimization**: Next.js Image component with fallbacks
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: WCAG 2.1 compliant design

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (redirects to menu)
│   ├── menu/
│   │   └── page.tsx        # Main menu page
│   └── globals.css         # Global styles and utilities
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── menu/
│   │   ├── CategoryFilter.tsx
│   │   ├── MenuItem.tsx
│   │   ├── MenuGrid.tsx
│   │   └── SearchBar.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── common/
│       ├── LoadingSpinner.tsx
│       └── ImageOptimized.tsx
├── lib/
│   ├── context/
│   │   └── MenuContext.tsx # Global state management
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
└── data/
    └── menu.ts             # Sample menu data
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qr-menu
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Mobile Features

- **Touch-Friendly**: 44px minimum tap targets
- **Swipe Gestures**: Horizontal category navigation
- **Responsive Design**: Optimized for all screen sizes
- **Fast Loading**: Optimized images and lazy loading
- **Offline Support**: Service worker ready

## 🎨 Customization

### Adding Menu Items

Edit `src/data/menu.ts` to add or modify menu items:

```typescript
{
  id: 'unique-id',
  name: 'Item Name',
  description: 'Item description',
  price: 12.99,
  category: 'category-id',
  image: 'https://example.com/image.jpg',
  isVegetarian: true,
  isVegan: false,
  isSpicy: false,
  isPopular: true,
  allergens: ['dairy', 'nuts'],
  calories: 250,
  prepTime: 15
}
```

### Styling

The project uses Tailwind CSS with custom utilities defined in `src/app/globals.css`. You can customize:

- Color scheme in `tailwind.config.js`
- Typography and spacing
- Animation timings
- Component styles

### Restaurant Information

Update restaurant details in `src/data/menu.ts`:

```typescript
export const restaurant: Restaurant = {
  name: 'Your Restaurant Name',
  description: 'Your restaurant description',
  address: 'Your address',
  phone: 'Your phone number',
  // ... other details
};
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Performance

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS