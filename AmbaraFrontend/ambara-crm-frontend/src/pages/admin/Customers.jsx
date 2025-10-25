import React, { useState } from 'react'
import {
  Box,Typography,Card,CardContent,Button,Table,TableHead,TableRow,TableCell,TableBody,Breadcrumbs,Link,Dialog,DialogTitle,DialogContent,DialogActions,TextField,Select,MenuItem
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'

export default function Customer() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', address: 'Colombo, Sri Lanka', joinedDate: '2024-03-12' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', address: 'Galle, Sri Lanka', joinedDate: '2024-05-10' },
    { id: 3, name: 'Michael Lee', email: 'michael@example.com', address: 'Kandy, Sri Lanka', joinedDate: '2024-07-22' },
    { id: 4, name: 'Ayesha Fernando', email: 'ayesha.f@example.com', address: 'Negombo, Sri Lanka', joinedDate: '2024-08-15' },
    { id: 5, name: 'Ravi Perera', email: 'ravi.p@example.com', address: 'Matara, Sri Lanka', joinedDate: '2024-09-05' },
    { id: 6, name: 'Suresh Kumar', email: 'suresh.k@example.com', address: 'Jaffna, Sri Lanka', joinedDate: '2024-10-02' },
  ]

  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterYear, setFilterYear] = useState('All')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [formMode, setFormMode] = useState('Add') // Add or Edit

  // Filtered and paginated users (first 5)
  const filteredUsers = users
    .filter(u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(u => filterYear === 'All' || u.joinedDate.startsWith(filterYear))
    .slice(0, 5)

  const handleOpenAdd = () => { setFormMode('Add'); setCurrentUser({ name: '', email: '', address: '', joinedDate: '' }); setDialogOpen(true) }
  const handleOpenEdit = (user) => { setFormMode('Edit'); setCurrentUser(user); setDialogOpen(true) }
  const handleCloseDialog = () => { setDialogOpen(false); setCurrentUser(null) }

  const handleSave = () => {
    if (formMode === 'Add') {
      setUsers(prev => [...prev, { ...currentUser, id: prev.length + 1 }])
    } else {
      setUsers(prev => prev.map(u => (u.id === currentUser.id ? currentUser : u)))
    }
    setDialogOpen(false)
  }

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id))
    }
  }

  const handleView = (user) => { setCurrentUser(user); setViewDialogOpen(true) }
  const handleCloseView = () => { setViewDialogOpen(false); setCurrentUser(null) }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1fdf5' }}>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />

      <Box
        component="main"
        sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%', p: 3 }}
      >
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#064e3b', mb: 2, mt: 10 }}>
          <Link underline="always" color="#10B981" href="/admin/dashboard" sx={{ fontWeight: 500, fontSize: 17 }}>Dashboard</Link>
          <Typography color="#111413ff" sx={{ fontWeight: 500, fontSize: 17 }}>Customers</Typography>
        </Breadcrumbs>

        <Typography variant="h4" mb={3} sx={{ fontWeight: 700, color: '#064e3b' }}>Customer Management</Typography>

        {/* Search and Filter */}
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Search Customers"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterYear}
            size="small"
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <MenuItem value="All">All Years</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
          </Select>
          <Button variant="contained" sx={{ backgroundColor: '#10b981', '&:hover': { backgroundColor: '#059669' }, textTransform: 'none' }} onClick={handleOpenAdd}>
            + Add New
          </Button>
        </Box>

        {/* Customer Table */}
        <Card sx={{ backgroundColor: 'white', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Joined Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.joinedDate}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        <Button size="small" variant="outlined" sx={{ color: '#064e3b', borderColor: '#064e3b', textTransform: 'none', borderRadius: 2 }} onClick={() => handleView(user)}>View</Button>
                        <Button size="small" variant="contained" sx={{ backgroundColor: '#10b981', textTransform: 'none', borderRadius: 2, '&:hover': { backgroundColor: '#059669' } }} onClick={() => handleOpenEdit(user)}>Edit</Button>
                        <Button size="small" variant="outlined" color="error" sx={{ textTransform: 'none', borderRadius: 2 }} onClick={() => handleDelete(user)}>Delete</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{formMode} Customer</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="Name" value={currentUser?.name || ''} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} />
            <TextField label="Email" value={currentUser?.email || ''} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
            <TextField label="Address" value={currentUser?.address || ''} onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })} />
            <TextField label="Joined Date" type="date" value={currentUser?.joinedDate || ''} onChange={(e) => setCurrentUser({ ...currentUser, joinedDate: e.target.value })} InputLabelProps={{ shrink: true }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" sx={{ backgroundColor: '#10b981', '&:hover': { backgroundColor: '#059669' } }} onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={viewDialogOpen} onClose={handleCloseView}>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogContent>
            {currentUser && (
              <Box>
                <Typography><strong>Name:</strong> {currentUser.name}</Typography>
                <Typography><strong>Email:</strong> {currentUser.email}</Typography>
                <Typography><strong>Address:</strong> {currentUser.address}</Typography>
                <Typography><strong>Joined Date:</strong> {currentUser.joinedDate}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseView}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
