import React, { useState } from 'react'
import { Box, Typography, Paper, Grid, Button } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarCustomer from '../../components/SidebarCustomer'
import { useCRM } from '../../context/CRMContext'

export default function UserWishlist() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { products } = useCRM()
  const wishlist = products.slice(0, 3) // Mock wishlist

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarCustomer open={sidebarOpen} />
      <Box component="main" className="main-content" sx={{ marginLeft: sidebarOpen ? '240px' : 0, width: '100%' }}>
        <Typography variant="h4" mb={2}>Wishlist</Typography>
        <Grid container spacing={2}>
          {wishlist.map(p => (
            <Grid item xs={12} sm={4} key={p.id}>
              <Paper sx={{ p: 2 }}>
                <Typography>{p.title}</Typography>
                <Typography>${p.price}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 1 }}>Buy Now</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
