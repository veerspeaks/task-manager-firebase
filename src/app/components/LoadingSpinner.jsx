'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center p-4"
    >
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFB200]"></div>
    </motion.div>
  );
} 