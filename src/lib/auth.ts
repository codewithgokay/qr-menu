// Enhanced Authentication utilities for admin panel
import { passwordManager } from './password';

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  loginTime: number;
  lastActivity: number;
  sessionId: string;
}

// Admin credentials (in production, these should be environment variables)
const ADMIN_CREDENTIALS = {
  username: 'admin'
};

// Session storage key for authentication
const AUTH_SESSION_KEY = 'qr_menu_admin_session';
const LOGIN_ATTEMPTS_KEY = 'qr_menu_login_attempts';
const ADMIN_ACCESS_KEY = 'qr_menu_admin_access';

// Session timeout (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

// Rate limiting (max 5 attempts per 15 minutes)
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_ATTEMPT_WINDOW = 15 * 60 * 1000;

// Generate secure session ID
const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Check rate limiting
const isRateLimited = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const attempts = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
  if (!attempts) return false;
  
  try {
    const attemptData = JSON.parse(attempts);
    const now = Date.now();
    
    // Clean old attempts
    const recentAttempts = attemptData.filter((time: number) => now - time < LOGIN_ATTEMPT_WINDOW);
    
    if (recentAttempts.length >= MAX_LOGIN_ATTEMPTS) {
      return true;
    }
    
    // Update attempts
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(recentAttempts));
    return false;
  } catch {
    return false;
  }
};

// Record login attempt
const recordLoginAttempt = (): void => {
  if (typeof window === 'undefined') return;
  
  const attempts = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
  const now = Date.now();
  
  try {
    const attemptData = attempts ? JSON.parse(attempts) : [];
    attemptData.push(now);
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attemptData));
  } catch {
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify([now]));
  }
};

// Check if user is authenticated with session timeout
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const session = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!session) return false;
  
  try {
    const authData: AuthState = JSON.parse(session);
    const now = Date.now();
    
    // Check if session is expired
    if (now - authData.lastActivity > SESSION_TIMEOUT) {
      logout();
      return false;
    }
    
    // Update last activity
    authData.lastActivity = now;
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authData));
    
    return authData.isAuthenticated === true && 
           authData.username === ADMIN_CREDENTIALS.username &&
           !!authData.sessionId;
  } catch {
    logout();
    return false;
  }
};

// Enhanced login function with rate limiting
export const login = (username: string, password: string): { success: boolean; message: string } => {
  // Check rate limiting
  if (isRateLimited()) {
    return {
      success: false,
      message: 'Too many login attempts. Please try again in 15 minutes.'
    };
  }
  
  // Record attempt
  recordLoginAttempt();
  
  if (username === ADMIN_CREDENTIALS.username && passwordManager.verifyPassword(password)) {
    const now = Date.now();
    const authData: AuthState = {
      isAuthenticated: true,
      username: username,
      loginTime: now,
      lastActivity: now,
      sessionId: generateSessionId()
    };
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authData));
      // Clear failed attempts on successful login
      localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    }
    
    return {
      success: true,
      message: 'Login successful'
    };
  }
  
  return {
    success: false,
    message: 'Invalid username or password'
  };
};

// Enhanced logout function
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    // Clear any admin access flags
    sessionStorage.removeItem(ADMIN_ACCESS_KEY);
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

// Check if admin access is requested via secure URL parameter
export const isAdminAccessRequested = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const urlParams = new URLSearchParams(window.location.search);
  const adminKey = urlParams.get('admin');
  const timestamp = urlParams.get('t');
  
  // Check for secure admin access with timestamp
  if (adminKey === 'true' && timestamp) {
    const now = Date.now();
    const requestTime = parseInt(timestamp);
    
    // Allow access only within 5 minutes of timestamp
    if (now - requestTime < 5 * 60 * 1000) {
      // Set temporary admin access flag
      sessionStorage.setItem(ADMIN_ACCESS_KEY, 'true');
      return true;
    }
  }
  
  // Check for existing admin access flag
  return sessionStorage.getItem(ADMIN_ACCESS_KEY) === 'true';
};

// Clear admin access flag
export const clearAdminAccess = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(ADMIN_ACCESS_KEY);
  }
};

// Generate secure admin URL
export const generateAdminUrl = (): string => {
  const timestamp = Date.now().toString();
  return `/admin?admin=true&t=${timestamp}`;
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

// Get session info for monitoring
export const getSessionInfo = (): { loginTime: number; lastActivity: number; sessionId: string } | null => {
  if (typeof window === 'undefined') return null;
  
  const session = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!session) return null;
  
  try {
    const authData: AuthState = JSON.parse(session);
    return {
      loginTime: authData.loginTime,
      lastActivity: authData.lastActivity,
      sessionId: authData.sessionId
    };
  } catch {
    return null;
  }
};
