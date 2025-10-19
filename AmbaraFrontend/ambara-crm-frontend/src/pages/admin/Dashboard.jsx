import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography, Box, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Avatar } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import { useCRM } from '../../context/CRMContext'
import { api } from '../../api/crmApi'
import SalesChart from '../../components/Charts/SalesChart'
import CustomerChart from '../../components/Charts/CustomerChart'
import { Link as RouterLink } from 'react-router-dom'

export default function Dashboard(){
  const [open, setOpen] = useState(true)
  const toggleSidebar = () => setOpen(v => !v)
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
    // poll every 3s for new orders (simulate realtime)
    const iv = setInterval(() => { load() }, 3000)
    return ()=>{ mounted = false }
  },[])

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <SidebarAdmin open={open} />

      <AdminPage open={open} title="Dashboard">
        <Grid container spacing={2}>
        {[{
          title: 'Total Customers', value: counts.users, icon: <PeopleIcon />, color: '#e8f5e9'
        },{
          title: 'Products', value: counts.products, icon: <Inventory2Icon />, color: '#f1f8e9'
        },{
          title: 'Total Orders', value: counts.orders, icon: <ShoppingCartIcon />, color: '#fff3e0'
        },{
          title: 'Growth', value: Math.max(0, Math.floor(Math.random()*12)) + '%', icon: <TrendingUpIcon />, color: '#e3f2fd'
        }].map((s, i) => (
          <Grid item xs={12} md={3} key={i}>
            <Card sx={{bgcolor: s.color}}>
              <CardContent sx={{display:'flex', alignItems:'center', gap:2}}>
                <Avatar sx={{bgcolor:'#fff', color:'#2E7D32'}}>{s.icon}</Avatar>
                <Box sx={{flex:1}}>
                  <Typography variant="subtitle2" color="text.secondary">{s.title}</Typography>
                  <Typography variant="h5">{s.value}</Typography>
                </Box>
                <Box sx={{width:120, height:50}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[{v:1},{v:3},{v:2},{v:4},{v:3}]}> <Area dataKey="v" stroke="#2E7D32" fill="#C8E6C9" /></AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{p:2}}>
            <Typography variant="h6">Sales Overview</Typography>
            <Box sx={{height:240, mt:2}}>
              <SalesChart orders={recentOrders} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{p:2}}>
            <Typography variant="h6">Customers</Typography>
            <Box sx={{height:240, mt:2}}>
              <CustomerChart customers={[] /* placeholder - CRMContext could supply real data */} />
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
                  <Button variant="text" sx={{ml:2}} onClick={async ()=>{
                    // simulate a random order
                    const sample = { customerId: 'user-1', items: [{ productId: 'p1', qty: 1, price: 29.99 }], total: 29.99, status: 'Pending' }
                    await api.addOrder(sample)
                  }}>Simulate Order</Button>
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
      </AdminPage>
    </Box>
  )
}
