/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Landing } from '@/pages/Landing';
import { Marketplace } from '@/pages/Marketplace';
import { Membership } from '@/pages/Membership';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { Dashboard } from '@/pages/Dashboard';

import { Admin } from '@/pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="membership" element={<Membership />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin-ggex" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
