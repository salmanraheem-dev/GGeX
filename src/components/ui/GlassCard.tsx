import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hoverEffect = true, ...props }) => (
  <motion.div
    whileHover={hoverEffect ? { scale: 1.02, translateY: -5 } : undefined}
    className={cn(
      "relative overflow-hidden rounded-[24px] border border-white/20 shadow-2xl shadow-black/10",
      "bg-white/10 dark:bg-black/20 backdrop-blur-3xl",
      "hover:shadow-accent-primary/20 transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);
