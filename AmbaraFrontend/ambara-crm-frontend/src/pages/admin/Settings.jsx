import React, { useState } from 'react'
import { Box, Typography, Paper, TextField, Button } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import { useAuth } from '../../context/AuthContext'

export default function AdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const handleUpdate = () => {
    alert('Settings updated (mock)')
  }

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>Settings</Typography>
        <Paper sx={{ p: 3, maxWidth: 500 }}>
          <TextField fullWidth label="Name" margin="normal" value={name} onChange={e => setName(e.target.value)} />
          <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpdate}>Update</Button>
        </Paper>
      </Box>
    </Box>
  )
}
