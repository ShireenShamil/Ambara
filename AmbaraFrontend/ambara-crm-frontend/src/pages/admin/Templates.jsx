import React, { useState } from 'react'
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TemplateUploader from '../../components/TemplateUploader'
import AdminPage from '../../components/AdminPage'

export default function Templates(){
  const [open, setOpen] = useState(true)
  const [templates, setTemplates] = useState([])

  function addTpl(t){ setTemplates(tpl => [t, ...tpl]) }

  return (
    <Box display="flex">
      <Navbar toggleSidebar={()=>setOpen(v=>!v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Templates">
        <Typography variant="h4" mb={2}>Design Templates</Typography>
        <TemplateUploader onAdd={addTpl} />
        <Grid container spacing={2} sx={{mt:2}}>
          {templates.map(t => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <Card>
                <CardMedia component="img" height="180" image={t.url} alt={t.name} />
                <CardContent>
                  <Typography variant="subtitle1">{t.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Type: {t.type}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AdminPage>
    </Box>
  )
}
