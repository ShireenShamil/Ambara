import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'

export default function Notifications(){
  const [open, setOpen] = React.useState(true)
  return (
    <Box display="flex">
      <Navbar toggleSidebar={()=>setOpen(v=>!v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Notifications">
        <Typography variant="h4" mb={2}>Notifications</Typography>
        <Paper sx={{p:2}}>System notifications and production alerts will appear here.</Paper>
      </AdminPage>
    </Box>
  )
}
