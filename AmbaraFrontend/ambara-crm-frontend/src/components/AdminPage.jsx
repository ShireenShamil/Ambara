import React from 'react'
import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function AdminPage({ title, children, open }){
  return (
    <Box component="main" sx={{ ml: open ? '240px' : 0, p:3, mt:8, width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb:2 }}>
        <Link component={RouterLink} to="/admin/dashboard">Dashboard</Link>
        {title && <Typography color="text.primary">{title}</Typography>}
      </Breadcrumbs>
      {children}
    </Box>
  )
}
