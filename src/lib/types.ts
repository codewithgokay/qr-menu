export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  allergens?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  calories?: number;
  prepTime?: number; // in minutes
  order?: number; // for sorting menu items
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      isClosed?: boolean;
    };
  };
  currency: string;
  language: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  dietary: string[];
  priceRange: [number, number];
  sortBy: 'name' | 'price' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  language: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
}

export type DietaryOption = 
  | 'vegetarian' 
  | 'vegan' 
  | 'gluten-free' 
  | 'dairy-free' 
  | 'spicy' 
  | 'popular';

export interface MenuState {
  items: MenuItem[];
  categories: MenuCategory[];
  filteredItems: MenuItem[];
  filters: FilterOptions;
  isLoading: boolean;
  error: string | null;
  selectedItem: MenuItem | null;
  userPreferences: UserPreferences;
}
