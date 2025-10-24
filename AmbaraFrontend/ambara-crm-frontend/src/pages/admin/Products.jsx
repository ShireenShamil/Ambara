import React, { useState } from 'react'
import {
  Box,
  Typography,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  InputAdornment
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import ProductQuickEdit from '../../components/ProductQuickEdit'
import BulkImport from '../../components/BulkImport'
import TableCRUD from '../../components/TableCRUD'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ArchiveIcon from '@mui/icons-material/Archive'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'

export default function AdminProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterType, setFilterType] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [editOpen, setEditOpen] = useState(false)

  // Dummy Products
  const products = [
    { id: 'P001', title: 'Custom T-Shirt', price: 25, stock: 50, category: 'Apparel', type: 'T-Shirt', material: 'Cotton', status: 'Ready', image: '' },
    { id: 'P002', title: 'Logo Mug', price: 15, stock: 80, category: 'Decor', type: 'Mug', material: 'Ceramic', status: 'Custom', image: '' },
    { id: 'P003', title: 'Photo Frame', price: 40, stock: 20, category: 'Decor', type: 'Frame', material: 'Wood', status: 'Ready', image: '' },
    { id: 'P004', title: 'Custom Logo', price: 100, stock: 5, category: 'Design', type: 'Logo', material: 'Digital', status: 'Ready', image: '' },
  ]

  // Filtered Products
  const filteredProducts = products.filter(p => 
    (!filterCategory || p.category === filterCategory) &&
    (!filterType || p.type === filterType) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  )

  function openEdit(p){ setSelected(p); setEditOpen(true) }

  // Columns for TableCRUD
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'title', headerName: 'Title', width: 180 },
    { field: 'type', headerName: 'Print Type', width: 120 },
    { field: 'material', headerName: 'Material', width: 120 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params)=>(
      <Chip 
        label={params.value} 
        color={params.value==='Ready'?'success':params.value==='Custom'?'info':'default'} 
        size="small" 
      />
    )},
    { field: 'actions', headerName: 'Actions', width: 120, renderCell: (params)=>(
      <Stack direction="row" spacing={1}>
        <Tooltip title="Edit"><IconButton size="small" onClick={()=>openEdit(params.row)}><EditIcon fontSize="small"/></IconButton></Tooltip>
        <Tooltip title="Duplicate"><IconButton size="small"><ContentCopyIcon fontSize="small"/></IconButton></Tooltip>
        <Tooltip title="Archive"><IconButton size="small"><ArchiveIcon fontSize="small"/></IconButton></Tooltip>
      </Stack>
    )}
  ]

  // Stats calculation
  const totalProducts = products.length
  const totalStock = products.reduce((a,b)=>a+b.stock,0)
  const outOfStock = products.filter(p=>p.stock===0).length
  const topTypeCount = products.reduce((acc,p)=>{ acc[p.type]=(acc[p.type]||0)+1; return acc }, {})
  const topSellingType = Object.keys(topTypeCount).reduce((a,b)=>topTypeCount[a]>topTypeCount[b]?a:b,'')

  return (
    <Box display="flex">
      <Navbar toggleSidebar={()=>setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <AdminPage open={sidebarOpen} title="Products">
        
        {/* Header + Add Button */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Products</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary">+ Add Product</Button>
            <BulkImport onImported={()=>{}} />
          </Stack>
        </Stack>

        {/* Search */}
        <TextField 
          placeholder="Search by ID or Title" 
          variant="outlined" 
          size="small" 
          fullWidth 
          sx={{mb:3}} 
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb:3 }}>
          {[
            { title:'Total Products', value:totalProducts, gradient:'linear-gradient(135deg, #10b981 0%, #064e3b 100%)' },
            { title:'Total Stock', value:totalStock, gradient:'linear-gradient(135deg, #10b981 0%, #064e3b 100%)'},
            { title:'Out of Stock', value:outOfStock, gradient:'linear-gradient(135deg, #10b981 0%, #064e3b 100%)' },
            { title:'Top Type', gradient:'linear-gradient(135deg, #10b981 0%, #064e3b 100%)' },
          ].map((s,i)=>(
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{background:s.gradient, borderRadius:3, color:'#fff', p:2, boxShadow:'0 4px 20px rgba(0,0,0,0.1)', height:'100%'}}>
                <Typography variant="subtitle2">{s.title}</Typography>
                <Typography variant="h5" sx={{fontWeight:700}}>{s.value}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filters */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{mb:3, flexWrap:'wrap'}}>
          <Typography variant="subtitle2">Category:</Typography>
          <Chip label="All" clickable color={!filterCategory?'success':'default'} onClick={()=>setFilterCategory('')} />
          <Chip label="Apparel" clickable onClick={()=>setFilterCategory('Apparel')} />
          <Chip label="Decor" clickable onClick={()=>setFilterCategory('Decor')} />
          <Chip label="Design" clickable onClick={()=>setFilterCategory('Design')} />

          <Typography variant="subtitle2" sx={{ ml:2 }}>Print Type:</Typography>
          <Chip label="All" clickable color={!filterType?'success':'default'} onClick={()=>setFilterType('')} />
          <Chip label="T-Shirt" clickable onClick={()=>setFilterType('T-Shirt')} />
          <Chip label="Mug" clickable onClick={()=>setFilterType('Mug')} />
          <Chip label="Frame" clickable onClick={()=>setFilterType('Frame')} />
          <Chip label="Logo" clickable onClick={()=>setFilterType('Logo')} />
        </Stack>

        {/* Product Cards */}
        <Grid container spacing={3} sx={{ mb:3 }}>
          {filteredProducts.map(p => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card sx={{
                borderRadius:3,
                boxShadow:'0 4px 20px rgba(0,0,0,0.1)',
                cursor:'pointer',
                '&:hover': { transform:'translateY(-5px)', boxShadow:'0 8px 25px rgba(0,0,0,0.2)' }
              }} onClick={()=>openEdit(p)}>
                <CardContent>
                  <Avatar variant="rounded" src={p.image || undefined} sx={{width:'100%', height:120, mb:1, bgcolor:'#e0f2f1'}}>
                    {!p.image && p.title.charAt(0)}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{fontWeight:600}}>{p.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{p.type} | {p.material}</Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                    <Typography variant="subtitle2">${p.price}</Typography>
                    <Chip label={p.status} color={p.status==='Ready'?'success':p.status==='Custom'?'info':'default'} size="small" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Product Table */}
        <TableCRUD 
          rows={filteredProducts} 
          columns={columns} 
          editable={true} 
          onRowClick={openEdit} 
        />

        {/* Quick Edit */}
        <ProductQuickEdit 
          open={editOpen} 
          product={selected} 
          onClose={()=>setEditOpen(false)} 
          onSave={(p)=>{ setEditOpen(false); }} 
        />

      </AdminPage>
    </Box>
  )
}
