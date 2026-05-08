import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, query, getDocs, updateDoc, doc, where } from 'firebase/firestore';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Check, X, Shield, Users, Wallet, RefreshCw } from 'lucide-react';

export const Admin = () => {
  const { user } = useAppStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'users'));
      const snapshot = await getDocs(q);
      const fetchedUsers = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setUsers(fetchedUsers);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-6 py-12 text-center text-red-500">
        <Shield size={48} className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold font-sora">Access Denied</h2>
        <p className="text-gray-400 font-inter">You do not have permission to view the Admin Dashboard.</p>
      </div>
    );
  }

  const handleApprove = async (userId: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: 'active' });
      fetchUsers();
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${userId}`);
    }
  };

  const handleReject = async (userId: string) => {
    // In real app, might delete or set status to rejected
    try {
      await updateDoc(doc(db, 'users', userId), { status: 'rejected' });
      fetchUsers();
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${userId}`);
    }
  };

  const pendingRequests = users.filter(u => u.status === 'pending');
  const activeAgentsPromoters = users.filter(u => u.status === 'active' && (u.role === 'agent' || u.role === 'promoter'));
  const normalUsers = users.filter(u => u.role === 'user');

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <div className="flex justify-between items-center bg-surface-dark p-6 rounded-2xl border border-white/5">
        <div>
          <h1 className="text-3xl font-sora font-bold text-white flex items-center gap-3">
            <Shield className="text-accent-primary" /> GlobalGainEx Admin
          </h1>
          <p className="text-gray-400 font-inter text-sm mt-1">Manage Users, Agents, and Promoters</p>
        </div>
        <Button variant="outline" onClick={fetchUsers} disabled={loading}>
           <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold">Total Users</h3>
            <Users className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{normalUsers.length}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold">Agents & Promoters</h3>
            <Shield className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">{activeAgentsPromoters.length}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold">Pending Approvals</h3>
            <Wallet className="text-accent-gold" />
          </div>
          <p className="text-3xl font-bold text-white">{pendingRequests.length}</p>
        </GlassCard>
      </div>

      {pendingRequests.length > 0 && (
        <div>
          <h2 className="text-2xl font-sora font-bold mb-4">Pending Approvals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map(u => (
              <GlassCard key={u.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-accent-gold/30">
                <div>
                  <p className="font-bold font-sora text-white">{u.name} <span className="text-sm font-medium text-gray-400 ml-2">({u.customId})</span></p>
                  <p className="text-sm text-gray-400 font-inter">{u.email} • {u.phone || 'No phone'}</p>
                  <span className="inline-block px-2 py-1 bg-accent-gold/20 text-accent-gold text-xs rounded-full mt-2 font-bold uppercase">{u.role}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleReject(u.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20">
                    <X size={16} /> Reject
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => handleApprove(u.id)}>
                    <Check size={16} /> Approve
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-sora font-bold mb-4">All Users</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-surface-dark border-b border-white/10 text-gray-400">
              <tr>
                <th className="px-6 py-4">ID / Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Wallet</th>
                <th className="px-6 py-4">Agent/Ref</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-white/5 bg-surface-dark/50 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{u.customId}</div>
                    <div className="text-xs text-gray-500">{u.name}</div>
                  </td>
                  <td className="px-6 py-4 uppercase font-bold text-xs">{u.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-accent-primary font-bold font-mono">
                    ${u.walletBalance?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                       {u.agentId ? `A: ${u.agentId}` : u.referredBy ? `R: ${u.referredBy}` : '-'}
                       {u.role === 'user' && (
                          <button onClick={() => {
                            const newAgent = prompt('Enter Agent UID:');
                            if (newAgent) {
                               updateDoc(doc(db, 'users', u.id), { agentId: newAgent }).then(() => fetchUsers());
                            }
                          }} className="text-accent-primary hover:underline ml-2">Assign</button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
