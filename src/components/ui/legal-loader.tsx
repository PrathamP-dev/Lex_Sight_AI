
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LegalLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LegalLoader({ className, size = 'md' }: LegalLoaderProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Gavel striking animation */}
      <motion.svg
        viewBox="0 0 100 100"
        className={cn('absolute', sizeClasses[size])}
        animate={{
          rotate: [0, -30, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: '75% 75%',
        }}
      >
        {/* Gavel handle */}
        <rect
          x="40"
          y="15"
          width="8"
          height="50"
          fill="currentColor"
          className="text-primary"
          rx="2"
        />
        
        {/* Gavel head */}
        <rect
          x="30"
          y="8"
          width="28"
          height="12"
          fill="currentColor"
          className="text-primary"
          rx="2"
        />
      </motion.svg>

      {/* Sound block base */}
      <svg
        viewBox="0 0 100 100"
        className={cn('absolute', sizeClasses[size])}
      >
        <rect
          x="15"
          y="75"
          width="35"
          height="12"
          fill="currentColor"
          className="text-accent"
          rx="2"
        />
      </svg>

      {/* Impact waves */}
      <motion.div
        className="absolute"
        style={{
          left: '20%',
          top: '65%',
        }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/40"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          left: '20%',
          top: '65%',
        }}
        animate={{
          scale: [0, 2, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.15,
        }}
      >
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export function LegalLoaderFullScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <LegalLoader size="lg" />
        <motion.p
          className="text-sm font-medium text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
