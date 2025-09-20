'use client';

import { useState } from 'react';
import { MenuCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

interface CategoryListProps {
  categories: MenuCategory[];
  onEdit: (category: MenuCategory) => void;
  onDelete: (categoryId: string) => void;
  onReorder: (categories: MenuCategory[]) => void;
  isManageMode?: boolean;
}

// Sortable Category Item Component
function SortableCategoryItem({ 
  category, 
  onEdit, 
  onDelete, 
  deleteConfirm, 
  setDeleteConfirm, 
  cancelDelete,
  isManageMode,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}: {
  category: MenuCategory;
  onEdit: (category: MenuCategory) => void;
  onDelete: (categoryId: string) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
  cancelDelete: () => void;
  isManageMode: boolean;
  onMoveUp?: (category: MenuCategory) => void;
  onMoveDown?: (category: MenuCategory) => void;
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
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (categoryId: string) => {
    if (deleteConfirm === categoryId) {
      onDelete(categoryId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(categoryId);
    }
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...(isManageMode ? { ...attributes, ...listeners } : {})}
      className={`p-6 bg-white shadow-soft border border-warm-beige hover:shadow-elevated transition-all duration-300 ${
        isManageMode ? 'cursor-grab active:cursor-grabbing touch-manipulation' : ''
      } ${
        isDragging ? 'opacity-50 scale-105 shadow-lg' : isManageMode ? 'hover:scale-105' : ''
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {category.icon && (
              <span className="text-3xl">{category.icon}</span>
            )}
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{category.name}</h3>
            </div>
          </div>
        </div>
        
        {category.description && (
          <p className="text-text-secondary text-sm line-clamp-2">{category.description}</p>
        )}
        
        <div className="flex space-x-2">
          {isManageMode ? (
            <div className="flex space-x-2 flex-1 lg:hidden">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveUp?.(category);
                }}
                disabled={!canMoveUp}
                size="sm"
                className="bg-terracotta/10 hover:bg-terracotta/20 text-terracotta flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↑
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveDown?.(category);
                }}
                disabled={!canMoveDown}
                size="sm"
                className="bg-terracotta/10 hover:bg-terracotta/20 text-terracotta flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↓
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(category);
                }}
                size="sm"
                className="bg-sage hover:bg-sage/90 text-white flex-1"
              >
                Düzenle
              </Button>
              
              {deleteConfirm === category.id ? (
                <div className="flex space-x-2 flex-1">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(category.id);
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
                    handleDelete(category.id);
                  }}
                  size="sm"
                  variant="outline"
                  className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 flex-1"
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

export function CategoryList({ categories, onEdit, onDelete, onReorder, isManageMode = false }: CategoryListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleMoveUp = (category: MenuCategory) => {
    const currentIndex = categories.findIndex(c => c.id === category.id);
    if (currentIndex > 0) {
      const newCategories = [...categories];
      [newCategories[currentIndex - 1], newCategories[currentIndex]] = [newCategories[currentIndex], newCategories[currentIndex - 1]];
      onReorder(newCategories);
    }
  };

  const handleMoveDown = (category: MenuCategory) => {
    const currentIndex = categories.findIndex(c => c.id === category.id);
    if (currentIndex < categories.length - 1) {
      const newCategories = [...categories];
      [newCategories[currentIndex], newCategories[currentIndex + 1]] = [newCategories[currentIndex + 1], newCategories[currentIndex]];
      onReorder(newCategories);
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

    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex((category) => category.id === active.id);
      const newIndex = categories.findIndex((category) => category.id === over?.id);

      const reorderedCategories = arrayMove(categories, oldIndex, newIndex);
      
      // Update order numbers based on new positions
      const updatedCategories = reorderedCategories.map((category, index) => ({
        ...category,
        order: index + 1
      }));

      onReorder(updatedCategories);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-4">
      {categories.length === 0 ? (
        <Card className="p-8 bg-white shadow-soft border border-warm-beige text-center">
          <p className="text-text-secondary text-lg">Henüz kategori eklenmemiş</p>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categories.map(cat => cat.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <SortableCategoryItem
                  key={category.id}
                  category={category}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  deleteConfirm={deleteConfirm}
                  setDeleteConfirm={setDeleteConfirm}
                  cancelDelete={cancelDelete}
                  isManageMode={isManageMode}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  canMoveUp={index > 0}
                  canMoveDown={index < categories.length - 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
