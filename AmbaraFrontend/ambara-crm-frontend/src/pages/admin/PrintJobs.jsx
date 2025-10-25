import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  TextField,
  Chip,
  Tooltip,
  Drawer,
  Divider,
  LinearProgress,
  Fade,
  Avatar,
  IconButton,
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import DownloadIcon from '@mui/icons-material/Download'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import InventoryIcon from '@mui/icons-material/Inventory'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import PrintIcon from '@mui/icons-material/Print'
import { v4 as uuidv4 } from 'uuid'
import tshirtImage from '../../images/tshirt.jpeg'
import Mug from '../../images/mug.jpeg'
import Frame from '../../images/frame.jpeg'
import Brand from '../../images/brand.jpeg'

export default function PrintJobs() {
  const [open, setOpen] = useState(true)
  const [jobs, setJobs] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)

  const dummyJobs = [
    {
      id: 'J001',
      customerName: 'Alice Smith',
      product: 'Custom T-Shirt',
      quantity: 5,
      status: 'Received',
      image: tshirtImage,
      orderDate: '2025-10-20',
      deliveryDate: '2025-10-27',
      price: 1500,
      description: 'White cotton t-shirts with blue custom logo prints.',
    },
    {
      id: 'J002',
      customerName: 'Bob Johnson',
      product: 'Logo Mug',
      quantity: 10,
      status: 'Production',
      image: Mug,
      orderDate: '2025-10-18',
      deliveryDate: '2025-10-26',
      price: 2200,
      description: 'Ceramic mugs with a minimalistic black logo print.',
    },
    {
      id: 'J003',
      customerName: 'Charlie Lee',
      product: 'Photo Frame',
      quantity: 3,
      status: 'QA',
      image: Frame,
      orderDate: '2025-10-17',
      deliveryDate: '2025-10-25',
      price: 3000,
      description: 'High-quality glass photo frames with matte finish border.',
    },
    {
      id: 'J004',
      customerName: 'Diana Prince',
      product: 'Custom Logo Design',
      quantity: 1,
      status: 'Shipped',
      image: Brand,
      orderDate: '2025-10-10',
      deliveryDate: '2025-10-20',
      price: 5000,
      description: 'Logo redesign for rebranding project.',
    },
  ]

  useEffect(() => {
    setJobs(dummyJobs)
  }, [])

  const filteredJobs = jobs.filter(j =>
    (!statusFilter || j.status === statusFilter) &&
    ((j.customerName?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (j.product?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (j.id?.toLowerCase() || '').includes(search.toLowerCase()))
  )

  const totalJobs = jobs.length
  const pendingJobs = jobs.filter(j => j.status !== 'Shipped').length
  const shippedJobs = jobs.filter(j => j.status === 'Shipped').length

  const updateStatus = (id, newStatus) => {
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, status: newStatus } : j)))
  }

  const getProgressValue = (status) => {
    switch (status) {
      case 'Received': return 25
      case 'Production': return 50
      case 'QA': return 75
      case 'Shipped': return 100
      default: return 0
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Received': return <InventoryIcon sx={{ color: '#15803d' }} />
      case 'Production': return <PrintIcon sx={{ color: '#22c55e' }} />
      case 'QA': return <FactCheckIcon sx={{ color: '#84cc16' }} />
      case 'Shipped': return <LocalShippingIcon sx={{ color: '#16a34a' }} />
      default: return null
    }
  }

  return (
    <Box display="flex" sx={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', minHeight: '100vh' }}>
      <Navbar toggleSidebar={() => setOpen(v => !v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Print Jobs">
        <Fade in timeout={400}>
          <Box>
            <Typography variant="h4" mb={2} sx={{ color: '#14532d', fontWeight: 700 }}>
              Print Jobs Queue
            </Typography>

            {/* Search & Filter */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
              <TextField
                placeholder="Search by Job ID, Product or Customer"
                variant="outlined"
                size="small"
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{
                  background: 'white',
                  borderRadius: '10px',
                }}
              />
              <Select
                size="small"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                sx={{ background: 'white', borderRadius: '10px', width: 200 }}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
                <MenuItem value="Production">Production</MenuItem>
                <MenuItem value="QA">QA</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
              </Select>
            </Stack>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={3}>
              {[
                { title: 'Total Jobs', value: totalJobs, gradient: 'linear-gradient(135deg,#16a34a,#14532d)' },
                { title: 'Pending Jobs', value: pendingJobs, gradient: 'linear-gradient(135deg,#f59e0b,#b45309)' },
                { title: 'Shipped Jobs', value: shippedJobs, gradient: 'linear-gradient(135deg,#22c55e,#166534)' },
              ].map((s, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      color: '#fff',
                      background: s.gradient,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="subtitle2">{s.title}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {s.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Job Cards */}
            <Grid container spacing={3}>
              {filteredJobs.map(j => (
                <Grid item xs={12} sm={6} md={3} key={j.id}>
                  <Card
                    onClick={() => setSelectedJob(j)}
                    sx={{
                      borderRadius: 3,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: '0.3s',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(8px)',
                      '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' },
                    }}
                  >
                    <CardMedia component="img" height="140" image={j.image} alt={j.product} />
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{j.product}</Typography>
                      <Typography variant="body2" color="text.secondary">Customer: {j.customerName}</Typography>
                      <Typography variant="body2" color="text.secondary">Quantity: {j.quantity}</Typography>

                      <LinearProgress
                        variant="determinate"
                        value={getProgressValue(j.status)}
                        sx={{
                          height: 6, borderRadius: 3, mt: 1.5,
                          backgroundColor: '#e5e7eb',
                          '& .MuiLinearProgress-bar': { backgroundColor: '#16a34a' },
                        }}
                      />

                      <Stack direction="row" spacing={1} mt={1.5} alignItems="center" justifyContent="space-between">
                        <Chip
                          label={j.status}
                          sx={{
                            background: '#dcfce7',
                            color: '#15803d',
                            fontWeight: 600,
                          }}
                          size="small"
                        />
                        <Tooltip title="Change Status">
                          <Select
                            size="small"
                            value={j.status}
                            onChange={e => updateStatus(j.id, e.target.value)}
                          >
                            <MenuItem value="Received">Received</MenuItem>
                            <MenuItem value="Production">Production</MenuItem>
                            <MenuItem value="QA">QA</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                          </Select>
                        </Tooltip>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Job Details Drawer */}
            <Drawer
              anchor="right"
              open={!!selectedJob}
              onClose={() => setSelectedJob(null)}
              PaperProps={{
                sx: {
                  width: 420,
                  p: 3,
                  background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
                  borderRadius: '16px 0 0 16px',
                },
              }}
            >
              {selectedJob && (
                <>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={700} color="#14532d">
                      Job Details
                    </Typography>
                    <IconButton onClick={() => setSelectedJob(null)}>
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <CardMedia
                    component="img"
                    image={selectedJob.image}
                    height="160"
                    sx={{ borderRadius: '12px', mb: 2 }}
                  />
                  <Typography variant="h6" fontWeight={600}>{selectedJob.product}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {selectedJob.description}
                  </Typography>
                  <Stack spacing={1.2} mb={2}>
                    <Typography variant="body2">Job ID: <b>{selectedJob.id}</b></Typography>
                    <Typography variant="body2">Customer: <b>{selectedJob.customerName}</b></Typography>
                    <Typography variant="body2">Quantity: <b>{selectedJob.quantity}</b></Typography>
                    <Typography variant="body2">Order Date: <b>{selectedJob.orderDate}</b></Typography>
                    <Typography variant="body2">Delivery Date: <b>{selectedJob.deliveryDate}</b></Typography>
                    <Typography variant="body2">Price: <b>Rs. {selectedJob.price.toLocaleString()}</b></Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    {getStatusIcon(selectedJob.status)}
                    <Chip label={selectedJob.status} sx={{ background: '#dcfce7', color: '#15803d', fontWeight: 600 }} />
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={getProgressValue(selectedJob.status)}
                    sx={{
                      height: 7, borderRadius: 4, mb: 2,
                      '& .MuiLinearProgress-bar': { backgroundColor: '#15803d' },
                    }}
                  />

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" color="#14532d" mb={1}>Internal Notes</Typography>
                  <TextField
                    multiline
                    minRows={3}
                    fullWidth
                    placeholder="Add internal notes..."
                    sx={{ background: 'white', borderRadius: '10px' }}
                  />

                  <Stack direction="row" spacing={2} mt={3}>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      sx={{
                        background: 'linear-gradient(90deg,#16a34a,#15803d)',
                        color: 'white',
                        '&:hover': { background: 'linear-gradient(90deg,#15803d,#166534)' },
                      }}
                    >
                      Download Job Slip
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => updateStatus(selectedJob.id, 'Shipped')}
                    >
                      Mark as Shipped
                    </Button>
                  </Stack>
                </>
              )}
            </Drawer>
          </Box>
        </Fade>
      </AdminPage>
    </Box>
  )
}
