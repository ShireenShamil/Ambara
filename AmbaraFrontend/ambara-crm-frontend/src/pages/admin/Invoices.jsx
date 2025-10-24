import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  MenuItem,
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import PrintIcon from '@mui/icons-material/Print'
import DownloadIcon from '@mui/icons-material/Download'

export default function Invoices() {
  const [open, setOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Dummy invoice data
  const [invoices, setInvoices] = useState([
    {
      id: 'INV001',
      customer: 'Alice Smith',
      date: '2025-10-01',
      total: 150,
      status: 'Paid',
    },
    {
      id: 'INV002',
      customer: 'Bob Johnson',
      date: '2025-10-03',
      total: 250,
      status: 'Pending',
    },
    {
      id: 'INV003',
      customer: 'Charlie Lee',
      date: '2025-10-05',
      total: 75,
      status: 'Overdue',
    },
    {
      id: 'INV004',
      customer: 'Diana Prince',
      date: '2025-10-08',
      total: 320,
      status: 'Paid',
    },
  ])

  const filteredInvoices = invoices.filter(
    inv =>
      (!statusFilter || inv.status === statusFilter) &&
      (inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer.toLowerCase().includes(search.toLowerCase()))
  )

  const getStatusColor = status => {
    switch (status) {
      case 'Paid':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Overdue':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setOpen(v => !v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Invoices">
        <Typography variant="h4" mb={2}>
          Invoices
        </Typography>

        {/* Search & Filter */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          mb={3}
          alignItems="center"
        >
          <TextField
            placeholder="Search by ID or Customer"
            variant="outlined"
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            fullWidth
          />
          <TextField
            select
            size="small"
            label="Filter Status"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </TextField>
        </Stack>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={3}>
          {[
            { title: 'Total Invoices', value: invoices.length, gradient: 'linear-gradient(135deg,#10b981,#064e3b)' },
            {
              title: 'Paid',
              value: invoices.filter(i => i.status === 'Paid').length,
              gradient: 'linear-gradient(135deg,#3b82f6,#1e3a8a)',
            },
            {
              title: 'Pending',
              value: invoices.filter(i => i.status === 'Pending').length,
              gradient: 'linear-gradient(135deg,#f59e0b,#b45309)',
            },
            {
              title: 'Overdue',
              value: invoices.filter(i => i.status === 'Overdue').length,
              gradient: 'linear-gradient(135deg,#ef4444,#b91c1c)',
            },
          ].map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                sx={{
                  background: s.gradient,
                  color: '#fff',
                  borderRadius: 3,
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle2">{s.title}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {s.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Invoice Table */}
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Total ($)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices.map(inv => (
                <TableRow key={inv.id} hover>
                  <TableCell>{inv.id}</TableCell>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell align="right">{inv.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={inv.status}
                      color={getStatusColor(inv.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Print">
                        <Button size="small" variant="outlined">
                          <PrintIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Download PDF">
                        <Button size="small" variant="outlined" color="secondary">
                          <DownloadIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </AdminPage>
    </Box>
  )
}
