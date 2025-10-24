import React, { useState } from 'react'
import { 
  Box, Typography, Grid, Card, CardMedia, CardContent, CardActionArea 
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TemplateUploader from '../../components/TemplateUploader'
import AdminPage from '../../components/AdminPage'

// Placeholder images for dummy templates
const dummyTemplates = [
  { id: 'T001', name: 'Floral T-Shirt', type: 'T-Shirt', url: 'https://via.placeholder.com/300x180?text=Floral+T-Shirt' },
  { id: 'T002', name: 'Coffee Mug Logo', type: 'Mug', url: 'https://via.placeholder.com/300x180?text=Coffee+Mug' },
  { id: 'T003', name: 'Wooden Frame Design', type: 'Frame', url: 'https://via.placeholder.com/300x180?text=Frame+Design' },
  { id: 'T004', name: 'Custom Logo', type: 'Logo', url: 'https://via.placeholder.com/300x180?text=Logo+Design' },
]

export default function Templates() {
  const [open, setOpen] = useState(true)
  const [templates, setTemplates] = useState(dummyTemplates)

  function addTpl(t) {
    setTemplates(prev => [t, ...prev])
  }

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setOpen(v => !v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Templates">
        <Typography variant="h4" mb={2}>Design Templates</Typography>

        {/* Template Uploader */}
        <TemplateUploader onAdd={addTpl} />

        {/* Templates Grid */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {templates.map(t => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <CardActionArea>
                  <CardMedia 
                    component="img" 
                    height="180" 
                    image={t.url} 
                    alt={t.name} 
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent sx={{ background: 'linear-gradient(135deg, #e0f2f1, #a5d6a7)' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{t.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Type: {t.type}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AdminPage>
    </Box>
  )
}
