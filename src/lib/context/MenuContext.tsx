'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { MenuState, FilterOptions, UserPreferences, MenuItem as MenuItemType, MenuCategory as MenuCategoryType } from '@/lib/types';
import { menuItemsApi, categoriesApi } from '@/lib/api';
import { menuItems as fallbackMenuItems, categories as fallbackCategories } from '@/data/menu';

interface MenuContextType extends MenuState {
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
  | { type: 'UPDATE_ITEMS' };

const initialState: MenuState = {
  items: fallbackMenuItems, // Start with static data immediately
  categories: fallbackCategories, // Start with static data immediately
  filteredItems: fallbackMenuItems,
  filters: {
    search: '',
    category: 'all',
    dietary: [],
    priceRange: [0, 100],
    sortBy: 'name',
    sortOrder: 'asc'
  },
  isLoading: false,
  error: null,
  selectedItem: null,
  userPreferences: {
    dietaryRestrictions: [],
    language: 'en',
    currency: 'USD',
    theme: 'system'
  }
};

function menuReducer(state: MenuState, action: MenuAction): MenuState {
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
          dietary: [],
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
      // Load items from localStorage
      if (typeof window !== 'undefined') {
        const savedItems = localStorage.getItem('qr_menu_items');
        if (savedItems) {
          try {
            const parsedItems = JSON.parse(savedItems);
            return {
              ...state,
              items: parsedItems,
              filteredItems: parsedItems
            };
          } catch (error) {
            console.error('Error loading menu items from localStorage:', error);
          }
        }
      }
      return state;
    
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
        // Don't set loading to true since we already have static data
        dispatch({ type: 'SET_ERROR', payload: null });

        const [itemsData, categoriesData] = await Promise.all([
          menuItemsApi.getAll(),
          categoriesApi.getAll()
        ]);
        
        // Only update if we got different data
        if (itemsData.length > 0) {
          dispatch({ type: 'SET_ITEMS', payload: itemsData });
        }
        if (categoriesData.length > 0) {
          dispatch({ type: 'SET_CATEGORIES', payload: categoriesData });
        }
      } catch (error) {
        console.error('Error loading data from API, using static data:', error);
        // Keep using static data, no need to dispatch since it's already loaded
        dispatch({ type: 'SET_ERROR', payload: null });
      }
    };

    // Load data in background without blocking UI
    loadData();
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
