'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { MenuState, FilterOptions, UserPreferences, MenuItem as MenuItemType, MenuCategory as MenuCategoryType } from '@/lib/types';
import { menuItemsApi, categoriesApi } from '@/lib/api';
import { menuItems as fallbackMenuItems, categories as fallbackCategories } from '@/data/menu';

interface ExtendedMenuState extends MenuState {
  isLoadingProgress: number;
  isInitialLoad: boolean;
  visibleItems: MenuItemType[];
}

interface MenuContextType extends ExtendedMenuState {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setUserPreferences: (preferences: Partial<UserPreferences>) => void;
  clearFilters: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

type MenuAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<FilterOptions> }
  | { type: 'SET_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_ITEM'; payload: MenuItemType | null }
  | { type: 'SET_ITEMS'; payload: MenuItemType[] }
  | { type: 'SET_CATEGORIES'; payload: MenuCategoryType[] }
  | { type: 'UPDATE_ITEMS' }
  | { type: 'SET_LOADING_PROGRESS'; payload: number }
  | { type: 'SET_INITIAL_LOAD'; payload: boolean }
  | { type: 'SET_VISIBLE_ITEMS'; payload: MenuItemType[] };

const initialState: ExtendedMenuState = {
  items: [], // Start empty, load from API first
  categories: [], // Start empty, load from API first
  filteredItems: [],
  filters: {
    search: '',
    category: 'all',
    priceRange: [0, 100],
    sortBy: 'name',
    sortOrder: 'asc'
  },
  isLoading: true, // Show loading initially
  error: null,
  selectedItem: null,
  userPreferences: {
    language: 'en',
    currency: 'USD',
    theme: 'system'
  },
  isLoadingProgress: 0,
  isInitialLoad: true,
  visibleItems: []
};

function menuReducer(state: ExtendedMenuState, action: MenuAction): ExtendedMenuState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload
        }
      };

    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.payload
        }
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };


    case 'SET_USER_PREFERENCES':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload
        }
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          search: '',
          category: 'all',
          priceRange: [0, 100],
          sortBy: 'name',
          sortOrder: 'asc'
        }
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'SET_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: action.payload
      };

    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
        filteredItems: action.payload
      };

    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      };

    case 'UPDATE_ITEMS':
      // This case is no longer needed - we always fetch fresh data
      return state;

    case 'SET_LOADING_PROGRESS':
      return {
        ...state,
        isLoadingProgress: action.payload
      };

    case 'SET_INITIAL_LOAD':
      return {
        ...state,
        isInitialLoad: action.payload
      };

    case 'SET_VISIBLE_ITEMS':
      return {
        ...state,
        visibleItems: action.payload
      };

    default:
      return state;
  }
}

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({
  children
}: MenuProviderProps) {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  // Load items and categories from API on mount (client-side only)
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const loadData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        dispatch({ type: 'SET_LOADING_PROGRESS', payload: 0 });

        // Always load fresh data from API first - no static data fallback
        dispatch({ type: 'SET_LOADING_PROGRESS', payload: 25 });

        const [itemsResult, categoriesResult] = await Promise.allSettled([
          menuItemsApi.getAll(),
          categoriesApi.getAll()
        ]);

        dispatch({ type: 'SET_LOADING_PROGRESS', payload: 75 });

        let allItems: MenuItemType[] = [];
        let allCategories: MenuCategoryType[] = [];

        // Handle menu items result
        if (itemsResult.status === 'fulfilled' && Array.isArray(itemsResult.value) && itemsResult.value.length > 0) {
          allItems = itemsResult.value as MenuItemType[];
        } else {
          // Only use fallback if API completely fails
          allItems = fallbackMenuItems;
          console.warn('Using fallback menu items');
        }

        // Handle categories result
        if (categoriesResult.status === 'fulfilled' && Array.isArray(categoriesResult.value) && categoriesResult.value.length > 0) {
          allCategories = categoriesResult.value as MenuCategoryType[];
        } else {
          // Only use fallback if API completely fails
          allCategories = fallbackCategories;
          console.warn('Using fallback categories');
        }

        // Update with fresh data
        dispatch({ type: 'SET_CATEGORIES', payload: allCategories });
        dispatch({ type: 'SET_ITEMS', payload: allItems });
        dispatch({ type: 'SET_VISIBLE_ITEMS', payload: allItems });

        dispatch({ type: 'SET_LOADING_PROGRESS', payload: 100 });

      } catch (error) {
        console.error('Error loading menu data:', error);
        // Only use fallback data if everything fails
        dispatch({ type: 'SET_CATEGORIES', payload: fallbackCategories });
        dispatch({ type: 'SET_ITEMS', payload: fallbackMenuItems });
        dispatch({ type: 'SET_VISIBLE_ITEMS', payload: fallbackMenuItems });
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load menu data' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_INITIAL_LOAD', payload: false });
      }
    };

    loadData();

    // Listen for menu updates from admin panel
    const handleMenuUpdate = () => {
      // Simply reload fresh data from API
      loadData();
    };

    window.addEventListener('menuUpdated', handleMenuUpdate);

    return () => {
      window.removeEventListener('menuUpdated', handleMenuUpdate);
    };
  }, []);

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSelectedCategory = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  const setFilters = (filters: Partial<FilterOptions>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };


  const setUserPreferences = (preferences: Partial<UserPreferences>) => {
    dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  return (
    <MenuContext.Provider
      value={{
        ...state,
        setSearchQuery,
        setSelectedCategory,
        setFilters,
        setUserPreferences,
        clearFilters
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
