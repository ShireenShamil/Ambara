import React, { useState } from 'react'
import { Box, Typography, Paper, TextField, Button } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarCustomer from '../../components/SidebarCustomer'
import { useCRM } from '../../context/CRMContext'
import { api } from '../../api/crmApi'
import { useAuth } from '../../context/AuthContext'

export default function UserMessages() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { messages, reload } = useCRM()
  const { user } = useAuth()
  const [text, setText] = useState('')

  const handleSend = async () => {
    if (!text) return
    await api.addMessage({ id: Date.now().toString(), sender: user.name, text, date: new Date().toLocaleString() })
    setText('')
    reload()
  }

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarCustomer open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>Messages</Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField fullWidth placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} />
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleSend}>Send</Button>
        </Paper>
        <Paper sx={{ p: 2 }}>
          {messages.map(m => (
            <Box key={m.id} sx={{ mb: 1 }}>
              <Typography variant="subtitle2">{m.sender} - {m.date}</Typography>
              <Typography>{m.text}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  )
}
