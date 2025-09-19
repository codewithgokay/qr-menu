'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ 
  placeholder = "Menü öğelerini ara..." 
}: SearchBarProps) {
  const { filters, setSearchQuery } = useMenu();
  const [query, setQuery] = useState(filters.search);

  // Update query when filters change
  useEffect(() => {
    setQuery(filters.search);
  }, [filters.search]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setSearchQuery(value);
  }, [setSearchQuery]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <div className="px-6 py-6 bg-gradient-to-b from-primary-cream to-soft-gray">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-12 bg-white border-0 shadow-soft rounded-xl focus:shadow-elevated transition-all duration-200 text-base placeholder:text-text-secondary"
          />
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-warm-beige/50 rounded-full"
              >
                <X className="h-4 w-4 text-text-secondary" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
