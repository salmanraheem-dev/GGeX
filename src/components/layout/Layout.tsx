import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAppStore } from '@/store/useAppStore';

export const Layout = () => {
  const { setUser, setInitialLoading, theme } = useAppStore();

  useEffect(() => {
    // Apply theme
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
             setUser({
               uid: user.uid,
               email: user.email || '',
               ...userDoc.data()
             } as any);
          } else {
             setUser({ uid: user.uid, email: user.email || '', name: 'User', customId: '', role: 'user', walletBalance: 0 });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, 'users/' + user.uid);
        }
      } else {
        setUser(null);
      }
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setInitialLoading]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-surface-dark dark:text-white font-inter flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
