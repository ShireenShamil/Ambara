import React, { useState } from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarCustomer from '../../components/SidebarCustomer'
import { useCRM } from '../../context/CRMContext'

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { orders, products } = useCRM()

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarCustomer open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={3}>Customer Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Orders</Typography>
              <Typography variant="h5">{orders.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography>Available Products</Typography>
              <Typography variant="h5">{products.length}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
