import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, LogOut, Menu, Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const Navbar = () => {
  const { user, setUser, theme, setTheme } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-2xl bg-white/10 dark:bg-black/20 border-b border-black/10 dark:border-white/10 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-sora font-bold tracking-tight">
          GLOBAL<span className="text-gradient-premium">GAINEX</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/marketplace" className="text-sm font-inter text-gray-300 hover:text-white transition-colors">Marketplace</Link>
          <Link to="/membership" className="text-sm font-inter text-gray-300 hover:text-white transition-colors">Membership</Link>
          <Link to="/rewards" className="text-sm font-inter text-gray-300 hover:text-white transition-colors">Rewards</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex" aria-label="Cart">
            <ShoppingCart size={20} />
          </Button>
          
          {user ? (
            <div className="flex items-center gap-4">
               <Link to="/dashboard">
                 <Button variant="outline" size="sm">
                   <UserIcon size={16} /> Dashboard
                 </Button>
               </Link>
               <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                 <LogOut size={16} />
               </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                 <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link to="/signup">
                 <Button variant="primary" size="sm" className="hidden md:flex">Sign Up</Button>
              </Link>
            </div>
          )}
          
          <Button variant="ghost" size="sm" className="md:hidden">
             <Menu size={24} />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
