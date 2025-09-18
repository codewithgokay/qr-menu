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
  placeholder = "Search menu items..." 
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-sm sm:max-w-md mx-auto"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 h-10 sm:h-12 text-sm sm:text-base"
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
