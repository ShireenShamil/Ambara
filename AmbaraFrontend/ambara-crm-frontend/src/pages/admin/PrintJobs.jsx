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
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import { api } from '../../api/crmApi'
import { v4 as uuidv4 } from 'uuid'

export default function PrintJobs() {
  const [open, setOpen] = useState(true)
  const [jobs, setJobs] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  // Dummy data for testing
  const dummyJobs = [
    {
      id: 'J001',
      customerName: 'Alice Smith',
      product: 'Custom T-Shirt',
      quantity: 5,
      status: 'Received',
      image: 'https://via.placeholder.com/180?text=T-Shirt',
    },
    {
      id: 'J002',
      customerName: 'Bob Johnson',
      product: 'Logo Mug',
      quantity: 10,
      status: 'Production',
      image: 'https://via.placeholder.com/180?text=Mug',
    },
    {
      id: 'J003',
      customerName: 'Charlie Lee',
      product: 'Photo Frame',
      quantity: 3,
      status: 'QA',
      image: 'https://via.placeholder.com/180?text=Frame',
    },
    {
      id: 'J004',
      customerName: 'Diana Prince',
      product: 'Custom Logo',
      quantity: 1,
      status: 'Shipped',
      image: 'https://via.placeholder.com/180?text=Logo',
    },
  ]

  useEffect(() => {
    // Load from API if needed, here using dummy data
    setJobs(dummyJobs)
  }, [])

  const filteredJobs = jobs.filter(j =>
    (!statusFilter || j.status === statusFilter) &&
    ((j.customerName?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (j.product?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (j.id?.toLowerCase() || '').includes(search.toLowerCase()))
  )

  // Stats
  const totalJobs = jobs.length
  const pendingJobs = jobs.filter(j => j.status !== 'Shipped').length
  const shippedJobs = jobs.filter(j => j.status === 'Shipped').length

  const updateStatus = (id, newStatus) => {
    setJobs(prev =>
      prev.map(j => (j.id === id ? { ...j, status: newStatus } : j))
    )
  }

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setOpen(v => !v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Print Jobs">
        <Typography variant="h4" mb={2}>
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
          />
          <Select
            size="small"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
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
            { title: 'Total Jobs', value: totalJobs, gradient: 'linear-gradient(135deg,#10b981,#064e3b)' },
            { title: 'Pending Jobs', value: pendingJobs, gradient: 'linear-gradient(135deg,#f59e0b,#b45309)' },
            { title: 'Shipped Jobs', value: shippedJobs, gradient: 'linear-gradient(135deg,#3b82f6,#1e3a8a)' },
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
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={j.image}
                  alt={j.product}
                />
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {j.product}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customer: {j.customerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {j.quantity}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} alignItems="center" justifyContent="space-between">
                    <Chip
                      label={j.status}
                      color={
                        j.status === 'Shipped'
                          ? 'success'
                          : j.status === 'Received'
                          ? 'warning'
                          : j.status === 'Production'
                          ? 'info'
                          : 'default'
                      }
                      size="small"
                    />
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
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AdminPage>
    </Box>
  )
}
