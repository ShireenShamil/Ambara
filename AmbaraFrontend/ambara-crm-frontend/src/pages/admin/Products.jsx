import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TableCRUD from '../../components/TableCRUD'
import { useCRM } from '../../context/CRMContext'

export default function AdminProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { products } = useCRM()

  const columns = [
    { field: 'id', headerName: 'Product ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'category', headerName: 'Category', width: 150 }
  ]

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>Products</Typography>
        <TableCRUD rows={products} columns={columns} editable={true} />
      </Box>
    </Box>
  )
}
