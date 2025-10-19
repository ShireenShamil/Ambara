import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../api/crmApi'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await api.login(email, password)
      login(user)
    } catch (err) { setError(err.message) }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2} textAlign="center">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>Register</Button>
        </form>
      </Paper>
    </Box>
  )
}
