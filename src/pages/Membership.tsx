import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export const Membership = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
         <h1 className="text-4xl md:text-5xl font-sora font-bold mb-4">Elite <span className="text-gradient-gold">Membership</span></h1>
         <p className="text-gray-400 font-inter max-w-2xl mx-auto">Upgrade your ecosystem experience. Unlock exclusive deals, reward multipliers, and priority VIP access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
         <PricingCard 
           title="Basic" 
           price="Free" 
           features={['Standard Marketplace Access', '1x Reward Multiplier', '1% Cashback', 'No Event Entry']} 
           color="silver"
         />
         <PricingCard 
           title="Premium" 
           price="$29/mo" 
           features={['Exclusive Marketplace Deals', '1.5x Reward Multiplier', '5% Cashback', 'Standard Event Entry']} 
           color="gold"
           popular
         />
         <PricingCard 
           title="Elite" 
           price="$99/mo" 
           features={['All Premium Benefits', '3.0x Reward Multiplier', '12% Cashback', 'VIP Priority Event Entry', 'Dedicated Agent Support']} 
           color="diamond"
         />
      </div>
    </div>
  );
};

const PricingCard = ({ title, price, features, color, popular }: { title: string, price: string, features: string[], color: string, popular?: boolean }) => {
  const gradientClass = {
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-accent-gold to-accent-goldLight',
    diamond: 'from-accent-primary to-accent-secondary'
  }[color];

  return (
    <GlassCard className={`p-8 relative ${popular ? 'border-accent-gold/50 scale-105 shadow-[0_0_30px_rgba(255,215,0,0.15)] z-10' : ''}`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      <h3 className={`text-2xl font-sora font-bold mb-2 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
           <li key={i} className="flex items-start gap-3">
             <div className={`mt-0.5 rounded-full p-1 bg-gradient-to-r ${gradientClass}`}>
               <Check size={12} className="text-black" />
             </div>
             <span className="text-gray-300 text-sm">{feature}</span>
           </li>
        ))}
      </ul>
      <Button 
        variant={popular ? 'primary' : 'outline'} 
        className={`w-full ${popular ? 'bg-gradient-gold text-black hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]' : ''}`}
      >
        Choose Plan
      </Button>
    </GlassCard>
  );
};
