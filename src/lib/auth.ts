// Authentication utilities for admin panel
import { passwordManager } from './password';

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

// Admin credentials (in production, these should be environment variables)
const ADMIN_CREDENTIALS = {
  username: 'admin'
};

// Session storage key for authentication
const AUTH_SESSION_KEY = 'qr_menu_admin_session';

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const session = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!session) return false;
  
  try {
    const authData = JSON.parse(session);
    return authData.isAuthenticated === true && authData.username === ADMIN_CREDENTIALS.username;
  } catch {
    return false;
  }
};

// Login function
export const login = (username: string, password: string): boolean => {
  if (username === ADMIN_CREDENTIALS.username && passwordManager.verifyPassword(password)) {
    const authData: AuthState = {
      isAuthenticated: true,
      username: username
    };
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authData));
    }
    
    return true;
  }
  return false;
};

// Logout function
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }
};

// Get current user
export const getCurrentUser = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const session = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!session) return null;
  
  try {
    const authData = JSON.parse(session);
    return authData.isAuthenticated ? authData.username : null;
  } catch {
    return null;
  }
};

// Check if admin access is requested via URL parameter
export const isAdminAccessRequested = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('admin') === 'true';
};

// Redirect to admin view
export const redirectToAdmin = (): void => {
  if (typeof window !== 'undefined') {
    window.location.href = '/admin';
  }
};

// Redirect to customer view
export const redirectToCustomer = (): void => {
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};
