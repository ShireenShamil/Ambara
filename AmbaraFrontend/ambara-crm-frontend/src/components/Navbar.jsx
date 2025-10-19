import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth()
  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }} className="logo-title">
          Ambara CRM
        </Typography>
        {user && (
          <Box>
            <Typography component="span" sx={{ mr: 2 }}>
              {user.name} ({user.role})
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
