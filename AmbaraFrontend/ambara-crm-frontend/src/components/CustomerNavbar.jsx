import React from 'react'
import { AppBar, Toolbar, IconButton, Box, Avatar, Badge } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuth } from '../context/AuthContext'

export default function CustomerNavbar() {
  const { user } = useAuth()

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        color: '#0E1A2B',
        borderBottom: '1px solid rgba(0,0,0,0.06)'
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton sx={{ mr: 1 }} aria-label="notifications">
          <Badge color="success" variant="dot">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>

        <IconButton sx={{ ml: 1 }} aria-label="profile">
          {user && user.avatar ? (
            <Avatar src={user.avatar} alt={user.name} />
          ) : (
            <AccountCircleIcon sx={{ fontSize: 28 }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
