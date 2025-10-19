import React, { useState } from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import { useCRM } from '../../context/CRMContext'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { customers, orders, products, messages } = useCRM()

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={3}>Admin Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Customers</Typography>
              <Typography variant="h5">{customers.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Orders</Typography>
              <Typography variant="h5">{orders.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Products</Typography>
              <Typography variant="h5">{products.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Messages</Typography>
              <Typography variant="h5">{messages.length}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
