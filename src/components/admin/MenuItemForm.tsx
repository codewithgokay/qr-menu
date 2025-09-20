'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MenuItem, MenuCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface MenuItemFormProps {
  item?: MenuItem | null;
  categories: MenuCategory[];
  onSave: (item: Omit<MenuItem, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function MenuItemForm({ 
  item, 
  categories, 
  onSave, 
  onCancel, 
  isEditing = false 
}: MenuItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    allergens: '',
    calories: '',
    prepTime: '',
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    isPopular: false,
    isGlutenFree: false,
    isDairyFree: false
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        image: item.image || '',
        allergens: item.allergens?.join(', ') || '',
        calories: item.calories?.toString() || '',
        prepTime: item.prepTime?.toString() || '',
        isVegetarian: item.isVegetarian || false,
        isVegan: item.isVegan || false,
        isSpicy: item.isSpicy || false,
        isPopular: item.isPopular || false,
        isGlutenFree: item.isGlutenFree || false,
        isDairyFree: item.isDairyFree || false
      });
      setImagePreview(item.image || '');
    }
  }, [item]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemData: Omit<MenuItem, 'id'> = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: imagePreview,
      allergens: formData.allergens ? formData.allergens.split(',').map(a => a.trim()).filter(a => a.length > 0) : [],
      calories: formData.calories ? parseInt(formData.calories) : undefined,
      prepTime: formData.prepTime ? parseInt(formData.prepTime) : undefined,
      isVegetarian: formData.isVegetarian,
      isVegan: formData.isVegan,
      isSpicy: formData.isSpicy,
      isPopular: formData.isPopular,
      isGlutenFree: formData.isGlutenFree,
      isDairyFree: formData.isDairyFree
    };

    onSave(itemData);
  };

  return (
    <Card className="p-6 bg-white shadow-soft border border-warm-beige">
      <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
        {isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Ürün Adı *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ürün adını girin"
              className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Fiyat (₺) *
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Açıklama *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Ürün açıklamasını girin"
            className="w-full p-3 rounded-lg bg-soft-gray border border-warm-beige text-text-primary placeholder-text-secondary resize-none focus:border-sage focus:ring-sage"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Kategori *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 rounded-lg bg-soft-gray border border-warm-beige text-text-primary focus:border-sage focus:ring-sage"
              required
            >
              <option value="">Kategori seçin</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Resim
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 rounded-lg bg-soft-gray border border-warm-beige text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage file:text-white hover:file:bg-sage/90"
            />
          </div>
        </div>

        {imagePreview && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Resim Önizleme
            </label>
            <Image
              src={imagePreview}
              alt="Preview"
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded-lg border border-warm-beige"
              style={{
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Alerjenler
            </label>
            <Input
              value={formData.allergens}
              onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
              placeholder="süt, gluten, fındık"
              className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Kalori
            </label>
            <Input
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              placeholder="250"
              className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hazırlık Süresi (dakika)
            </label>
            <Input
              type="number"
              value={formData.prepTime}
              onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
              placeholder="15"
              className="bg-soft-gray border-warm-beige text-text-primary placeholder-text-secondary focus:border-sage focus:ring-sage"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isVegetarian}
              onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
              className="rounded border-warm-beige bg-soft-gray text-sage focus:ring-sage"
            />
            <span className="text-text-primary">🌱 Vejetaryen</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isVegan}
              onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
              className="rounded border-warm-beige bg-soft-gray text-sage focus:ring-sage"
            />
            <span className="text-text-primary">🌿 Vegan</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isSpicy}
              onChange={(e) => setFormData({ ...formData, isSpicy: e.target.checked })}
              className="rounded border-warm-beige bg-soft-gray text-sage focus:ring-sage"
            />
            <span className="text-text-primary">🌶️ Acılı</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
              className="rounded border-warm-beige bg-soft-gray text-sage focus:ring-sage"
            />
            <span className="text-text-primary">⭐ Popüler</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isGlutenFree}
              onChange={(e) => setFormData({ ...formData, isGlutenFree: e.target.checked })}
              className="rounded border-warm-beige bg-soft-gray text-sage focus:ring-sage"
            />
            <span className="text-text-primary">🌾 Glutensiz</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isDairyFree}
              onChange={(e) => setFormData({ ...formData, isDairyFree: e.target.checked })}
              className="rounded border-warm-beige bg-soft-gray text-sage focus:ring-sage"
            />
            <span className="text-text-primary">🥛 Süt içermez</span>
          </label>
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
