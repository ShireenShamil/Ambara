import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography, Box, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import { useCRM } from '../../context/CRMContext'
import { api } from '../../api/crmApi'
import SalesChart from '../../components/Charts/SalesChart'
import CustomerChart from '../../components/Charts/CustomerChart'
import { Link as RouterLink } from 'react-router-dom'

export default function Dashboard(){
  const [counts, setCounts] = useState({ users:0, products:0, orders:0 })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const [users, products, orders] = await Promise.all([api.getUsers(), api.getProducts(), api.getOrders()])
        if(!mounted) return
        setCounts({ users: users.length, products: products.length, orders: orders.length })
        // join orders with customer name
        const userMap = Object.fromEntries((users||[]).map(u=>[u.id, u]))
        const recent = (orders||[]).slice().reverse().slice(0,5).map(o=>({ ...o, customerName: userMap[o.customerId]?.name || userMap[o.customerId]?.email || o.customerId }))
        setRecentOrders(recent)
      }catch(e){
        console.error('Failed to load dashboard data', e)
      }
    }
    load()
    return ()=>{ mounted = false }
  },[])

  return (
    <Box sx={{p:3}}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card sx={{bgcolor:'#e8f5e9'}}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Total Customers</Typography>
              <Typography variant="h5">{counts.users}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{bgcolor:'#f1f8e9'}}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Products</Typography>
              <Typography variant="h5">{counts.products}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{bgcolor:'#fff3e0'}}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Total Orders</Typography>
              <Typography variant="h5">{counts.orders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{bgcolor:'#e3f2fd'}}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">New This Week</Typography>
              <Typography variant="h5">{Math.max(0, Math.floor(Math.random()*10))}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{p:2}}>
            <Typography variant="h6">Sales Overview</Typography>
            <Box sx={{height:240, mt:2}}>
              <SalesChart />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{p:2}}>
            <Typography variant="h6">Customers</Typography>
            <Box sx={{height:240, mt:2}}>
              <CustomerChart />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{p:2}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Typography variant="h6">Recent Orders</Typography>
              <Box>
                <Button component={RouterLink} to="/admin/products" variant="contained" sx={{mr:1}}>Add Product</Button>
                <Button component={RouterLink} to="/admin/messages" variant="outlined">View Messages</Button>
              </Box>
            </Box>

            <Table size="small" sx={{mt:2}}>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map(o => (
                  <TableRow key={o.id}>
                    <TableCell>{o.id}</TableCell>
                    <TableCell>{o.customerName}</TableCell>
                    <TableCell>{o.total ?? o.items?.reduce((s,i)=>s + (i.price||0) * (i.qty||1), 0) ?? '-'}</TableCell>
                    <TableCell>{o.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{p:2}}>
            <Typography variant="h6">Quick Actions</Typography>
            <Box sx={{display:'flex', flexDirection:'column', gap:1, mt:2}}>
              <Button component={RouterLink} to="/admin/products" variant="contained">Manage Products</Button>
              <Button component={RouterLink} to="/admin/orders" variant="outlined">Manage Orders</Button>
              <Button component={RouterLink} to="/admin/customers" variant="outlined">Manage Customers</Button>
              <Button component={RouterLink} to="/admin/settings" color="error">Settings</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
