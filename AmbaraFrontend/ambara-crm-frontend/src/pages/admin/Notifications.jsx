import React, { useState } from 'react'
import { 
  Box, Typography, Paper, Grid, Card, CardContent, Chip, Stack, Avatar, Button, IconButton, Tooltip 
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Notifications() {
  const [open, setOpen] = useState(true)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order #P001 Shipped', type: 'Info', status: 'Unread', time: '2 mins ago' },
    { id: 2, title: 'Low Stock Alert: Custom T-Shirt', type: 'Warning', status: 'Unread', time: '10 mins ago' },
    { id: 3, title: 'New Template Uploaded', type: 'Info', status: 'Read', time: '1 hour ago' },
    { id: 4, title: 'Payment Failed: Order #P003', type: 'Error', status: 'Unread', time: '2 hours ago' },
    { id: 5, title: 'Monthly Report Generated', type: 'Info', status: 'Read', time: 'Yesterday' },
  ])

  const getTypeColor = (type) => {
    switch(type){
      case 'Info': return 'primary'
      case 'Warning': return 'warning'
      case 'Error': return 'error'
      default: return 'default'
    }
  }

  const getTypeIcon = (type) => {
    switch(type){
      case 'Info': return <NotificationsIcon />
      case 'Warning': return <WarningIcon />
      case 'Error': return <ErrorIcon />
      default: return <NotificationsIcon />
    }
  }

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, status: 'Read'} : n))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setOpen(v => !v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Notifications">
        <Typography variant="h4" mb={2}>Notifications</Typography>
        
        {/* Quick actions */}
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" color="primary" onClick={() => setNotifications(prev => prev.map(n => ({...n, status: 'Read'})))}>
            Mark All as Read
          </Button>
          <Button variant="outlined" color="error" onClick={() => setNotifications([])}>
            Clear All
          </Button>
        </Stack>

        <Grid container spacing={2}>
          {notifications.map(n => (
            <Grid item xs={12} sm={6} md={4} key={n.id}>
              <Card 
                sx={{ 
                  borderLeft: n.status === 'Unread' ? '4px solid #2E7D32' : '4px solid #ccc', 
                  '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.1)' },
                  cursor: 'pointer'
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ bgcolor: getTypeColor(n.type), width: 36, height: 36 }}>
                        {getTypeIcon(n.type)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">{n.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{n.time}</Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      {n.status === 'Unread' && (
                        <Tooltip title="Mark as Read">
                          <IconButton size="small" color="success" onClick={() => markAsRead(n.id)}>
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => deleteNotification(n.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                  <Chip 
                    label={n.status} 
                    color={n.status === 'Unread' ? 'success' : 'default'} 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
          {notifications.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography>No notifications found.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </AdminPage>
    </Box>
  )
}
