import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Divider,
  Tooltip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth()

  const [anchorNotif, setAnchorNotif] = useState(null)
  const [anchorProfile, setAnchorProfile] = useState(null)

  const handleNotifOpen = (event) => setAnchorNotif(event.currentTarget)
  const handleNotifClose = () => setAnchorNotif(null)

  const handleProfileOpen = (event) => setAnchorProfile(event.currentTarget)
  const handleProfileClose = () => setAnchorProfile(null)

  const notifications = [
    { id: 1, message: 'New task assigned: Design Review' },
    { id: 2, message: 'Invoice #102 has been approved' },
    { id: 3, message: 'New message from client - ZenTech' },
  ]

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background:  '#00a862',
        color: '#ecfdf5',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Toolbar>
        {/* Sidebar Toggle */}
        <IconButton
          edge="start"
          sx={{
            color: '#ecfdf5',
            mr: 2,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.15)',
              transform: 'scale(1.05)',
              transition: '0.3s',
            },
          }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 1,
            color: '#ecfdf5',
          }}
        >
          Ambara CRM
        </Typography>

        {/* Right Section */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                onClick={handleNotifOpen}
                sx={{
                  color: '#ecfdf5',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    transform: 'scale(1.05)',
                    transition: '0.3s',
                  },
                }}
              >
                <Badge
                  badgeContent={notifications.length}
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: '#f87171', // red for unread
                      color: '#fff',
                    },
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorNotif}
              open={Boolean(anchorNotif)}
              onClose={handleNotifClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { bgcolor: '#f9fdfc', color: '#00332e', minWidth: 240 },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ px: 2, pt: 1, fontWeight: 600 }}
              >
                Notifications
              </Typography>
              <Divider />
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <MenuItem key={notif.id} onClick={handleNotifClose}>
                    {notif.message}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No new notifications</MenuItem>
              )}
            </Menu>

            {/* Profile */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileOpen}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    transform: 'scale(1.05)',
                    transition: '0.3s',
                  },
                }}
              >
                {user?.profileImage ? (
                  <Avatar
                    src={user.profileImage}
                    alt={user.name}
                    sx={{ width: 36, height: 36 }}
                  />
                ) : (
                  <Avatar sx={{ bgcolor: '#00a862' }}>
                    <AccountCircleIcon />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorProfile}
              open={Boolean(anchorProfile)}
              onClose={handleProfileClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { bgcolor: '#f9fdfc', color: '#00332e', minWidth: 200 },
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {user.role}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleProfileClose()
                  logout()
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
