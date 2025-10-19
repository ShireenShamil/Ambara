import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, Button, Select, MenuItem } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import { api } from '../../api/crmApi'
import AdminPage from '../../components/AdminPage'

export default function PrintJobs(){
  const [open, setOpen] = useState(true)
  const [jobs, setJobs] = useState([])

  async function load(){
    const ord = await api.getOrders()
    setJobs(ord.map(o=>({ ...o })))
  }

  useEffect(()=>{ load() },[])

  return (
    <Box display="flex">
      <Navbar toggleSidebar={()=>setOpen(v=>!v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Print Jobs">
        <Typography variant="h4" mb={2}>Print Jobs Queue</Typography>
        <Paper sx={{p:2}}>
          {jobs.map(j => (
            <Box key={j.id} sx={{display:'flex', justifyContent:'space-between', alignItems:'center', p:1, borderBottom:'1px solid #eee'}}>
              <Box>
                <Typography><strong>{j.id}</strong> — {j.customerId}</Typography>
                <Typography variant="body2">Status: {j.status}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Select size="small" value={j.status} onChange={async (e)=>{ await api.updateOrderStatus(j.id, e.target.value); load() }}>
                  <MenuItem value="Received">Received</MenuItem>
                  <MenuItem value="Production">Production</MenuItem>
                  <MenuItem value="QA">QA</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                </Select>
                <Button variant="contained" color="success" onClick={()=>{ /* open job detail */ }}>Open</Button>
              </Box>
            </Box>
          ))}
        </Paper>
      </AdminPage>
    </Box>
  )
}
