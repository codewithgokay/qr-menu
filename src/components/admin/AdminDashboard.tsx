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
  const averagePrice = menuItems.length > 0 
    ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length 
    : 0;
  
  const itemsByCategory = categories.map(category => ({
    name: category.name,
    count: menuItems.filter(item => item.category === category.id).length
  }));

  const popularItems = menuItems.filter(item => item.isPopular).length;
  const vegetarianItems = menuItems.filter(item => item.isVegetarian).length;
  const veganItems = menuItems.filter(item => item.isVegan).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-sage/10">
              <span className="text-2xl">🍽️</span>
            </div>
            <div className="ml-4">
              <p className="text-text-secondary text-sm">Toplam Ürün</p>
              <p className="text-2xl font-bold text-text-primary">{totalItems}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-terracotta/10">
              <span className="text-2xl">📂</span>
            </div>
            <div className="ml-4">
              <p className="text-text-secondary text-sm">Kategori</p>
              <p className="text-2xl font-bold text-text-primary">{totalCategories}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-golden-accent/10">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-text-secondary text-sm">Ortalama Fiyat</p>
              <p className="text-2xl font-bold text-text-primary">₺{averagePrice.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-navy-slate/10">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-text-secondary text-sm">Popüler Ürün</p>
              <p className="text-2xl font-bold text-text-primary">{popularItems}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">Kategori Dağılımı</h3>
          <div className="space-y-3">
            {itemsByCategory.map((category, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-text-primary">{category.name}</span>
                <span className="text-text-primary font-semibold">{category.count} ürün</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
          <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">Özel Diyet Seçenekleri</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-primary">🌱 Vejetaryen</span>
              <span className="text-text-primary font-semibold">{vegetarianItems} ürün</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-primary">🌿 Vegan</span>
              <span className="text-text-primary font-semibold">{veganItems} ürün</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-primary">⭐ Popüler</span>
              <span className="text-text-primary font-semibold">{popularItems} ürün</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
