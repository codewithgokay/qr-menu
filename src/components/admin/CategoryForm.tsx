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
    <Card className="p-6 bg-white shadow-soft border border-warm-beige">
      <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
        {isEditing ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="bg-soft-gray border-warm-beige text-text-primary hover:bg-warm-beige hover:text-text-primary"
          >
            İptal
          </Button>
          <Button
            type="submit"
            className="bg-sage hover:bg-sage/90 text-white"
          >
            {isEditing ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
