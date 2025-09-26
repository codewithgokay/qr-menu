'use client';

import { MenuItem, MenuCategory } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface AdminDashboardProps {
  menuItems: MenuItem[];
  categories: MenuCategory[];
}

export function AdminDashboard({ menuItems, categories }: AdminDashboardProps) {
  // Calculate statistics
  const totalItems = menuItems.length;
  const totalCategories = categories.length;
  
  const itemsByCategory = categories.map(category => ({
    name: category.name,
    count: menuItems.filter(item => item.category === category.id).length
  }));

  const popularItems = menuItems.filter(item => item.isPopular).length;
  const vegetarianItems = menuItems.filter(item => item.isVegetarian).length;
  const veganItems = menuItems.filter(item => item.isVegan).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile-first stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
        <Card className="p-4 sm:p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-full bg-sage/10">
              <span className="text-lg sm:text-2xl">🍽️</span>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-text-secondary text-xs sm:text-sm truncate">Toplam Ürün</p>
              <p className="text-lg sm:text-2xl font-bold text-text-primary">{totalItems}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-full bg-terracotta/10">
              <span className="text-lg sm:text-2xl">📂</span>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-text-secondary text-xs sm:text-sm truncate">Kategori</p>
              <p className="text-lg sm:text-2xl font-bold text-text-primary">{totalCategories}</p>
            </div>
          </div>
        </Card>


        <Card className="p-4 sm:p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-full bg-navy-slate/10">
              <span className="text-lg sm:text-2xl">⭐</span>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-text-secondary text-xs sm:text-sm truncate">Popüler Ürün</p>
              <p className="text-lg sm:text-2xl font-bold text-text-primary">{popularItems}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile-first content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4 font-heading">Kategori Dağılımı</h3>
          <div className="space-y-2 sm:space-y-3">
            {itemsByCategory.map((category, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-text-primary text-sm sm:text-base truncate pr-2">{category.name}</span>
                <span className="text-text-primary font-semibold text-sm sm:text-base whitespace-nowrap">{category.count} ürün</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4 font-heading">Özel Diyet Seçenekleri</h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center py-1">
              <span className="text-text-primary text-sm sm:text-base">🌱 Vejetaryen</span>
              <span className="text-text-primary font-semibold text-sm sm:text-base">{vegetarianItems} ürün</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-text-primary text-sm sm:text-base">🌿 Vegan</span>
              <span className="text-text-primary font-semibold text-sm sm:text-base">{veganItems} ürün</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-text-primary text-sm sm:text-base">⭐ Popüler</span>
              <span className="text-text-primary font-semibold text-sm sm:text-base">{popularItems} ürün</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
