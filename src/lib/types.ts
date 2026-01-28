export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  imagePublicId?: string;
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
    };
  };
  currency: string;
  language: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price';
  sortOrder: 'asc' | 'desc';
}

export interface UserPreferences {
  language: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
}

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
