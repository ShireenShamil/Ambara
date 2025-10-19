import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Select, MenuItem, TextField } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TableCRUD from '../../components/TableCRUD'
import { useCRM } from '../../context/CRMContext'
import { api } from '../../api/crmApi'
import AdminPage from '../../components/AdminPage'

export default function AdminOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { orders } = useCRM()
  const [ops, setOps] = useState([])

  useEffect(()=>{
    // derive operators from users if available
    api.getUsers().then(u=>setOps(u.filter(x=>x.role!=='user'))).catch(()=>{})
  },[])

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'customerId', headerName: 'Customer ID', width: 150 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 }
  ]

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarAdmin open={sidebarOpen} />
      <AdminPage open={sidebarOpen} title="Orders">
        <Typography variant="h4" mb={2}>Orders</Typography>
        <Box mb={2} display="flex" gap={2}>
          <Button variant="contained" onClick={() => {
            // export CSV
            const csv = [Object.keys(columns.reduce((acc, c)=>({ ...acc, [c.field]: ''}), {})).join(',')]
            // simple export of orders
            const lines = orders.map(o => [o.id, o.customerId, o.total, o.status].join(','))
            const blob = new Blob([csv.concat(lines).join('\n')], { type: 'text/csv' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a'); a.href = url; a.download = 'orders.csv'; a.click(); URL.revokeObjectURL(url)
          }}>Export Orders CSV</Button>
          <TextField select size="small" label="Assign Operator" sx={{width:220}}>
            {ops.map(o=> <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)}
          </TextField>
        </Box>

        <TableCRUD rows={orders} columns={columns} editable={false} />
      </AdminPage>
    </Box>
  )
}
