import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TableCRUD from '../../components/TableCRUD'
import { useCRM } from '../../context/CRMContext'

export default function AdminMessages() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { messages } = useCRM()

  const columns = [
    { field: 'id', headerName: 'Message ID', width: 150 },
    { field: 'sender', headerName: 'Sender', width: 150 },
    { field: 'text', headerName: 'Message', width: 300 },
    { field: 'date', headerName: 'Date', width: 150 }
  ]

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>Messages</Typography>
        <TableCRUD rows={messages} columns={columns} editable={true} />
      </Box>
    </Box>
  )
}
