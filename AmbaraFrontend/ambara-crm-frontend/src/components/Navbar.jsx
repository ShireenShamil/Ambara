import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth()

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #064e3b 0%, #10b981 100%)',
        color: '#ecfdf5',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Toolbar>
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

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          Ambara CRM
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component="span"
              sx={{
                mr: 2,
                fontWeight: 500,
                color: '#d1fae5',
              }}
            >
              {user.name} ({user.role})
            </Typography>
            <Button
              variant="contained"
              onClick={logout}
              sx={{
                backgroundColor: '#047857',
                color: '#ecfdf5',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#065f46',
                  transform: 'scale(1.05)',
                  transition: '0.3s',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
