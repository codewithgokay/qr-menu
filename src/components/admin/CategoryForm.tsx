'use client';

import { useState, useEffect } from 'react';
import { MenuCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface CategoryFormProps {
  category?: MenuCategory | null;
  onSave: (category: Omit<MenuCategory, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function CategoryForm({ 
  category, 
  onSave, 
  onCancel, 
  isEditing = false 
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        icon: category.icon || ''
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData: Omit<MenuCategory, 'id'> = {
      name: formData.name,
      description: formData.description || undefined,
      icon: formData.icon || undefined,
      order: 0 // Will be set automatically based on position
    };

    onSave(categoryData);
  };

  return (
    <Card className="p-4 sm:p-6 bg-white shadow-soft border border-warm-beige">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary font-heading">
          {isEditing ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}
        </h2>
        <Button
          onClick={onCancel}
          variant="outline"
          size="sm"
          className="bg-soft-gray border-warm-beige text-text-primary hover:bg-warm-beige hover:text-text-primary text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
        >
          ← Geri Dön
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Kategori Adı *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Kategori adını girin"
            className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Açıklama
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Kategori açıklamasını girin"
            className="w-full p-3 rounded-lg bg-soft-gray border border-warm-beige text-text-primary placeholder-text-secondary resize-none focus:border-sage focus:ring-sage"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            İkon (Emoji)
          </label>
          <Input
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="🍽️"
            className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
          />
          <p className="text-text-secondary text-sm mt-1">
            Bir emoji girin (örn: 🍽️, 🍕, 🥗, 🍰)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="bg-soft-gray border-warm-beige text-text-primary hover:bg-warm-beige hover:text-text-primary text-sm sm:text-base py-2 sm:py-3"
          >
            İptal
          </Button>
          <Button
            type="submit"
            className="bg-sage hover:bg-sage/90 text-white text-sm sm:text-base py-2 sm:py-3"
          >
            {isEditing ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
