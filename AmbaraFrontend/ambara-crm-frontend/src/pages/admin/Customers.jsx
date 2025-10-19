import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TableCRUD from '../../components/TableCRUD'
import { useCRM } from '../../context/CRMContext'

export default function AdminCustomers() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { customers } = useCRM()

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 100 }
  ]

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>Customers</Typography>
        <TableCRUD rows={customers} columns={columns} editable={false} />
      </Box>
    </Box>
  )
}
