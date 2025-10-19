import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TableCRUD from '../../components/TableCRUD'
import { useCRM } from '../../context/CRMContext'

export default function AdminOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { orders } = useCRM()

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'customerId', headerName: 'Customer ID', width: 150 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 }
  ]

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>Orders</Typography>
        <TableCRUD rows={orders} columns={columns} editable={false} />
      </Box>
    </Box>
  )
}
