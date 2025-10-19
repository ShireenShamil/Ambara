import React, { useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import SalesChart from '../../components/Charts/SalesChart'
import CustomerChart from '../../components/Charts/CustomerChart'
import { useCRM } from '../../context/CRMContext'

export default function AdminAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { orders, customers } = useCRM()

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>Analytics</Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <SalesChart orders={orders} />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <CustomerChart customers={customers} />
        </Paper>
      </Box>
    </Box>
  )
}
