import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'

export default function Reports(){
  const [open, setOpen] = React.useState(true)
  return (
    <Box display="flex">
      <Navbar toggleSidebar={()=>setOpen(v=>!v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Reports">
        <Typography variant="h4" mb={2}>Reports</Typography>
        <Paper sx={{p:2}}>Generate sales reports, production reports and exportables here.</Paper>
      </AdminPage>
    </Box>
  )
}
