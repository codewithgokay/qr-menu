'use client';

import { useState } from 'react';
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
  isManageMode = false
}: {
  item: MenuItem;
  categories: MenuCategory[];
  onEdit: (item: MenuItem) => void;
  onDelete: (itemId: string) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
  isManageMode?: boolean;
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
      className={`p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300 ${
        isManageMode ? 'cursor-grab active:cursor-grabbing' : ''
      } ${
        isDragging ? 'opacity-50 scale-105 shadow-lg' : isManageMode ? 'hover:scale-105' : ''
      }`}
    >
      <div className="space-y-4">
        {item.image && (
          <div className="aspect-video overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-text-primary">{item.name}</h3>
            <span className="text-lg font-bold text-sage">₺{item.price}</span>
          </div>
          
          <p className="text-text-secondary text-sm mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="bg-sage/10 border-sage/30 text-sage">
              {getCategoryName(item.category)}
            </Badge>
            
            <div className="flex space-x-1">
              {item.isVegetarian && <span className="text-green-600" title="Vejetaryen">🌱</span>}
              {item.isVegan && <span className="text-green-600" title="Vegan">🌿</span>}
              {item.isSpicy && <span className="text-red-500" title="Acılı">🌶️</span>}
              {item.isPopular && <span className="text-yellow-500" title="Popüler">⭐</span>}
              {item.isGlutenFree && <span className="text-blue-500" title="Glutensiz">🌾</span>}
              {item.isDairyFree && <span className="text-blue-500" title="Süt içermez">🥛</span>}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              size="sm"
              className="bg-sage hover:bg-sage/90 text-white flex-1"
            >
              Düzenle
            </Button>
            
            {deleteConfirm === item.id ? (
              <div className="flex space-x-2 flex-1">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-white"
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
                  className="bg-soft-gray border-warm-beige text-text-primary hover:bg-warm-beige"
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
                className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 flex-1"
              >
                Sil
              </Button>
            )}
          </div>
        </div>
        
      </div>
    </Card>
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && onReorder) {
      const oldIndex = menuItems.findIndex((item) => item.id === active.id);
      const newIndex = menuItems.findIndex((item) => item.id === over?.id);

      const reorderedItems = arrayMove(menuItems, oldIndex, newIndex);
      onReorder(reorderedItems);
    }
  };

  return (
    <div className="space-y-4">
      {menuItems.length === 0 ? (
        <Card className="p-8 bg-white shadow-soft border border-warm-beige text-center">
          <p className="text-text-secondary text-lg">Henüz ürün eklenmemiş</p>
        </Card>
      ) : isManageMode ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={menuItems.map(item => item.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div key={item.id} className="relative">
                  <SortableMenuItem
                    item={item}
                    categories={categories}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    deleteConfirm={deleteConfirm}
                    setDeleteConfirm={setDeleteConfirm}
                    isManageMode={isManageMode}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300">
              <div className="space-y-4">
                {item.image && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">{item.name}</h3>
                    <span className="text-lg font-bold text-sage">₺{item.price}</span>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-sage/10 border-sage/30 text-sage">
                      {categories.find(cat => cat.id === item.category)?.name || item.category}
                    </Badge>
                    
                    <div className="flex space-x-1">
                      {item.isVegetarian && <span className="text-green-600" title="Vejetaryen">🌱</span>}
                      {item.isVegan && <span className="text-green-600" title="Vegan">🌿</span>}
                      {item.isSpicy && <span className="text-red-500" title="Acılı">🌶️</span>}
                      {item.isPopular && <span className="text-yellow-500" title="Popüler">⭐</span>}
                      {item.isGlutenFree && <span className="text-blue-500" title="Glutensiz">🌾</span>}
                      {item.isDairyFree && <span className="text-blue-500" title="Süt içermez">🥛</span>}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => onEdit(item)}
                      size="sm"
                      className="bg-sage hover:bg-sage/90 text-white flex-1"
                    >
                      Düzenle
                    </Button>
                    
                    {deleteConfirm === item.id ? (
                      <div className="flex space-x-2 flex-1">
                        <Button
                          onClick={() => {
                            if (deleteConfirm === item.id) {
                              onDelete(item.id);
                              setDeleteConfirm(null);
                            } else {
                              setDeleteConfirm(item.id);
                            }
                          }}
                          size="sm"
                          className="bg-destructive hover:bg-destructive/90 text-white"
                        >
                          Sil
                        </Button>
                        <Button
                          onClick={() => setDeleteConfirm(null)}
                          size="sm"
                          variant="outline"
                          className="bg-soft-gray border-warm-beige text-text-primary hover:bg-warm-beige"
                        >
                          İptal
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setDeleteConfirm(item.id)}
                        size="sm"
                        variant="outline"
                        className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 flex-1"
                      >
                        Sil
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
