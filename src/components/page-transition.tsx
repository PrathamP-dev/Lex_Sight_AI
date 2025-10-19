'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LegalLoader } from '@/components/ui/legal-loader';

// Optimized spring physics for faster, smooth animations
const springTransition = {
  type: "spring",
  damping: 30,
  stiffness: 300,
  mass: 0.5,
};

const pageVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.98,
    y: 10,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      ...springTransition,
      staggerChildren: 0.03,
      delayChildren: 0.01,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 1.02,
    y: -8,
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 350,
      mass: 0.4,
      duration: 0.1
    }
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <LegalLoader size="lg" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            // GPU acceleration for smoother performance
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
