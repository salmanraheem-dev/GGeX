import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, Sparkles, TrendingUp, Users } from 'lucide-react';

export const Landing = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-sm font-medium mb-6 inline-flex items-center gap-2">
              <Sparkles size={14} /> The Future of Digital Commerce
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sora font-bold mb-6 tracking-tight leading-tight">
              Elevate Your <span className="bg-gradient-premium bg-clip-text text-transparent">Wealth</span> & Lifestyle.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 font-inter max-w-2xl mx-auto">
              A premium ecosystem combining a high-end marketplace, elite membership, and a highly transparent reward system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                 <Button variant="primary" size="lg" className="w-full sm:w-auto">
                   Join GlobalGainEx
                 </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements (Simulated Parallax) */}
        <motion.div style={{ y: y1 }} className="absolute top-1/4 -left-20 w-64 h-64 bg-accent-primary/20 rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[120px]" />
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-sora font-bold mb-4">Ecosystem Built on Trust</h2>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">Experience seamless shopping, exclusive membership benefits, and rewarding networking programs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-premium flex items-center justify-center mb-6">
                 <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-sora font-bold mb-4">Premium Marketplace</h3>
              <p className="text-gray-400 font-inter">Curated selection of high-end furniture, gadgets & lifestyle products with verifiable reviews and fast shipping.</p>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6">
                 <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-sora font-bold mb-4">Transparent Rewards</h3>
              <p className="text-gray-400 font-inter">Participate in monthly reward events. Real-time eligibility tracking based on accurate user activity and purchases.</p>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-accent-primary border border-accent-primary/20 flex items-center justify-center mb-6">
                 <Users size={28} />
              </div>
              <h3 className="text-2xl font-sora font-bold mb-4">Elite Referrals</h3>
              <p className="text-gray-400 font-inter">Earn progressively through direct and indirect referrals. Track your network in real-time with visual tree maps.</p>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};
