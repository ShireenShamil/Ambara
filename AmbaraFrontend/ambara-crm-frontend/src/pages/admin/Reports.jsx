
import React, { useState } from 'react'
import {
  Box,Typography,Card,CardContent,Button,Grid,TextField,Table,TableHead,TableRow,TableCell,TableBody,Paper,MenuItem,Select,InputLabel,
FormControl, Dialog,DialogTitle,DialogContent,DialogActions,
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample sales data
const salesData = [
  { day: 'Mon', revenue: 1200, orders: 30 },
  { day: 'Tue', revenue: 1500, orders: 45 },
  { day: 'Wed', revenue: 1100, orders: 25 },
  { day: 'Thu', revenue: 1800, orders: 60 },
  { day: 'Fri', revenue: 2000, orders: 75 },
  { day: 'Sat', revenue: 1700, orders: 50 },
  { day: 'Sun', revenue: 2200, orders: 80 },
]

// Sample orders data
const sampleOrders = [
  { id: 1, customer: 'Amal', total: '$120', status: 'Delivered', date: '2025-10-01' },
  { id: 2, customer: 'Saman', total: '$80', status: 'Pending', date: '2025-10-02' },
  { id: 3, customer: 'Nimali', total: '$50', status: 'Shipped', date: '2025-10-03' },
  { id: 4, customer: 'Ravi', total: '$200', status: 'Delivered', date: '2025-10-04' },
]

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchOrder, setSearchOrder] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState(null)

  const filteredOrders = sampleOrders.filter(
    o =>
      o.customer.toLowerCase().includes(searchOrder.toLowerCase()) &&
      (statusFilter === 'All' || o.status === statusFilter)
  )

  // Function to download CSV
  const downloadCSV = () => {
    const headers = ['ID', 'Customer', 'Total', 'Status', 'Date']
    const rows = filteredOrders.map(o => [o.id, o.customer, o.total, o.status, o.date])
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'orders_report.csv')
    link.click()
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1fdf5' }}>
      <Navbar toggleSidebar={() => setSidebarOpen(v => !v)} />
      <SidebarAdmin open={sidebarOpen} />

      <AdminPage open={sidebarOpen} title="Reports">
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#064e3b', mb: 3 }}>
          Reports & Analytics
        </Typography>

        {/* Sales Analytics */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Sales Analytics</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
              <YAxis yAxisId="right" orientation="right" stroke="#064e3b" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#064e3b" />
            </LineChart>
          </ResponsiveContainer>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#10b981', textTransform: 'none', '&:hover': { backgroundColor: '#059669' } }}
              onClick={() => setDialogContent(
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={salesData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                    <YAxis yAxisId="right" orientation="right" stroke="#064e3b" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#064e3b" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            >
              View Full Charts
            </Button>
          </Box>
        </Card>

        {/* Order Reports */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Order Reports</Typography>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="Search Customer"
              size="small"
              value={searchOrder}
              onChange={e => setSearchOrder(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} label="Status Filter">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" sx={{ backgroundColor: '#10b981', textTransform: 'none', '&:hover': { backgroundColor: '#059669' } }} onClick={downloadCSV}>
              Download Reports
            </Button>
          </Box>
          <Paper sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#ecfdf5' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Card>

        {/* Finance Reports */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Finance Reports</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, backgroundColor: '#d1fae5', borderRadius: 2 }}>
                <Typography>Total Revenue</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>$10,500</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, backgroundColor: '#d1fae5', borderRadius: 2 }}>
                <Typography>Total Expenses</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>$4,300</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, backgroundColor: '#d1fae5', borderRadius: 2 }}>
                <Typography>Net Profit</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>$6,200</Typography>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#10b981', textTransform: 'none', '&:hover': { backgroundColor: '#059669' } }}
              onClick={() => setDialogContent(
                <Box>
                  <Typography variant="h6">Detailed Finance Report</Typography>
                  <Typography>Total Revenue: $10,500</Typography>
                  <Typography>Total Expenses: $4,300</Typography>
                  <Typography>Net Profit: $6,200</Typography>
                  <Typography>More charts and breakdowns can go here...</Typography>
                </Box>
              )}
            >
              View Full Finance
            </Button>
          </Box>
        </Card>

        {/* Dialog */}
        <Dialog open={!!dialogContent} onClose={() => setDialogContent(null)} maxWidth="lg" fullWidth>
          <DialogTitle>Details</DialogTitle>
          <DialogContent>{dialogContent}</DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogContent(null)} sx={{ textTransform: 'none' }}>Close</Button>
          </DialogActions>
        </Dialog>
      </AdminPage>
    </Box>
  )
}
