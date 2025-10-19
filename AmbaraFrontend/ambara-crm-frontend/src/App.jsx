import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Admin pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminCustomers from './pages/admin/Customers'
import AdminOrders from './pages/admin/Orders'
import AdminProducts from './pages/admin/Products'
import AdminMessages from './pages/admin/Messages'
import AdminAnalytics from './pages/admin/Analytics'
import AdminSettings from './pages/admin/Settings'

// Customer pages
import UserDashboard from './pages/customer/Dashboard'
import UserOrders from './pages/customer/Orders'
import UserWishlist from './pages/customer/Wishlist'
import UserProfile from './pages/customer/Profile'
import UserMessages from './pages/customer/Messages'

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/login'} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* Customer Protected Routes */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/user/wishlist" element={<UserWishlist />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/messages" element={<UserMessages />} />
      </Route>

      <Route path="*" element={<h2 style={{textAlign:'center', marginTop:'50px'}}>Page Not Found</h2>} />
    </Routes>
  )
}
