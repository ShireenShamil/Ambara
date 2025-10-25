import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Chip,
  Button,
  TextField,
  Tooltip,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import PrintIcon from '@mui/icons-material/Print'
import DownloadIcon from '@mui/icons-material/Download'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer } from 'recharts'

const profileImages = {
  'Alice Smith': 'https://i.pravatar.cc/150?img=1',
  'Bob Johnson': 'https://i.pravatar.cc/150?img=2',
  'Charlie Lee': 'https://i.pravatar.cc/150?img=3',
  'Diana Prince': 'https://i.pravatar.cc/150?img=4',
}

export default function Invoices() {
  const [open, setOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const [invoices] = useState([
    { id: 'INV001', customer: 'Alice Smith', date: '2025-10-01', total: 150, status: 'Paid' },
    { id: 'INV002', customer: 'Bob Johnson', date: '2025-10-03', total: 250, status: 'Pending' },
    { id: 'INV003', customer: 'Charlie Lee', date: '2025-10-05', total: 75, status: 'Overdue' },
    { id: 'INV004', customer: 'Diana Prince', date: '2025-10-08', total: 320, status: 'Paid' },
    { id: 'INV005', customer: 'Alice Smith', date: '2025-10-12', total: 220, status: 'Pending' },
    { id: 'INV006', customer: 'Charlie Lee', date: '2025-10-16', total: 110, status: 'Paid' },
  ])

  const revenueData = [
    { month: 'May', revenue: 400 },
    { month: 'Jun', revenue: 800 },
    { month: 'Jul', revenue: 650 },
    { month: 'Aug', revenue: 900 },
    { month: 'Sep', revenue: 700 },
    { month: 'Oct', revenue: 1100 },
  ]

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

  const totalRevenue = invoices.reduce((sum, i) => sum + i.total, 0)
  const paidRevenue = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + i.total, 0)
  const pendingRevenue = invoices
    .filter(i => i.status === 'Pending')
    .reduce((sum, i) => sum + i.total, 0)
  const overdueRevenue = invoices
    .filter(i => i.status === 'Overdue')
    .reduce((sum, i) => sum + i.total, 0)

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setOpen(v => !v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Invoices">
        <Typography variant="h4" mb={2} fontWeight={700}>
          Invoices
        </Typography>

        {/* Filters */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3} alignItems="center">
          <TextField
            placeholder="Search by ID or Customer"
            variant="outlined"
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            width={300}
          />
          <TextField
            select
            size="small"
            label="Filter Status"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            width={200}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </TextField>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="primary" startIcon={<FileDownloadIcon />}>
              Export CSV
            </Button>
            <Button variant="contained" color="secondary" startIcon={<DownloadIcon />}>
              Export PDF
            </Button>
          </Stack>
        </Stack>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={3}>
          {[
            { title: 'Total Invoices', value: invoices.length, gradient: 'linear-gradient(135deg,#10b981,#064e3b)' },
            { title: 'Total Revenue', value: `$${totalRevenue}`, gradient: 'linear-gradient(135deg,#3b82f6,#1e3a8a)' },
            { title: 'Paid Revenue', value: `$${paidRevenue}`, gradient: 'linear-gradient(135deg,#22c55e,#166534)' },
            { title: 'Pending Amount', value: `$${pendingRevenue}`, gradient: 'linear-gradient(135deg,#f59e0b,#b45309)' },
            { title: 'Overdue Amount', value: `$${overdueRevenue}`, gradient: 'linear-gradient(135deg,#ef4444,#b91c1c)' },
          ].map((s, i) => (
            <Grid item xs={12} sm={6} md={2.4} key={i}>
              <Card
                sx={{
                  background: s.gradient,
                  color: '#fff',
                  borderRadius: 3,
                  p: 2,
                  textAlign: 'center',
                  boxShadow: 3,
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

        {/* Revenue Chart */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" mb={2}>
            Monthly Revenue Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartTooltip />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

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
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar src={profileImages[inv.customer]} alt={inv.customer} sx={{ width: 32, height: 32 }} />
                      <Typography>{inv.customer}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell align="right">{inv.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip label={inv.status} color={getStatusColor(inv.status)} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View Details">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => setSelectedInvoice(inv)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Tooltip>
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

        {/* Invoice Detail Modal */}
        <Dialog open={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} maxWidth="sm" fullWidth>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogContent dividers>
            {selectedInvoice && (
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={profileImages[selectedInvoice.customer]} sx={{ width: 50, height: 50 }} />
                  <Box>
                    <Typography variant="h6">{selectedInvoice.customer}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Customer ID: #{selectedInvoice.id}
                    </Typography>
                  </Box>
                </Stack>
                <Typography>Date: {selectedInvoice.date}</Typography>
                <Typography>Total Amount: ${selectedInvoice.total}</Typography>
                <Typography>Status: {selectedInvoice.status}</Typography>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedInvoice(null)}>Close</Button>
            <Button variant="contained" color="primary" startIcon={<PrintIcon />}>
              Print
            </Button>
          </DialogActions>
        </Dialog>
      </AdminPage>
    </Box>
  )
}
