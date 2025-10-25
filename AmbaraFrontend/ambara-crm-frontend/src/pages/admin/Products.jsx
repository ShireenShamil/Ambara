import React, { useState } from 'react'
import {
  Box,
  Typography,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material'
import {
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import BulkImport from '../../components/BulkImport'
import ProductQuickEdit from '../../components/ProductQuickEdit'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ArchiveIcon from '@mui/icons-material/Archive'
import tshirtImage from '../../images/tshirt.jpeg'
import Mug from '../../images/mug.jpeg'
import Frame from '../../images/frame.jpeg'
import Brand from '../../images/brand.jpeg'

export default function AdminProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterType, setFilterType] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [editOpen, setEditOpen] = useState(false)

  const products = [
    { id: 'P001', title: 'Custom T-Shirt', price: 25, stock: 50, category: 'Apparel', type: 'T-Shirt', material: 'Cotton', status: 'Ready', image: tshirtImage },
    { id: 'P002', title: 'Logo Mug', price: 15, stock: 80, category: 'Decor', type: 'Mug', material: 'Ceramic', status: 'Custom', image: Mug },
    { id: 'P003', title: 'Photo Frame', price: 40, stock: 20, category: 'Decor', type: 'Frame', material: 'Wood', status: 'Ready', image: Frame },
    { id: 'P004', title: 'Custom Logo', price: 100, stock: 5, category: 'Design', type: 'Logo', material: 'Digital', status: 'Ready', image: Brand },
  ]

  const filteredProducts = products.filter(p =>
    (!filterCategory || p.category === filterCategory) &&
    (!filterType || p.type === filterType) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  )

  function openEdit(p) {
    setSelected(p)
    setEditOpen(true)
  }

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar
          variant="rounded"
          src={params.value}
          sx={{ width: 50, height: 50, bgcolor: '#e0f2f1' }}
        />
      ),
    },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 180, editable: true },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'material', headerName: 'Material', width: 120, editable: true },
    { field: 'price', headerName: 'Price ($)', width: 110, editable: true },
    { field: 'stock', headerName: 'Stock', width: 110, editable: true },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Ready' ? 'success' : 'info'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton size="small" sx={{ color: '#00a862' }} onClick={() => openEdit(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duplicate">
            <IconButton size="small" sx={{ color: '#00a862' }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Archive">
            <IconButton size="small" color="error">
              <ArchiveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ]

  const totalProducts = products.length
  const totalStock = products.reduce((a, b) => a + b.stock, 0)
  const outOfStock = products.filter(p => p.stock === 0).length

  return (
    <Box display="flex" sx={{ backgroundColor: '#f9fdfc' }}>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <AdminPage open={sidebarOpen} title="Products">

        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" sx={{ color: '#00332e' }}>Products</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{ bgcolor: '#00a862', '&:hover': { bgcolor: '#00332e' } }}
            >
              + Add Product
            </Button>
            <BulkImport onImported={() => { }} />
          </Stack>
        </Stack>

        {/* Search */}
        <TextField
          placeholder="Search by ID or Title"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 3, backgroundColor: '#ffffff', borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#00a862' }} />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[{ title: 'Total Products', value: totalProducts }, { title: 'Total Stock', value: totalStock }, { title: 'Out of Stock', value: outOfStock }].map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #00a862 0%, #00332e 100%)',
                  borderRadius: 3,
                  color: '#ecfdf5',
                  p: 2,
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="subtitle2">{s.title}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{s.value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Filters */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="subtitle2" sx={{ color: '#00332e' }}>Category:</Typography>
          {['All', 'Apparel', 'Decor', 'Design'].map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              sx={{
                bgcolor: filterCategory === cat || (cat === 'All' && !filterCategory) ? '#00a862' : '#ffffff',
                color: filterCategory === cat || (cat === 'All' && !filterCategory) ? '#ffffff' : '#00332e',
                '&:hover': { bgcolor: '#00332e', color: '#ffffff' }
              }}
              onClick={() => setFilterCategory(cat === 'All' ? '' : cat)}
            />
          ))}

          <Typography variant="subtitle2" sx={{ ml: 2, color: '#00332e' }}>Print Type:</Typography>
          {['All', 'T-Shirt', 'Mug', 'Frame', 'Logo'].map((type) => (
            <Chip
              key={type}
              label={type}
              clickable
              sx={{
                bgcolor: filterType === type || (type === 'All' && !filterType) ? '#00a862' : '#ffffff',
                color: filterType === type || (type === 'All' && !filterType) ? '#ffffff' : '#00332e',
                '&:hover': { bgcolor: '#00332e', color: '#ffffff' }
              }}
              onClick={() => setFilterType(type === 'All' ? '' : type)}
            />
          ))}
        </Stack>

        {/* Product Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {filteredProducts.map(p => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }
                }}
                onClick={() => openEdit(p)}
              >
                <CardContent>
                  <Avatar variant="rounded" src={p.image || undefined} sx={{ width: '100%', height: 120, mb: 1, bgcolor: '#e0f2f1' }}>
                    {!p.image && p.title.charAt(0)}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#00332e' }}>{p.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#00332e' }}>{p.type} | {p.material}</Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                    <Typography variant="subtitle2" sx={{ color: '#00332e' }}>${p.price}</Typography>
                    <Chip label={p.status} color={p.status === 'Ready' ? 'success' : 'info'} size="small" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* DataGrid Table */}
        <Box sx={{ height: 450, width: '100%', '& .MuiDataGrid-root': { borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' } }}>
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            onRowClick={(params) => openEdit(params.row)}
          />
        </Box>

        {/* Quick Edit Dialog */}
        <ProductQuickEdit
          open={editOpen}
          product={selected}
          onClose={() => setEditOpen(false)}
          onSave={(p) => setEditOpen(false)}
        />

      </AdminPage>
    </Box>
  )
}
