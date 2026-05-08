import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-background-dark py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
           <h2 className="text-2xl font-sora font-bold tracking-tight mb-4">
            GLOBAL<span className="text-gradient-premium">GAINEX</span>
          </h2>
          <p className="text-gray-400 font-inter max-w-sm">
            Elevate your wealth and lifestyle. A premium ecosystem combining high-end marketplace, elite membership, and a transparent reward system.
          </p>
        </div>
        <div>
          <h3 className="font-sora font-semibold text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400 font-inter">
            <li><Link to="/marketplace" className="hover:text-accent-primary transition-colors">Marketplace</Link></li>
            <li><Link to="/membership" className="hover:text-accent-primary transition-colors">Membership</Link></li>
            <li><Link to="/rewards" className="hover:text-accent-primary transition-colors">Reward Events</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-sora font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400 font-inter">
            <li><Link to="/terms" className="hover:text-accent-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-accent-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-500 font-inter text-sm">
        &copy; {new Date().getFullYear()} GlobalGainEx. All rights reserved.
      </div>
    </footer>
  );
};
