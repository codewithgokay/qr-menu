'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { MenuItem, MenuCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface MenuItemListProps {
  menuItems: MenuItem[];
  categories: MenuCategory[];
  onEdit: (item: MenuItem) => void;
  onDelete: (itemId: string) => void;
  onReorder?: (items: MenuItem[]) => void;
  isManageMode?: boolean;
}

// Sortable Menu Item Component
function SortableMenuItem({ 
  item, 
  categories, 
  onEdit, 
  onDelete, 
  deleteConfirm, 
  setDeleteConfirm,
  isManageMode = false,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}: {
  item: MenuItem;
  categories: MenuCategory[];
  onEdit: (item: MenuItem) => void;
  onDelete: (itemId: string) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
  isManageMode?: boolean;
  onMoveUp?: (item: MenuItem) => void;
  onMoveDown?: (item: MenuItem) => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  const handleDelete = (itemId: string) => {
    if (deleteConfirm === itemId) {
      onDelete(itemId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(itemId);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style}
      {...(isManageMode ? { ...attributes, ...listeners } : {})}
      className={`p-4 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300 ${
        isManageMode ? 'cursor-grab active:cursor-grabbing touch-manipulation' : ''
      } ${
        isDragging ? 'opacity-50 scale-105 shadow-lg' : isManageMode ? 'hover:scale-105' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Item Image */}
        {item.image && (
          <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-semibold text-text-primary truncate">{item.name}</h3>
            <span className="text-lg font-bold text-sage ml-2">₺{item.price}</span>
          </div>
          
          <p className="text-text-secondary text-sm mb-2 line-clamp-1">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-sage/10 border-sage/30 text-sage text-xs">
              {getCategoryName(item.category)}
            </Badge>
            
            <div className="flex space-x-1">
              {item.isVegetarian && <span className="text-green-600 text-sm" title="Vejetaryen">🌱</span>}
              {item.isVegan && <span className="text-green-600 text-sm" title="Vegan">🌿</span>}
              {item.isSpicy && <span className="text-red-500 text-sm" title="Acılı">🌶️</span>}
              {item.isPopular && <span className="text-yellow-500 text-sm" title="Popüler">⭐</span>}
              {item.isGlutenFree && <span className="text-blue-500 text-sm" title="Glutensiz">🌾</span>}
              {item.isDairyFree && <span className="text-blue-500 text-sm" title="Süt içermez">🥛</span>}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 flex-shrink-0">
          {isManageMode ? (
            <div className="flex flex-col space-y-1 sm:hidden">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveUp?.(item);
                }}
                disabled={!canMoveUp}
                size="sm"
                className="bg-sage/10 hover:bg-sage/20 text-sage text-xs px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↑
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveDown?.(item);
                }}
                disabled={!canMoveDown}
                size="sm"
                className="bg-sage/10 hover:bg-sage/20 text-sage text-xs px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↓
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                size="sm"
                className="bg-sage hover:bg-sage/90 text-white text-xs px-3 py-1"
              >
                Düzenle
              </Button>
              
              {deleteConfirm === item.id ? (
                <div className="flex space-x-1">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    size="sm"
                    className="bg-destructive hover:bg-destructive/90 text-white text-xs px-2 py-1"
                  >
                    Sil
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelDelete();
                    }}
                    size="sm"
                    variant="outline"
                    className="bg-soft-gray border-warm-beige text-text-primary hover:bg-warm-beige text-xs px-2 py-1"
                  >
                    İptal
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  size="sm"
                  variant="outline"
                  className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 text-xs px-3 py-1"
                >
                  Sil
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

// Category Section Component
function CategorySection({ 
  category, 
  items, 
  categories, 
  onEdit, 
  onDelete, 
  onReorder, 
  deleteConfirm, 
  setDeleteConfirm, 
  isManageMode 
}: {
  category: MenuCategory;
  items: MenuItem[];
  categories: MenuCategory[];
  onEdit: (item: MenuItem) => void;
  onDelete: (itemId: string) => void;
  onReorder?: (items: MenuItem[]) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
  isManageMode: boolean;
}) {
  const handleMoveUp = (item: MenuItem) => {
    const currentIndex = items.findIndex(i => i.id === item.id);
    if (currentIndex > 0) {
      const newItems = [...items];
      [newItems[currentIndex - 1], newItems[currentIndex]] = [newItems[currentIndex], newItems[currentIndex - 1]];
      onReorder?.(newItems);
    }
  };

  const handleMoveDown = (item: MenuItem) => {
    const currentIndex = items.findIndex(i => i.id === item.id);
    if (currentIndex < items.length - 1) {
      const newItems = [...items];
      [newItems[currentIndex], newItems[currentIndex + 1]] = [newItems[currentIndex + 1], newItems[currentIndex]];
      onReorder?.(newItems);
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && onReorder) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);

      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      onReorder(reorderedItems);
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Header */}
      <div className="flex items-center space-x-3 pb-2 border-b border-warm-beige/30">
        <div className="w-8 h-8 bg-sage/10 rounded-lg flex items-center justify-center">
          <span className="text-lg">{category.icon}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary font-heading">{category.name}</h3>
          <p className="text-text-secondary text-sm">{items.length} ürün</p>
        </div>
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <Card className="p-6 bg-white shadow-soft border border-warm-beige text-center">
          <p className="text-text-secondary">Bu kategoride henüz ürün yok</p>
        </Card>
      ) : isManageMode ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
            <div className="space-y-3">
              {items.map((item, index) => (
                <SortableMenuItem
                  key={item.id}
                  item={item}
                  categories={categories}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  deleteConfirm={deleteConfirm}
                  setDeleteConfirm={setDeleteConfirm}
                  isManageMode={isManageMode}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  canMoveUp={index > 0}
                  canMoveDown={index < items.length - 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <SortableMenuItem
              key={item.id}
              item={item}
              categories={categories}
              onEdit={onEdit}
              onDelete={onDelete}
              deleteConfirm={deleteConfirm}
              setDeleteConfirm={setDeleteConfirm}
              isManageMode={isManageMode}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              canMoveUp={index > 0}
              canMoveDown={index < items.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MenuItemList({ 
  menuItems, 
  categories, 
  onEdit, 
  onDelete, 
  onReorder,
  isManageMode = false 
}: MenuItemListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Group items by category and sort categories by order
  const groupedItems = useMemo(() => {
    const grouped: { [key: string]: MenuItem[] } = {};
    
    // Group items by category
    menuItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    // Sort items within each category by order
    Object.keys(grouped).forEach(categoryId => {
      grouped[categoryId] = grouped[categoryId].sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    return grouped;
  }, [menuItems]);

  // Sort categories by order and filter out empty ones
  const sortedCategories = useMemo(() => {
    return categories
      .sort((a, b) => a.order - b.order)
      .filter(category => groupedItems[category.id] && groupedItems[category.id].length > 0);
  }, [categories, groupedItems]);

  const handleCategoryReorder = (categoryId: string, reorderedItems: MenuItem[]) => {
    if (onReorder) {
      // Update the order field for the reordered items
      const updatedReorderedItems = reorderedItems.map((item, index) => ({
        ...item,
        order: index + 1 // Update order field based on new position
      }));
      
      // Get all items from other categories
      const otherItems = Object.entries(groupedItems)
        .filter(([id]) => id !== categoryId)
        .flatMap(([, items]) => items);

      // Combine with reordered items from this category
      const allItems = [...otherItems, ...updatedReorderedItems];
      
      onReorder(allItems);
    }
  };

  if (menuItems.length === 0) {
    return (
      <Card className="p-8 bg-white shadow-soft border border-warm-beige text-center">
        <p className="text-text-secondary text-lg">Henüz ürün eklenmemiş</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {sortedCategories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          items={groupedItems[category.id] || []}
          categories={categories}
          onEdit={onEdit}
          onDelete={onDelete}
          onReorder={(items) => handleCategoryReorder(category.id, items)}
          deleteConfirm={deleteConfirm}
          setDeleteConfirm={setDeleteConfirm}
          isManageMode={isManageMode}
        />
      ))}
    </div>
  );
}