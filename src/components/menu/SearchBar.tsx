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
    <div className="px-4 py-4 pt-6 bg-republic-cream">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full mx-auto"
      >
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-republic-gold h-4 w-4 transition-colors group-focus-within:text-republic-green" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-11 h-11 bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-1 focus:ring-republic-gold focus:border-republic-gold transition-all duration-200 text-sm placeholder:text-gray-400 w-full"
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100 rounded-full"
              >
                <X className="h-3 w-3 text-gray-400" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
