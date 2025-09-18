'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { MenuState, FilterOptions, UserPreferences, MenuItem as MenuItemType } from '@/lib/types';

interface MenuContextType extends MenuState {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  toggleFavorite: (itemId: string) => void;
  setUserPreferences: (preferences: Partial<UserPreferences>) => void;
  clearFilters: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

type MenuAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<FilterOptions> }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_ITEM'; payload: MenuItemType | null };

const initialState: MenuState = {
  items: [],
  categories: [],
  filteredItems: [],
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
    favorites: [],
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
    
    case 'TOGGLE_FAVORITE':
      const favorites = state.userPreferences.favorites.includes(action.payload)
        ? state.userPreferences.favorites.filter(id => id !== action.payload)
        : [...state.userPreferences.favorites, action.payload];
      
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          favorites
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
    
    default:
      return state;
  }
}

interface MenuProviderProps {
  children: ReactNode;
  initialItems?: MenuItemType[];
  initialCategories?: any[];
}

export function MenuProvider({ 
  children, 
  initialItems = [], 
  initialCategories = [] 
}: MenuProviderProps) {
  const [state, dispatch] = useReducer(menuReducer, {
    ...initialState,
    items: initialItems,
    categories: initialCategories,
    filteredItems: initialItems
  });

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSelectedCategory = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  const setFilters = (filters: Partial<FilterOptions>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const toggleFavorite = (itemId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: itemId });
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
        toggleFavorite,
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
