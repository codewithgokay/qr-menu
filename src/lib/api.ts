import { MenuItem, MenuCategory } from '@/lib/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Menu Items API
export const menuItemsApi = {
  // Get all menu items
  getAll: async (): Promise<MenuItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/menu-items`, {
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(3000)
      })
      if (!response.ok) {
        throw new Error('Failed to fetch menu items')
      }
      return response.json()
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Get a specific menu item
  getById: async (id: string): Promise<MenuItem> => {
    const response = await fetch(`${API_BASE_URL}/api/menu-items/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch menu item')
    }
    return response.json()
  },

  // Create a new menu item
  create: async (item: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    const response = await fetch(`${API_BASE_URL}/api/menu-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    if (!response.ok) {
      throw new Error('Failed to create menu item')
    }
    return response.json()
  },

  // Update a menu item
  update: async (id: string, item: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    const response = await fetch(`${API_BASE_URL}/api/menu-items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    if (!response.ok) {
      throw new Error('Failed to update menu item')
    }
    return response.json()
  },

  // Delete a menu item
  delete: async (id: string): Promise<void> => {
    console.log('Attempting to delete menu item:', id)
    const response = await fetch(`${API_BASE_URL}/api/menu-items/${id}`, {
      method: 'DELETE',
    })
    console.log('Delete response status:', response.status)
    console.log('Delete response ok:', response.ok)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Delete error response:', errorData)
      throw new Error(`Failed to delete menu item: ${errorData.error || 'Unknown error'}`)
    }
    
    const result = await response.json()
    console.log('Delete successful:', result)
  },

  // Reorder menu items
  reorder: async (items: { id: string; order: number }[]): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/menu-items/reorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    })
    if (!response.ok) {
      throw new Error('Failed to reorder menu items')
    }
  },
}

// Categories API
export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<MenuCategory[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(3000)
      })
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      return response.json()
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Get a specific category
  getById: async (id: string): Promise<MenuCategory> => {
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch category')
    }
    return response.json()
  },

  // Create a new category
  create: async (category: Omit<MenuCategory, 'id'>): Promise<MenuCategory> => {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    if (!response.ok) {
      throw new Error('Failed to create category')
    }
    return response.json()
  },

  // Update a category
  update: async (id: string, category: Omit<MenuCategory, 'id'>): Promise<MenuCategory> => {
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    if (!response.ok) {
      throw new Error('Failed to update category')
    }
    return response.json()
  },

  // Delete a category
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete category')
    }
  },

  // Reorder categories
  reorder: async (categories: { id: string; order: number }[]): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/categories/reorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categories }),
    })
    if (!response.ok) {
      throw new Error('Failed to reorder categories')
    }
  },
}
