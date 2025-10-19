import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TableCRUD from '../../components/TableCRUD'
import { useCRM } from '../../context/CRMContext'
import AdminPage from '../../components/AdminPage'
import ProductQuickEdit from '../../components/ProductQuickEdit'
import BulkImport from '../../components/BulkImport'
import { Chip, Stack } from '@mui/material'

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
  const [filter, setFilter] = React.useState('')
  const [selected, setSelected] = React.useState(null)
  const [editOpen, setEditOpen] = React.useState(false)

  function openEdit(p){ setSelected(p); setEditOpen(true) }

  function onImported(items){ /* refresh handled by CRM context in a full app */ }

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <AdminPage open={sidebarOpen} title="Products">
        <Typography variant="h4" mb={2}>Products</Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{mb:2}}>
          <Chip label="All" clickable color={!filter ? 'success' : 'default'} onClick={()=>setFilter('')} />
          <Chip label="Apparel" clickable onClick={()=>setFilter('Apparel')} />
          <Chip label="Decor" clickable onClick={()=>setFilter('Decor')} />
          <Chip label="Design" clickable onClick={()=>setFilter('Design')} />
          <BulkImport onImported={onImported} />
        </Stack>
        <TableCRUD rows={filter ? products.filter(p=>p.category===filter) : products} columns={columns} editable={true} onRowClick={openEdit} />
        <ProductQuickEdit open={editOpen} product={selected} onClose={()=>setEditOpen(false)} onSave={(p)=>{ setEditOpen(false); /* update API in full app */ }} />
      </AdminPage>
    </Box>
  )
}
