import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Aero Desk Chair', category: 'Furniture', price: 499, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80&fm=png&bg=transparent' },
  { id: 2, name: 'Quantum Laptop Pro', category: 'Gadgets', price: 2199, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80&fm=png&bg=transparent' },
  { id: 3, name: 'Zenith Smart Watch', category: 'Gadgets', price: 349, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80&fm=png&bg=transparent' },
  { id: 4, name: 'Lumina Study Lamp', category: 'Furniture', price: 89, image: 'https://images.unsplash.com/photo-1534067783965-c340a6311de1?w=400&q=80&fm=png&bg=transparent' },
  { id: 5, name: 'Elite Gym Bag', category: 'Lifestyle', price: 120, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80&fm=png&bg=transparent' },
  { id: 6, name: 'Acoustic Pods', category: 'Gadgets', price: 199, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80&fm=png&bg=transparent' },
];

export const Marketplace = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Furniture', 'Gadgets', 'Lifestyle'];

  const filteredProducts = filter === 'All' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
         <h1 className="text-4xl md:text-5xl font-sora font-bold mb-4">Premium <span className="text-gradient-premium">Marketplace</span></h1>
         <p className="text-gray-400 font-inter max-w-2xl mx-auto">Discover exclusive products carefully curated for our ecosystem members. Earn rewards on every purchase.</p>
      </div>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map(cat => (
           <button
             key={cat}
             onClick={() => setFilter(cat)}
             className={`px-6 py-2 rounded-full font-medium transition-all ${filter === cat ? 'bg-gradient-premium text-white' : 'bg-surface-dark border border-white/10 text-gray-300 hover:bg-white/5'}`}
           >
             {cat}
           </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  return (
    <GlassCard className="group p-6 flex flex-col h-full">
      <div className="relative h-48 w-full flex items-center justify-center mb-6 overflow-hidden rounded-xl bg-surface-dark">
        <motion.img 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ duration: 0.3 }}
          src={product.image} 
          alt={product.name}
          className="max-h-full max-w-full object-cover mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          <h3 className="text-xl font-sora font-semibold text-white">{product.name}</h3>
          <p className="text-gray-400 text-sm">{product.category}</p>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <span className="text-2xl font-bold tracking-tight text-accent-primary">${product.price}</span>
          <button className="p-3 bg-white/5 hover:bg-accent-primary hover:text-white text-gray-300 rounded-lg transition-colors shadow-lg">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
