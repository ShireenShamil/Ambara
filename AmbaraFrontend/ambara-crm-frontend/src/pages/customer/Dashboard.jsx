import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip
} from '@mui/material'
import { Print, Image, LocalDrink, Brush } from '@mui/icons-material'
import CustomerNavbar from '../../components/CustomerNavbar'
import SidebarCustomer from '../../components/SidebarCustomer'
import { useCRM } from '../../context/CRMContext'
import { useNavigate } from 'react-router-dom'

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { orders = [], products = [] } = useCRM()
  const navigate = useNavigate()

  const ordersInProgress = useMemo(() => orders.filter(o => o.status && o.status !== 'completed'), [orders])
  const totalSpent = useMemo(() => orders.reduce((s, o) => s + (o.total || 0), 0), [orders])

  const printingServices = [
    { title: 'T-Shirt Printing', description: 'Custom t-shirt printing with high-quality designs', icon: <Print />, color: '#4CAF50' },
    { title: 'Frame Printing', description: 'Beautiful photo frames with personalized prints', icon: <Image />, color: '#4CAF50' },
    { title: 'Mug Printing', description: 'Custom mugs with your favorite designs', icon: <LocalDrink />, color: '#4CAF50' },
    { title: 'Logo Creating', description: 'Professional logo design services for your brand', icon: <Brush />, color: '#4CAF50' }
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <Box display="flex">
      <CustomerNavbar />
      <SidebarCustomer open={sidebarOpen} />

      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%', p: 3, pt: 10 }}>
        {/* Hero banner */}
        <Paper sx={{ background: 'linear-gradient(90deg,#0b6b2f 0%, #196f30 100%)', color: '#fff', p: 4, borderRadius: 2, mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Welcome back, ready to create something amazing?</Typography>
          <Typography variant="body1" sx={{ opacity: 0.95 }}>Start a new design or manage your orders and saved designs.</Typography>
        </Paper>

        {/* Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: '#F4F4F4' }}>
              <Typography variant="subtitle2" color="#0E1A2B">Orders in Progress</Typography>
              <Typography variant="h5" color="#4CAF50">{ordersInProgress.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: '#F4F4F4' }}>
              <Typography variant="subtitle2" color="#0E1A2B">Saved Designs</Typography>
              <Typography variant="h5" color="#4CAF50">{products.filter(p => p.saved).length || 0}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: '#F4F4F4' }}>
              <Typography variant="subtitle2" color="#0E1A2B">Total Spent</Typography>
              <Typography variant="h5" color="#0E1A2B">Rs. {totalSpent.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: '#F4F4F4' }}>
              <Typography variant="subtitle2" color="#0E1A2B">Loyalty Points</Typography>
              <Typography variant="h5" color="#0E1A2B">1,250</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Promo */}
        <Paper sx={{ p: 2, borderRadius: 2, mb: 3, backgroundColor: '#eaf6ea', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontWeight: 700 }}>Special Offer This Week!</Typography>
            <Typography>Get 20% off on all Mug Printing orders</Typography>
          </Box>
          <Button sx={{ backgroundColor: '#1f7a2b', color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: '#0f5e1f' } }}>Shop Now</Button>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Orders</Typography>
            <Paper sx={{ p: 0, borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.length ? recentOrders.map((o, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{o.productName || 'Custom T-Shirt'}</TableCell>
                      <TableCell>{o.date || 'Oct 20, 2025'}</TableCell>
                      <TableCell>
                        <Chip label={o.status || 'In Production'} size="small" sx={{ backgroundColor: '#fff3cd' }} />
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" size="small" onClick={() => navigate('/user/orders')}>Track</Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>No recent orders</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>Our Printing Services</Typography>
            <Grid container spacing={2}>
              {printingServices.map((service, i) => (
                <Grid item xs={12} key={i}>
                  <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#F4F4F4' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      <Avatar sx={{ bgcolor: service.color }}>{service.icon}</Avatar>
                      <Box>
                        <Typography variant="subtitle1" color="#0E1A2B">{service.title}</Typography>
                        <Typography variant="body2" color="#0E1A2B">{service.description}</Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ pr: 2 }}>
                      <Button variant="contained" sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#388E3C' } }} onClick={() => navigate('/user/orders')}>Order Now</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
