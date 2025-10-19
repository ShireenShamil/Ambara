import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarCustomer from '../../components/SidebarCustomer'
import TableCRUD from '../../components/TableCRUD'
import { useCRM } from '../../context/CRMContext'
import { useAuth } from '../../context/AuthContext'

export default function UserOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { orders } = useCRM()
  const { user } = useAuth()
  const userOrders = orders.filter(o => o.customerId === user.id)

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 }
  ]

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarCustomer open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>My Orders</Typography>
        <TableCRUD rows={userOrders} columns={columns} editable={false} />
      </Box>
    </Box>
  )
}
