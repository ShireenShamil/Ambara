import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import { useAuth } from '../../context/AuthContext'  // ✅ import auth context

export default function AdminSettings() {
  const [open, setOpen] = useState(true)
  const toggleSidebar = () => setOpen(v => !v)

  // ✅ Get logged-in admin from AuthContext
  const { user } = useAuth()

  // ✅ Initialize form with user data once available
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        photo: user.photo || 'https://i.pravatar.cc/150?img=11'
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updated Info:', form)
    alert('Profile updated successfully!')
  }

  const handlePhotoChange = () => {
    alert('Profile photo update feature coming soon!')
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1fdf5' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <SidebarAdmin open={open} />
      
      <AdminPage open={open} title="Profile Settings">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)',
                p: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Typography
               variant="h5"
  sx={{ fontWeight: 700, mb: 3, color: '#064e3b', textAlign: 'center' }}
>
  {user?.name ? ` ${user.name}` : 'Profile Settings'}
              </Typography>

              {/* Profile Photo Section */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={form.photo}
                    alt="Admin"
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      border: '4px solid #10b981',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#10b981',
                      textTransform: 'none',
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#059669' }
                    }}
                    onClick={handlePhotoChange}
                  >
                    Change Photo
                  </Button>
                </Box>
              </Box>

              {/* Form Section */}
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  <TextField
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    helperText="Leave empty if you don't want to change password"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: '#10b981',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      py: 1.2,
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#059669' }
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </AdminPage>
    </Box>
  )
}

