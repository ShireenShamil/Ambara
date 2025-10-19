import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'

export default function Invoices(){
  const [open, setOpen] = React.useState(true)
  return (
    <Box display="flex">
      <Navbar toggleSidebar={()=>setOpen(v=>!v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Invoices">
        <Typography variant="h4" mb={2}>Invoices</Typography>
        <Paper sx={{p:2}}>List of invoices and printable views. (PDF generation can be added)</Paper>
      </AdminPage>
    </Box>
  )
}
