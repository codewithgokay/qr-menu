'use client';

import { useState, useEffect } from 'react';
import { MenuItem, MenuCategory } from '@/lib/types';
import { menuItemsApi, categoriesApi } from '@/lib/api';
import { AdminHeader } from './AdminHeader';
import { AdminDashboard } from './AdminDashboard';
import { MenuItemForm } from './MenuItemForm';
import { MenuItemList } from './MenuItemList';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';
import { PasswordChangeForm } from './PasswordChangeForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { passwordManager } from '@/lib/password';
import { isAuthenticated, logout, getSessionInfo } from '@/lib/auth';

interface AdminPanelProps {
  onMenuUpdate: (items: MenuItem[]) => void;
  onCategoryUpdate: (categories: MenuCategory[]) => void;
}

export function AdminPanel({ 
  onMenuUpdate,
  onCategoryUpdate
}: AdminPanelProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [isCategoryManageMode, setIsCategoryManageMode] = useState(false);
  const [isItemManageMode, setIsItemManageMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [sessionInfo, setSessionInfo] = useState<{ loginTime: number; lastActivity: number; sessionId: string } | null>(null);

  // Show message function
  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // Session monitoring
  useEffect(() => {
    const updateSessionInfo = () => {
      const info = getSessionInfo();
      setSessionInfo(info);
    };

    updateSessionInfo();
    const interval = setInterval(updateSessionInfo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-logout on inactivity
  useEffect(() => {
    const checkSession = () => {
      if (!isAuthenticated()) {
        logout();
        window.location.href = '/admin';
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Load data from API on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [itemsData, categoriesData] = await Promise.all([
          menuItemsApi.getAll(),
          categoriesApi.getAll()
        ]);
        
        setMenuItems(itemsData);
        setCategories(categoriesData);
        onMenuUpdate(itemsData);
        onCategoryUpdate(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Veriler yüklenirken hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [onMenuUpdate, onCategoryUpdate]);

  const handleAddItem = () => {
    setEditingItem(null);
    setShowForm(true);
    setActiveTab('items');
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
    setActiveTab('items');
  };

  const handleSaveItem = async (itemData: Omit<MenuItem, 'id'>) => {
    try {
      let updatedItem: MenuItem;
      
      if (editingItem) {
        // Update existing item
        updatedItem = await menuItemsApi.update(editingItem.id, itemData);
        const updatedItems = menuItems.map(item =>
          item.id === editingItem.id ? updatedItem : item
        );
        setMenuItems(updatedItems);
        onMenuUpdate(updatedItems);
        showMessage('success', 'Ürün başarıyla güncellendi');
      } else {
        // Add new item
        updatedItem = await menuItemsApi.create(itemData);
        const updatedItems = [...menuItems, updatedItem];
        setMenuItems(updatedItems);
        onMenuUpdate(updatedItems);
        showMessage('success', 'Ürün başarıyla eklendi');
      }
      
      // Trigger menu page refresh
      if (typeof window !== 'undefined') {
        localStorage.setItem('menu_updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('menuUpdated'));
      }
      
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving menu item:', error);
      showMessage('error', 'Ürün kaydedilirken hata oluştu');
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await menuItemsApi.delete(itemId);
      const updatedItems = menuItems.filter(item => item.id !== itemId);
      setMenuItems(updatedItems);
      onMenuUpdate(updatedItems);
      
      // Trigger menu page refresh
      if (typeof window !== 'undefined') {
        localStorage.setItem('menu_updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('menuUpdated'));
      }
      
      showMessage('success', 'Ürün başarıyla silindi');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      showMessage('error', 'Ürün silinirken hata oluştu');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // Category management functions
  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
    setActiveTab('categories');
  };

  const handleEditCategory = (category: MenuCategory) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
    setActiveTab('categories');
  };

  const handleSaveCategory = async (categoryData: Omit<MenuCategory, 'id'>) => {
    try {
      let updatedCategory: MenuCategory;
      
      if (editingCategory) {
        // Update existing category
        updatedCategory = await categoriesApi.update(editingCategory.id, categoryData);
        const updatedCategories = categories.map(cat =>
          cat.id === editingCategory.id ? updatedCategory : cat
        );
        setCategories(updatedCategories);
        onCategoryUpdate(updatedCategories);
        showMessage('success', 'Kategori başarıyla güncellendi');
      } else {
        // Add new category - assign order based on current length
        const categoryWithOrder = {
          ...categoryData,
          order: categories.length + 1
        };
        updatedCategory = await categoriesApi.create(categoryWithOrder);
        const updatedCategories = [...categories, updatedCategory];
        setCategories(updatedCategories);
        onCategoryUpdate(updatedCategories);
        showMessage('success', 'Kategori başarıyla eklendi');
      }
      
      setShowCategoryForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      showMessage('error', 'Kategori kaydedilirken hata oluştu');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      // Check if any menu items are using this category
      const itemsUsingCategory = menuItems.filter(item => item.category === categoryId);
      
      if (itemsUsingCategory.length > 0) {
        showMessage('error', `Bu kategoriyi silemezsiniz çünkü ${itemsUsingCategory.length} ürün bu kategoriyi kullanıyor. Önce ürünleri başka kategoriye taşıyın.`);
        return;
      }
      
      await categoriesApi.delete(categoryId);
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      setCategories(updatedCategories);
      onCategoryUpdate(updatedCategories);
      showMessage('success', 'Kategori başarıyla silindi');
    } catch (error) {
      console.error('Error deleting category:', error);
      showMessage('error', 'Kategori silinirken hata oluştu');
    }
  };

  const handleCancelCategoryForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleCategoryReorder = (reorderedCategories: MenuCategory[]) => {
    setCategories(reorderedCategories);
  };

  const toggleCategoryManageMode = async () => {
    if (isCategoryManageMode) {
      // When completing category reordering, save the current order
      try {
        const categoriesWithOrder = categories.map((category, index) => ({
          id: category.id,
          order: index + 1
        }));
        
        await categoriesApi.reorder(categoriesWithOrder);
        showMessage('success', 'Kategori sıralaması başarıyla kaydedildi');
      } catch (error) {
        console.error('Error saving category order:', error);
        showMessage('error', 'Kategori sıralaması kaydedilirken hata oluştu');
      }
    }
    setIsCategoryManageMode(!isCategoryManageMode);
  };

  const toggleItemManageMode = async () => {
    if (isItemManageMode) {
      // When completing item reordering, save the current order
      try {
        const itemsWithOrder = menuItems.map((item, index) => ({
          id: item.id,
          order: index + 1 // Start from 1, not 0
        }));
        
        await menuItemsApi.reorder(itemsWithOrder);
        showMessage('success', 'Ürün sıralaması başarıyla kaydedildi');
      } catch (error) {
        console.error('Error saving item order:', error);
        showMessage('error', 'Ürün sıralaması kaydedilirken hata oluştu');
      }
    }
    
    setIsItemManageMode(!isItemManageMode);
  };

  const handleItemReorder = async (reorderedItems: MenuItem[]) => {
    try {
      // Update local state immediately for better UX
      setMenuItems(reorderedItems);
      onMenuUpdate(reorderedItems);

      // Save to database
      const itemsWithOrder = reorderedItems.map((item, index) => ({
        id: item.id,
        order: index + 1 // Start from 1, not 0
      }));

      await menuItemsApi.reorder(itemsWithOrder);
      
      // Trigger menu page refresh by updating localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('menu_updated', Date.now().toString());
        // Also dispatch a custom event to trigger immediate refresh
        window.dispatchEvent(new CustomEvent('menuUpdated'));
      }
      
      showMessage('success', 'Ürün sıralaması başarıyla kaydedildi');
    } catch (error) {
      console.error('Error reordering menu items:', error);
      showMessage('error', 'Ürünler sıralanırken hata oluştu');
    }
  };

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    try {
      await passwordManager.changePassword(currentPassword, newPassword);
      showMessage('success', 'Şifre başarıyla değiştirildi');
    } catch (error) {
      throw error; // Re-throw to let the form handle the error
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-text-primary text-xl font-heading mb-4">Yükleniyor...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl font-heading mb-4">{error}</div>
          <Button
            onClick={() => window.location.reload()}
            className="bg-sage hover:bg-sage/90 text-white"
          >
            Tekrar Dene
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-cream">
      <AdminHeader />
      
      {/* Message Display */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
          message.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {message.type === 'success' ? '✅' : '❌'}
            </span>
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {showForm ? (
          <MenuItemForm
            item={editingItem}
            categories={categories}
            onSave={handleSaveItem}
            onCancel={handleCancelForm}
            isEditing={!!editingItem}
          />
        ) : showCategoryForm ? (
          <CategoryForm
            category={editingCategory}
            onSave={handleSaveCategory}
            onCancel={handleCancelCategoryForm}
            isEditing={!!editingCategory}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white shadow-soft border border-warm-beige h-auto">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-sage data-[state=active]:text-white text-text-primary hover:text-sage text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4"
              >
                <span className="hidden sm:inline">📊 Kontrol Paneli</span>
                <span className="sm:hidden">📊 Panel</span>
              </TabsTrigger>
              <TabsTrigger 
                value="items" 
                className="data-[state=active]:bg-sage data-[state=active]:text-white text-text-primary hover:text-sage text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4"
              >
                <span className="hidden sm:inline">🍽️ Ürünler</span>
                <span className="sm:hidden">🍽️ Ürün</span>
              </TabsTrigger>
              <TabsTrigger 
                value="categories" 
                className="data-[state=active]:bg-sage data-[state=active]:text-white text-text-primary hover:text-sage text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4"
              >
                <span className="hidden sm:inline">📂 Kategoriler</span>
                <span className="sm:hidden">📂 Kategori</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-sage data-[state=active]:text-white text-text-primary hover:text-sage text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4"
              >
                <span className="hidden sm:inline">⚙️ Ayarlar</span>
                <span className="sm:hidden">⚙️ Ayar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-xl sm:text-3xl font-bold text-text-primary font-heading">Kontrol Paneli</h1>
              </div>
              <AdminDashboard menuItems={menuItems} categories={categories} />
            </TabsContent>

            <TabsContent value="items" className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                <h1 className="text-xl sm:text-3xl font-bold text-text-primary font-heading">Menü Ürünleri</h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  {!isItemManageMode ? (
                    <>
                      <Button
                        onClick={toggleItemManageMode}
                        variant="outline"
                        size="sm"
                        className="bg-white border-sage/30 text-sage hover:bg-sage/5 hover:border-sage/50 hover:text-sage shadow-soft hover:shadow-elevated transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg border-2 group text-xs sm:text-sm"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        <span className="font-heading">Sırala</span>
                      </Button>
                      <Button
                        onClick={handleAddItem}
                        size="sm"
                        className="bg-sage hover:bg-sage/90 text-white text-xs sm:text-sm px-3 sm:px-4 py-2"
                      >
                        + Yeni Ürün Ekle
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={toggleItemManageMode}
                      size="sm"
                      className="bg-sage hover:bg-sage/90 text-white shadow-elevated hover:shadow-lg transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg group text-xs sm:text-sm"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-heading">Tamamla</span>
                    </Button>
                  )}
                </div>
              </div>
              
              {isItemManageMode && (
                <div className="bg-sage/5 border border-sage/20 rounded-lg p-4">
                  <p className="text-sage text-sm">
                    <strong>💡 İpucu:</strong> Ürünleri kategoriler içinde yeniden sıralamak için sürükleyip bırakın veya ↑ ↓ butonlarını kullanın. 
                    Her kategori içindeki sıralama ayrı ayrı düzenlenebilir ve otomatik olarak kaydedilir.
                  </p>
                  <p className="text-sage text-xs mt-2">
                    💻 Masaüstü: Sürükleyip bırakın | 📱 Mobil: ↑ ↓ butonları ile sıralayın
                  </p>
                </div>
              )}
              
              <MenuItemList
                menuItems={menuItems}
                categories={categories}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                onReorder={handleItemReorder}
                isManageMode={isItemManageMode}
              />
            </TabsContent>

            <TabsContent value="categories" className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                <h1 className="text-xl sm:text-3xl font-bold text-text-primary font-heading">Kategoriler</h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  {!isCategoryManageMode ? (
                    <>
                      <Button
                        onClick={toggleCategoryManageMode}
                        variant="outline"
                        size="sm"
                        className="bg-white border-terracotta/30 text-terracotta hover:bg-terracotta/5 hover:border-terracotta/50 hover:text-terracotta shadow-soft hover:shadow-elevated transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg border-2 group text-xs sm:text-sm"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        <span className="font-heading">Sırala</span>
                      </Button>
                      <Button
                        onClick={handleAddCategory}
                        size="sm"
                        className="bg-sage hover:bg-sage/90 text-white text-xs sm:text-sm px-3 sm:px-4 py-2"
                      >
                        + Yeni Kategori Ekle
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={toggleCategoryManageMode}
                      size="sm"
                      className="bg-terracotta hover:bg-terracotta/90 text-white shadow-elevated hover:shadow-lg transition-all duration-300 font-medium px-3 sm:px-4 py-2 rounded-lg group text-xs sm:text-sm"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-heading">Tamamla</span>
                    </Button>
                  )}
                </div>
              </div>
              
              {isCategoryManageMode && (
                <div className="bg-terracotta/5 border border-terracotta/20 rounded-lg p-4">
                  <p className="text-terracotta text-sm">
                    <strong>💡 İpucu:</strong> Kategorileri yeniden sıralamak için sürükleyip bırakın veya ↑ ↓ butonlarını kullanın. 
                    Sıralama otomatik olarak kaydedilir.
                  </p>
                  <p className="text-terracotta text-xs mt-2">
                    💻 Masaüstü: Sürükleyip bırakın | 📱 Mobil: ↑ ↓ butonları ile sıralayın
                  </p>
                </div>
              )}
              
              <CategoryList
                categories={categories}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                onReorder={handleCategoryReorder}
                isManageMode={isCategoryManageMode}
              />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 sm:space-y-6">
              <h1 className="text-xl sm:text-3xl font-bold text-text-primary font-heading">Ayarlar</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <PasswordChangeForm onPasswordChange={handlePasswordChange} />
                
                <div className="p-6 bg-white shadow-soft border border-warm-beige rounded-lg hover:shadow-elevated transition-all duration-300">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">Veri Yönetimi</h3>
                  <div className="space-y-4">
                    <Button
                      onClick={() => {
                        if (confirm('Tüm menü verilerini sıfırlamak istediğinizden emin misiniz?')) {
                          setMenuItems([]);
                          localStorage.removeItem('qr_menu_items');
                        }
                      }}
                      className="w-full bg-destructive hover:bg-destructive/90 text-white"
                    >
                      Tüm Verileri Sıfırla
                    </Button>
                    <Button
                      onClick={() => {
                        const dataStr = JSON.stringify(menuItems, null, 2);
                        const dataBlob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'menu-backup.json';
                        link.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="w-full bg-sage hover:bg-sage/90 text-white"
                    >
                      Verileri Yedekle
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-white shadow-soft border border-warm-beige rounded-lg hover:shadow-elevated transition-all duration-300">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">Sistem Bilgileri</h3>
                  <div className="space-y-2 text-text-secondary">
                    <p>Toplam Ürün: {menuItems.length}</p>
                    <p>Kategori Sayısı: {categories.length}</p>
                    <p>Son Güncelleme: {new Date().toLocaleString('tr-TR')}</p>
                    <p>Varsayılan Şifre: {passwordManager.isPasswordChanged() ? 'Değiştirilmiş' : 'admin123'}</p>
                    {sessionInfo && (
                      <>
                        <p>Oturum ID: {sessionInfo.sessionId.substring(0, 8)}...</p>
                        <p>Giriş Zamanı: {new Date(sessionInfo.loginTime).toLocaleString('tr-TR')}</p>
                        <p>Son Aktivite: {new Date(sessionInfo.lastActivity).toLocaleString('tr-TR')}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
