import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className,
  ...props 
}) => {
  const baseStyles = "font-bold rounded-xl transition-all flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-premium text-white hover:shadow-[0_0_20px_rgba(0,209,255,0.4)]",
    secondary: "bg-white text-background-dark hover:bg-gray-100",
    outline: "bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 text-white",
    ghost: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
