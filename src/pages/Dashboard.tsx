import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Navigate } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Users, Wallet, Trophy, Link as LinkIcon, Activity, Phone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';

export const Dashboard = () => {
  const { user, isInitialLoading } = useAppStore();

  if (isInitialLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.status === 'pending') {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <GlassCard className="max-w-md mx-auto p-8">
          <ShieldCheck size={48} className="mx-auto mb-4 text-accent-gold" />
          <h2 className="text-2xl font-bold font-sora text-white mb-2">Account Pending</h2>
          <p className="text-gray-400 font-inter text-sm mb-6">
            Your {user.role} account is currently under review by our admin team. You will have full access once approved.
          </p>
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>Refresh Status</Button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h1 className="text-4xl font-sora font-bold mb-2 text-surface-dark dark:text-white">Welcome, {user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 font-inter uppercase text-sm font-bold tracking-wider">
            {user.role} Dashboard &nbsp;•&nbsp; <span className="text-accent-primary">{user.customId}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Button variant="outline">Settings</Button>
          {(user.role === 'promoter' || user.role === 'user') && (
             <Button variant="primary" className="items-center gap-2">
                <LinkIcon size={16} /> Copy Referral Link
             </Button>
          )}
        </div>
      </div>

      {user.role === 'user' && <UserDashboard user={user} />}
      {user.role === 'promoter' && <PromoterDashboard user={user} />}
      {user.role === 'agent' && <AgentDashboard user={user} />}
      {user.role === 'admin' && <Navigate to="/admin-ggex" replace />}
    </div>
  );
};

const UserDashboard = ({ user }: { user: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <GlassCard className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-sora font-bold text-surface-dark dark:text-white">Wallet Balance</h3>
        <div className="p-3 bg-accent-primary/10 rounded-xl text-accent-primary">
          <Wallet size={24} />
        </div>
      </div>
      <p className="text-4xl font-bold font-inter text-surface-dark dark:text-white">${user.walletBalance?.toFixed(2) || '0.00'}</p>
      <div className="mt-6 flex gap-3">
         <Button variant="primary" size="sm" className="flex-1">Deposit</Button>
         <Button variant="outline" size="sm" className="flex-1">Withdraw</Button>
      </div>
    </GlassCard>

    <GlassCard className="p-8 md:col-span-2">
       <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-sora font-bold text-surface-dark dark:text-white">My Agent & Coupons</h3>
        <Trophy className="text-accent-gold" size={24} />
      </div>
      <div className="space-y-4">
         <div className="flex justify-between items-center p-4 bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded-xl">
            <div>
               <p className="font-semibold text-surface-dark dark:text-white">Assigned Agent</p>
               <p className="text-sm text-gray-500 dark:text-gray-400">{user.agentId ? `Agent ID: ${user.agentId}` : 'No agent assigned yet'}</p>
            </div>
            {user.agentId && <span className="text-accent-primary font-bold"><Phone size={20} /></span>}
         </div>
         <div className="flex justify-between items-center p-4 bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded-xl">
            <div>
               <p className="font-semibold text-surface-dark dark:text-white">Active Coupons</p>
               <p className="text-sm text-gray-500 dark:text-gray-400">Welcome Bonus, 10% Off Electronics</p>
            </div>
            <span className="text-accent-gold font-bold">2 Available</span>
         </div>
      </div>
    </GlassCard>
  </div>
);

const PromoterDashboard = ({ user }: { user: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     <GlassCard className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-sora font-bold text-surface-dark dark:text-white">Wallet & Earnings</h3>
        <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
          <Wallet size={24} />
        </div>
      </div>
      <p className="text-4xl font-bold font-inter text-surface-dark dark:text-white">${user.walletBalance?.toFixed(2) || '0.00'}</p>
      <div className="mt-6 flex gap-3">
         <Button variant="primary" size="sm" className="flex-1">Deposit</Button>
         <Button variant="outline" size="sm" className="flex-1">Withdraw</Button>
      </div>
    </GlassCard>
    
    <GlassCard className="p-8 md:col-span-2">
       <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-sora font-bold text-surface-dark dark:text-white">Income Breakdown</h3>
        <Activity className="text-blue-400" size={24} />
      </div>
      <div className="space-y-4">
         <div className="flex justify-between items-center p-4 bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded-xl">
            <div>
               <p className="font-semibold text-surface-dark dark:text-white">Level Incomes</p>
               <p className="text-sm text-gray-500">From Tier 1 & 2 network</p>
            </div>
            <span className="text-blue-500 font-bold">+$320.00</span>
         </div>
         <div className="flex justify-between items-center p-4 bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded-xl">
            <div>
               <p className="font-semibold text-surface-dark dark:text-white">Direct Referral Incomes</p>
               <p className="text-sm text-gray-500">From personal links</p>
            </div>
            <span className="text-green-500 font-bold">+$150.00</span>
         </div>
      </div>
    </GlassCard>
  </div>
);

const AgentDashboard = ({ user }: { user: any }) => {
  const [assignedUsers, setAssignedUsers] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchAssigned = async () => {
      try {
        const q = query(collection(db, 'users'), where('agentId', '==', user.uid));
        const snap = await getDocs(q);
        setAssignedUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, 'users');
      }
    };
    fetchAssigned();
  }, [user.uid]);

  return (
    <div className="grid grid-cols-1 gap-8">
      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-sora font-bold text-surface-dark dark:text-white">Assigned Users</h3>
            <p className="text-sm text-gray-500">Users under your management</p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
             <Users size={24} />
          </div>
        </div>
        
        {assignedUsers.length === 0 ? (
          <p className="text-gray-500 italic p-4 bg-surface-light dark:bg-surface-dark rounded-xl text-center border border-black/5 dark:border-white/5">
            No users assigned by admin yet.
          </p>
        ) : (
          <div className="space-y-4">
            {assignedUsers.map(u => (
               <div key={u.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded-xl gap-4">
                  <div>
                     <p className="font-semibold text-surface-dark dark:text-white flex items-center gap-2">
                       {u.name} <span className="text-xs text-gray-500">({u.customId})</span>
                     </p>
                     <p className="text-sm font-mono text-gray-500 flex items-center gap-1 mt-1">
                       <Phone size={12} /> {u.phone || 'No phone'}
                     </p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="text-right">
                       <p className="text-xs text-gray-500 uppercase font-bold">Paid Amount</p>
                       <p className={`font-bold ${u.metrics?.totalSpent > 0 ? 'text-green-500' : 'text-yellow-500'}`}>
                         ${u.metrics?.totalSpent?.toFixed(2) || '0.00'}
                       </p>
                    </div>
                    {(!u.metrics?.totalSpent || u.metrics.totalSpent === 0) && (
                      <Button variant="outline" size="sm" className="text-accent-primary border-accent-primary/20 hover:bg-accent-primary/10">
                        Request Payment
                      </Button>
                    )}
                  </div>
               </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};
