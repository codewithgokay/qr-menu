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
  isLoading?: boolean;
}

export function MenuItemForm({
  item,
  categories,
  onSave,
  onCancel,
  isEditing = false,
  isLoading = false
}: MenuItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [imagePublicId, setImagePublicId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        image: item.image || ''
      });
      setImagePreview(item.image || '');
      setImagePublicId((item as MenuItem & { imagePublicId?: string }).imagePublicId || '');
    }
  }, [item]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir resim dosyası seçin');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('Dosya boyutu 10MB\'dan küçük olmalıdır');
      return;
    }

    setIsUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'qr-menu/menu-items');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.url) {
        setImagePreview(result.url);
        setImagePublicId(result.publicId || '');
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      alert(`Resim yüklenirken hata oluştu: ${errorMessage}`);

      // Reset file input
      e.target.value = '';
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const itemData: Omit<MenuItem, 'id'> & { imagePublicId?: string } = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: imagePreview,
      imagePublicId: imagePublicId
    };

    onSave(itemData);
  };

  return (
    <Card className="p-4 sm:p-6 bg-white shadow-soft border border-warm-beige">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary font-heading">
          {isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Kategori *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 rounded-lg bg-soft-gray border border-warm-beige text-text-primary focus:border-sage focus:ring-sage text-sm sm:text-base"
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
              disabled={isUploading}
              className="w-full p-3 rounded-lg bg-soft-gray border border-warm-beige text-text-primary file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-sage file:text-white hover:file:bg-sage/90 text-sm sm:text-base disabled:opacity-50"
            />
            {isUploading && (
              <p className="text-sm text-sage mt-1">Resim yükleniyor...</p>
            )}
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
            />
          </div>
        )}

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
            disabled={isLoading}
            className="bg-sage hover:bg-sage/90 text-white text-sm sm:text-base py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isEditing ? 'Güncelleniyor...' : 'Kaydediliyor...'}</span>
              </div>
            ) : (
              isEditing ? 'Güncelle' : 'Kaydet'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
