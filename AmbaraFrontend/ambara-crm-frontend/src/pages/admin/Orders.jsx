import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Breadcrumbs,
  Link,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Card,
  CardContent,
  TextField
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'

export default function AdminOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [orders, setOrders] = useState([
    {
      id: 101,
      customerName: 'John Doe',
      product: 'Print Notes',
      quantity: 2,
      total: 2000,
      status: 'Pending',
      orderDate: '2025-10-20',
      operatorId: '',
      notes: 'Deliver between 9am-5pm'
    },
    {
      id: 102,
      customerName: 'Jane Smith',
      product: 'Photo Frames',
      quantity: 1,
      total: 800,
      status: 'Processing',
      orderDate: '2025-10-21',
      operatorId: 'op2',
      notes: ''
    },
    {
      id: 103,
      customerName: 'Alice Johnson',
      product: 'Photo copy of text books',
      quantity: 3,
      total: 300,
      status: 'Shipped',
      orderDate: '2025-10-22',
      operatorId: 'op1',
      notes: 'Gift wrap this order'
    }
  ])

  const [ops] = useState([
    { id: 'op1', name: 'Operator A' },
    { id: 'op2', name: 'Operator B' }
  ])

  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const handleView = (order) => {
    setSelectedOrder(order)
    setViewDialogOpen(true)
  }

  const handleCloseView = () => {
    setViewDialogOpen(false)
    setSelectedOrder(null)
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)))
  }

  const handleAssignOperator = (orderId, operatorId) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, operatorId } : o)))
  }

  const handleDelete = (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return
    setOrders(prev => prev.filter(o => o.id !== orderId))
  }

  const exportCSV = () => {
    if (!orders.length) return
    const header = ['id,customerName,product,quantity,total,status,orderDate,operatorId']
    const lines = orders.map(o =>
      [
        o.id,
        `"${o.customerName}"`,
        `"${(o.product || '').replace(/"/g, '""')}"`,
        o.quantity,
        o.total,
        o.status,
        o.orderDate,
        o.operatorId
      ].join(',')
    )
    const blob = new Blob([header.concat(lines).join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

  // Filtered orders based on search term and status
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || o.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1fdf5' }}>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />

      <AdminPage open={sidebarOpen} title="Orders">

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#064e3b' }}>Order Management</Typography>
          <Button
            variant="contained"
            onClick={exportCSV}
            sx={{ backgroundColor: '#10b981', '&:hover': { backgroundColor: '#059669' }, textTransform: 'none' }}
          >
            Export Orders CSV
          </Button>
        </Box>

        {/* Search and Filter */}
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Search Orders"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterStatus}
            size="small"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">All Status</MenuItem>
            {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </Box>

        {/* Orders Table */}
        <Card sx={{ backgroundColor: 'white', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Operator</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6, color: '#666' }}>
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.map((o) => (
                  <TableRow key={o.id} sx={{ '&:hover': { backgroundColor: '#f7fff8' } }}>
                    <TableCell>{o.id}</TableCell>
                    <TableCell>{o.customerName}</TableCell>
                    <TableCell>{o.product}</TableCell>
                    <TableCell>{o.quantity}</TableCell>
                    <TableCell>{o.total}</TableCell>
                    <TableCell>
                      <Select
                        value={o.status}
                        size="small"
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        sx={{ minWidth: 140 }}
                      >
                        {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={o.operatorId || ''}
                        displayEmpty
                        size="small"
                        onChange={(e) => handleAssignOperator(o.id, e.target.value)}
                        sx={{ minWidth: 160 }}
                      >
                        <MenuItem value="">Unassigned</MenuItem>
                        {ops.map(op => <MenuItem key={op.id} value={op.id}>{op.name}</MenuItem>)}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: '#064e3b', borderColor: '#064e3b', textTransform: 'none', borderRadius: 2 }}
                          onClick={() => handleView(o)}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          sx={{ textTransform: 'none', borderRadius: 2 }}
                          onClick={() => handleDelete(o.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Order Dialog */}
        <Dialog open={viewDialogOpen} onClose={handleCloseView} maxWidth="sm" fullWidth>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#064e3b' }}>Order ID: {selectedOrder.id}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography><strong>Customer:</strong> {selectedOrder.customerName}</Typography>
                <Typography><strong>Product:</strong> {selectedOrder.product}</Typography>
                <Typography><strong>Quantity:</strong> {selectedOrder.quantity}</Typography>
                <Typography><strong>Total:</strong> {selectedOrder.total}</Typography>
                <Typography><strong>Status:</strong> {selectedOrder.status}</Typography>
                <Typography><strong>Order Date:</strong> {selectedOrder.orderDate}</Typography>
                <Typography sx={{ mt: 1, fontWeight: 600 }}>Shipping / Notes</Typography>
                <Typography>{selectedOrder.notes || 'No notes provided.'}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseView}>Close</Button>
          </DialogActions>
        </Dialog>
      </AdminPage>
    </Box>
  )
}
