import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Tooltip,
  Chip
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import TemplateUploader from '../../components/TemplateUploader'
import AdminPage from '../../components/AdminPage'
import tshirtImage from '../../images/tshirt.jpeg'
import Mug from '../../images/mug.jpeg'
import Frame from '../../images/frame.jpeg'
import Brand from '../../images/brand.jpeg'

const dummyTemplates = [
  { id: 'T001', name: 'Floral T-Shirt', type: 'T-Shirt', category: 'Clothing', date: '2025-10-10', image: tshirtImage, description: 'A colorful floral-themed T-shirt design for casual wear.' },
  { id: 'T002', name: 'Coffee Mug Logo', type: 'Mug', category: 'Merchandise', date: '2025-09-12', image: Mug, description: 'Minimalist logo design for custom coffee mugs.' },
  { id: 'T003', name: 'Wooden Frame Design', type: 'Frame', category: 'Decor', date: '2025-08-15', image: Frame, description: 'Elegant wooden frame template suitable for photos or artwork.' },
  { id: 'T004', name: 'Custom Logo', type: 'Logo', category: 'Branding', date: '2025-07-05', image: Brand, description: 'Professional custom logo design for business branding.' },
]

export default function Templates() {
  const [open, setOpen] = useState(true)
  const [templates, setTemplates] = useState(dummyTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [filterType, setFilterType] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [search, setSearch] = useState('')

  const addTpl = (t) => setTemplates(prev => [t, ...prev])

  const handleOpen = (template) => setSelectedTemplate(template)
  const handleClose = () => setSelectedTemplate(null)

  // Filter + Search + Sort
  const filteredTemplates = templates
    .filter(t => (!filterType || t.type === filterType))
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name)
      if (sortOption === 'date') return new Date(b.date) - new Date(a.date)
      return 0
    })

  return (
    <Box display="flex">
      <Navbar toggleSidebar={() => setOpen(v => !v)} />
      <SidebarAdmin open={open} />
      <AdminPage open={open} title="Templates">

        <Typography variant="h4" mb={3} sx={{ color: '#064e3b', fontWeight: 700 }}>
          Design Templates
        </Typography>

        {/* Template Uploader */}
        <TemplateUploader onAdd={addTpl} />

        {/* Filters */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3} mb={3}>
          <TextField
            placeholder="Search templates..."
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            size="small"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="T-Shirt">T-Shirt</MenuItem>
            <MenuItem value="Mug">Mug</MenuItem>
            <MenuItem value="Frame">Frame</MenuItem>
            <MenuItem value="Logo">Logo</MenuItem>
          </Select>
          <Select
            size="small"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">Sort By</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </Stack>

        {/* Template Cards */}
        <Grid container spacing={3}>
          {filteredTemplates.map(t => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={t.id}>
              <Tooltip title="Click to view details" arrow>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    },
                  }}
                  onClick={() => handleOpen(t)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="180"
                      image={t.image}
                      alt={t.name}
                      sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    />
                    <CardContent
                      sx={{
                        
                        color: '#064e3b',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {t.name}
                      </Typography>
                      <Typography variant="body2">Type: {t.type}</Typography>
                      <Chip
                        label={t.category}
                        color="success"
                        size="small"
                        sx={{ mt: 1, fontWeight: 500 }}
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        {/* Template Details Modal */}
        <Dialog open={!!selectedTemplate} onClose={handleClose} maxWidth="sm" fullWidth>
          {selectedTemplate && (
            <>
              <DialogTitle sx={{ fontWeight: 700, color: '#064e3b' }}>
                {selectedTemplate.name}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img
                    src={selectedTemplate.image}
                    alt={selectedTemplate.name}
                    style={{ width: '80%', borderRadius: 12 }}
                  />
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Type:</strong> {selectedTemplate.type}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Category:</strong> {selectedTemplate.category}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Uploaded On:</strong> {selectedTemplate.date}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {selectedTemplate.description}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="success">
                  Close
                </Button>
                <Button variant="contained" color="success">
                  Use Template
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </AdminPage>
    </Box>
  )
}
