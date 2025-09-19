// Simple password management for admin access
// In a production environment, this should be replaced with proper authentication

const ADMIN_PASSWORD_KEY = 'qr_menu_admin_password';
const DEFAULT_PASSWORD = 'admin123'; // Default password for initial setup

export const passwordManager = {
  // Get the current admin password
  getPassword: (): string => {
    if (typeof window === 'undefined') return DEFAULT_PASSWORD;
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  },

  // Set a new admin password
  setPassword: (newPassword: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
  },

  // Verify a password
  verifyPassword: (password: string): boolean => {
    return passwordManager.getPassword() === password;
  },

  // Change password (verify current and set new)
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    if (!passwordManager.verifyPassword(currentPassword)) {
      throw new Error('Mevcut şifre yanlış');
    }

    if (newPassword.length < 6) {
      throw new Error('Yeni şifre en az 6 karakter olmalı');
    }

    passwordManager.setPassword(newPassword);
  },

  // Check if password has been changed from default
  isPasswordChanged: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ADMIN_PASSWORD_KEY) !== null;
  },

  // Reset to default password (for emergency)
  resetToDefault: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ADMIN_PASSWORD_KEY);
  }
};
