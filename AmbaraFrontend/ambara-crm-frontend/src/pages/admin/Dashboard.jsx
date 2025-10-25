import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [open, setOpen] = useState(true)
  const toggleSidebar = () => setOpen(v => !v)

  // Dummy Data
  const stats = [
    { title: 'Total Customers', value: 1248, icon: <PeopleIcon sx={{ fontSize: 40, color: '#00a862' }} /> },
    { title: 'Total Products', value: 342, icon: <InventoryIcon sx={{ fontSize: 40, color: '#00a862' }} /> },
    { title: 'Total Orders', value: 876, icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#00a862' }} /> },
    { title: 'Growth Rate', value: '+18%', icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#00a862' }} /> }
  ]

  const salesData = [
    { name: 'Jan', sales: 1200 },
    { name: 'Feb', sales: 2100 },
    { name: 'Mar', sales: 1800 },
    { name: 'Apr', sales: 2400 },
    { name: 'May', sales: 2800 },
    { name: 'Jun', sales: 3200 },
    { name: 'Jul', sales: 3600 }
  ]

  const customerGrowthData = [
    { name: 'Jan', customers: 100 },
    { name: 'Feb', customers: 150 },
    { name: 'Mar', customers: 200 },
    { name: 'Apr', customers: 250 },
    { name: 'May', customers: 300 },
    { name: 'Jun', customers: 350 },
    { name: 'Jul', customers: 400 }
  ]

  const recentOrders = [
    { id: 'OD001', customer: 'John Doe', total: 120.5, status: 'Pending' },
    { id: 'OD002', customer: 'Alice Smith', total: 245.0, status: 'Shipped' },
    { id: 'OD003', customer: 'Michael Brown', total: 98.0, status: 'Delivered' },
    { id: 'OD004', customer: 'Emma Wilson', total: 310.0, status: 'Cancelled' },
    { id: 'OD005', customer: 'David Lee', total: 150.0, status: 'Pending' }
  ]

  const notifications = [
    { id: 1, text: 'New order received', time: '2 mins ago' },
    { id: 2, text: 'Product stock low', time: '1 hour ago' },
    { id: 3, text: 'New customer registered', time: '3 hours ago' }
  ]

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'warning'
      case 'shipped': return 'info'
      case 'delivered': return 'success'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fdfc' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Admin Dashboard">
        <Grid container spacing={3}>
          {/* Stat Cards */}
          {stats.map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #00a862 0%, #00332e 100%)',
                  color: '#ecfdf5',
                  borderRadius: 3,
                  height: 130,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: '0 6px 18px rgba(0,0,0,0.25)' }
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                  <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>{s.title}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#ecfdf5', width: 56, height: 56 }}>{s.icon}</Avatar>
              </Card>
            </Grid>
          ))}

          {/* Sales & Customer Growth Charts */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(180deg, #f9fdfc 0%, #d1fae5 100%)' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#00332e' }}>Monthly Sales Trend</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#a7f3d0" />
                  <XAxis dataKey="name" stroke="#00332e" />
                  <YAxis stroke="#00332e" />
                  <Tooltip contentStyle={{ backgroundColor: '#00332e', color: '#ecfdf5', borderRadius: 10 }} />
                  <Line type="monotone" dataKey="sales" stroke="#00a862" strokeWidth={3} dot={{ r: 5, fill: '#00332e' }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(180deg, #f9fdfc 0%, #d1fae5 100%)' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#00332e' }}>Customer Growth</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#a7f3d0" />
                  <XAxis dataKey="name" stroke="#00332e" />
                  <YAxis stroke="#00332e" />
                  <Tooltip contentStyle={{ backgroundColor: '#00332e', color: '#ecfdf5', borderRadius: 10 }} />
                  <Line type="monotone" dataKey="customers" stroke="#00a862" strokeWidth={3} dot={{ r: 5, fill: '#00332e' }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Recent Orders Table */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, borderRadius: 3, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#00332e' }}>Recent Orders</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#00332e' }}>ID</TableCell>
                    <TableCell sx={{ color: '#00332e' }}>Customer</TableCell>
                    <TableCell sx={{ color: '#00332e' }}>Total</TableCell>
                    <TableCell sx={{ color: '#00332e' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map(o => (
                    <TableRow key={o.id}>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.customer}</TableCell>
                      <TableCell>${o.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip label={o.status} color={getStatusColor(o.status)} size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Grid>

          {/* Quick Actions & Notifications */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, borderRadius: 3, mb: 2, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#00332e' }}>Quick Actions</Typography>
              {['Manage Products', 'Manage Orders', 'Manage Customers', 'Settings'].map((action, i) => (
                <Button
                  key={i}
                  variant={i===3 ? 'contained' : 'outlined'}
                  fullWidth
                  sx={{
                    mb: 1,
                    textTransform: 'none',
                    fontWeight: 500,
                    color: i===3 ? '#ffffff' : '#00a862',
                    borderColor: '#00a862',
                    backgroundColor: i===3 ? '#00a862' : 'transparent',
                    '&:hover': { backgroundColor: i===3 ? '#00332e' : '#f0fff5', borderColor: '#00332e' }
                  }}
                >
                  {action}
                </Button>
              ))}
            </Card>

            <Card sx={{ p: 3, borderRadius: 3, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#00332e' }}>Notifications</Typography>
              {notifications.map(n => (
                <Box key={n.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <NotificationsIcon sx={{ mr: 1, color: '#00a862' }} />
                  <Typography variant="body2">{n.text} - {n.time}</Typography>
                </Box>
              ))}
            </Card>
          </Grid>
        </Grid>
      </AdminPage>
    </Box>
  )
}
