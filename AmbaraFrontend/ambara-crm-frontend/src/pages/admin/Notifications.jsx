import React, { useState } from 'react'
import {
  Box, Typography, Paper, Grid, Card, CardContent, Chip, Stack, Avatar,
  Button, IconButton, Tooltip, Tabs, Tab, TextField, Drawer, Divider, Fade, Badge
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'

export default function Notifications() {
  const [open, setOpen] = useState(true)
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order #P001 Shipped', message: 'Your order #P001 has been shipped successfully.', type: 'Info', status: 'Unread', time: '2 mins ago' },
    { id: 2, title: 'Low Stock Alert: Custom T-Shirt', message: 'Only 3 units left for Custom T-Shirt.', type: 'Warning', status: 'Unread', time: '10 mins ago' },
    { id: 3, title: 'New Template Uploaded', message: 'A new design template has been uploaded to your account.', type: 'Info', status: 'Read', time: '1 hour ago' },
    { id: 4, title: 'Payment Failed: Order #P003', message: 'Payment failed for order #P003. Please retry.', type: 'Error', status: 'Unread', time: '2 hours ago' },
    { id: 5, title: 'Monthly Report Generated', message: 'Your monthly report is ready for download.', type: 'Info', status: 'Read', time: 'Yesterday' },
  ])

  const getTypeColor = (type) => {
    switch (type) {
      case 'Info': return '#16a34a'
      case 'Warning': return '#f59e0b'
      case 'Error': return '#dc2626'
      default: return '#9ca3af'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Info': return <InfoIcon />
      case 'Warning': return <WarningIcon />
      case 'Error': return <ErrorIcon />
      default: return <NotificationsIcon />
    }
  }

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'Read' } : n))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleRefresh = () => {
    const newItem = {
      id: Date.now(),
      title: 'System Check Complete',
      message: 'The daily system integrity check finished successfully.',
      type: 'Info',
      status: 'Unread',
      time: 'Just now',
    }
    setNotifications(prev => [newItem, ...prev])
  }

  const unreadCount = notifications.filter(n => n.status === 'Unread').length
  const filtered = notifications.filter(n =>
    (tab === 'All' || n.type === tab) &&
    n.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box display="flex" sx={{ minHeight: '100vh' }}>
      <Navbar toggleSidebar={() => setOpen(v => !v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Notifications">
        <Fade in timeout={500}>
          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h4" fontWeight={700} sx={{ color: '#14532d' }}>
                Notifications Center
              </Typography>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon sx={{ color: '#15803d', fontSize: 30 }} />
              </Badge>
            </Stack>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg,#15803d,#16a34a)',
                  color: 'white', boxShadow: 3,
                  '&:hover': { boxShadow: 6, background: 'linear-gradient(90deg,#166534,#15803d)' }
                }}
                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, status: 'Read' })))}
              >
                Mark All as Read
              </Button>

              <Button
                variant="outlined"
                color="error"
                sx={{ fontWeight: 600 }}
                onClick={() => setNotifications([])}
              >
                Clear All
              </Button>

              <Button
                startIcon={<RefreshIcon />}
                sx={{
                  background: 'linear-gradient(90deg,#22c55e,#16a34a)',
                  color: 'white',
                  '&:hover': { background: 'linear-gradient(90deg,#15803d,#166534)' }
                }}
                onClick={handleRefresh}
              >
                Refresh
              </Button>

              <TextField
                variant="outlined"
                size="small"
                placeholder="Search notifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                  sx: { borderRadius: '12px', background: 'white' }
                }}
                sx={{ width: 250 }}
              />
            </Stack>

            {/* Tabs */}
            <Paper
              sx={{
                display: 'inline-flex',
                p: 0.5,
                mb: 3,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Tabs
                value={tab}
                onChange={(e, v) => setTab(v)}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                sx={{
                  minHeight: 45,
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, color: '#14532d' },
                  '& .Mui-selected': { color: '#16a34a' }
                }}
              >
                <Tab label="All" value="All" />
                <Tab label="Info" value="Info" />
                <Tab label="Warning" value="Warning" />
                <Tab label="Error" value="Error" />
              </Tabs>
            </Paper>

            {/* Notification Cards */}
            <Grid container spacing={3}>
              {filtered.map(n => (
                <Grid item xs={12} sm={6} md={4} key={n.id}>
                  <Card
                    onClick={() => setSelected(n)}
                    sx={{
                      p: 1.5,
                      borderRadius: '20px',
                      background: 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(12px)',
                      border: `2px solid ${n.status === 'Unread' ? '#16a34a' : '#e5e7eb'}`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                      },
                      cursor: 'pointer'
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar sx={{
                            bgcolor: getTypeColor(n.type),
                            width: 42,
                            height: 42,
                            boxShadow: `0 0 10px ${getTypeColor(n.type)}55`
                          }}>
                            {getTypeIcon(n.type)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>{n.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{n.time}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          {n.status === 'Unread' && (
                            <Tooltip title="Mark as Read">
                              <IconButton color="success" size="small" onClick={(e) => { e.stopPropagation(); markAsRead(n.id) }}>
                                <CheckCircleIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Delete">
                            <IconButton color="error" size="small" onClick={(e) => { e.stopPropagation(); deleteNotification(n.id) }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                      <Chip
                        label={n.status}
                        size="small"
                        sx={{
                          mt: 1.5,
                          fontWeight: 600,
                          background: n.status === 'Unread' ? '#dcfce7' : '#f3f4f6',
                          color: n.status === 'Unread' ? '#15803d' : '#6b7280'
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}

              {filtered.length === 0 && (
                <Grid item xs={12}>
                  <Paper sx={{
                    p: 4, textAlign: 'center', borderRadius: '16px',
                    background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)'
                  }}>
                    <Typography variant="h6" color="text.secondary">
                      No notifications found.
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>

            {/* Drawer */}
            <Drawer
              anchor="right"
              open={!!selected}
              onClose={() => setSelected(null)}
              PaperProps={{
                sx: {
                  width: 380,
                  p: 3,
                  borderRadius: '16px 0 0 16px',
                  background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                }
              }}
            >
              {selected && (
                <>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{
                        bgcolor: getTypeColor(selected.type),
                        width: 44, height: 44
                      }}>
                        {getTypeIcon(selected.type)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>{selected.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{selected.time}</Typography>
                      </Box>
                    </Stack>
                    <IconButton onClick={() => setSelected(null)}>
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                    {selected.message}
                  </Typography>
                  <Chip
                    label={selected.status}
                    size="small"
                    sx={{
                      background: selected.status === 'Unread' ? '#dcfce7' : '#f3f4f6',
                      color: selected.status === 'Unread' ? '#15803d' : '#6b7280'
                    }}
                  />
                  <Stack direction="row" spacing={2} mt={3}>
                    {selected.status === 'Unread' && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => { markAsRead(selected.id); setSelected({ ...selected, status: 'Read' }) }}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button variant="outlined" color="error" onClick={() => { deleteNotification(selected.id); setSelected(null) }}>
                      Delete
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
