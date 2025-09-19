'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="flex items-center justify-center"
      >
        <Loader2 className="h-10 w-10 text-sage" />
      </motion.div>
    </div>
  );
}
