import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { generateCustomId } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'user' | 'agent' | 'promoter'>('user');
  const [referredBy, setReferredBy] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const customId = generateCustomId(role as any);
      let status = 'active';
      if (role === 'agent' || role === 'promoter') {
        status = 'pending';
      }
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        customId,
        role,
        status,
        email,
        name,
        phone,
        referredBy: referredBy || null,
        walletBalance: 0,
        createdAt: serverTimestamp(),
        membership: 'basic',
        referralCount: 0,
        metrics: {
          totalSpent: 0,
          lastRewardEventStatus: 'pending'
        }
      });
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create account');
      handleFirestoreError(err, OperationType.CREATE, 'users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[100px]" />
      </div>
      
      <GlassCard className="w-full max-w-md p-8 relative z-10" hoverEffect={false}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-sora font-bold tracking-tight mb-2">Create Account</h2>
          <p className="text-gray-400 font-inter text-sm">Join the premium ecosystem</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-black/10 dark:border-white/10 text-surface-dark dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-black/10 dark:border-white/10 text-surface-dark dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number (Optional)</label>
            <input 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-black/10 dark:border-white/10 text-surface-dark dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
              placeholder="+1 234 567 890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-black/10 dark:border-white/10 text-surface-dark dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-300 mb-1">Select Role</label>
               <select 
                 value={role}
                 onChange={(e) => setRole(e.target.value as any)}
                 className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-black/10 dark:border-white/10 text-surface-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
               >
                 <option value="user">User</option>
                 <option value="promoter">Promoter</option>
                 <option value="agent">Agent</option>
                 <option value="admin">Admin</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-300 mb-1">Referral Code</label>
               <input 
                 type="text"
                 value={referredBy}
                 onChange={(e) => setReferredBy(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-black/10 dark:border-white/10 text-surface-dark dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                 placeholder="Optional"
               />
             </div>
          </div>
          
          <Button type="submit" variant="primary" className="w-full mt-6" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400 font-inter">
          Already have an account? <Link to="/login" className="text-accent-primary hover:underline font-medium">Log in</Link>
        </div>
      </GlassCard>
    </div>
  );
};
