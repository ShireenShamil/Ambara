import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'
import { api } from '../../api/crmApi'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.register({ name, email, password, role: 'user' })
      setSuccess('Registration successful! You can login now.')
      setError('')
    } catch (err) { setError(err.message); setSuccess('') }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2} textAlign="center">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="green">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" margin="normal" value={name} onChange={e => setName(e.target.value)} />
          <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/login')}>Back to Login</Button>
        </form>
      </Paper>
    </Box>
  )
}
