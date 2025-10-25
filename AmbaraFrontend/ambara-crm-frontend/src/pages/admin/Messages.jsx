import React, { useState, useEffect, useRef } from 'react'
import {
  Box,Grid,Card,CardContent,Avatar,Typography,TextField,Button,List,ListItem,ListItemAvatar,ListItemText,Divider,ListItemButton,Badge
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import { useAuth } from '../../context/AuthContext'

export default function AdminMessages() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen(v => !v)
  const { user } = useAuth()
  const chatEndRef = useRef(null)

  // Example customers list
  const [customers] = useState([
    { id: 1, name: 'Amal', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 2, name: 'Saman', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 3, name: 'Nimali', avatar: 'https://i.pravatar.cc/150?img=7' },
  ])

  // Messages per customer
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 'Amal', text: 'Hi, I need help with my order.', fromCustomer: true, time: '10:15 AM' },
      { id: 2, sender: 'You', text: 'Sure! Could you share your order ID?', fromCustomer: false, time: '10:17 AM' },
      { id: 3, sender: 'Amal', text: 'Order ID is #1234.', fromCustomer: true, time: '10:18 AM' },
    ],
    2: [
      { id: 4, sender: 'Saman', text: 'Hello admin!', fromCustomer: true, time: '11:00 AM' },
    ],
    3: [
      { id: 5, sender: 'Nimali', text: 'Can I change my delivery address?', fromCustomer: true, time: '09:30 AM' },
    ],
  })

  // Unread messages count per customer
  const [unreadCounts, setUnreadCounts] = useState({
    1: 0,
    2: 1,
    3: 1
  })

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0].id)
  const [newMsg, setNewMsg] = useState('')

  // Reset unread count when customer selected
  useEffect(() => {
    setUnreadCounts(prev => ({ ...prev, [selectedCustomerId]: 0 }))
  }, [selectedCustomerId])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selectedCustomerId])

  const handleSend = () => {
    if (!newMsg.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => ({
      ...prev,
      [selectedCustomerId]: [
        ...(prev[selectedCustomerId] || []),
        { id: Date.now(), sender: 'You', text: newMsg, fromCustomer: false, time }
      ]
    }))
    setNewMsg('')
  }

  // Simulate receiving new customer message
  const receiveMessage = (customerId, text) => {
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => ({
      ...prev,
      [customerId]: [
        ...(prev[customerId] || []),
        { id: Date.now(), sender: customers.find(c => c.id === customerId).name, text, fromCustomer: true, time }
      ]
    }))
    if (customerId !== selectedCustomerId) {
      setUnreadCounts(prev => ({
        ...prev,
        [customerId]: (prev[customerId] || 0) + 1
      }))
    }
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1fdf5' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <SidebarAdmin open={sidebarOpen} />

      <AdminPage open={sidebarOpen} title="Chat">
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Customer list panel */}
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 3, height: '80vh', overflowY: 'auto', p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#064e3b', mb: 2 }}>
                Customers
              </Typography>
              <List>
                {customers.map(cust => (
                  <ListItemButton
                    key={cust.id}
                    selected={cust.id === selectedCustomerId}
                    onClick={() => setSelectedCustomerId(cust.id)}
                  >
                    <ListItemAvatar>
                      <Badge
                        badgeContent={unreadCounts[cust.id]}
                        color="error"
                        overlap="circular"
                        invisible={unreadCounts[cust.id] === 0}
                      >
                        <Avatar src={cust.avatar} />
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={cust.name}
                      secondary={`${messages[cust.id]?.length || 0} messages`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Card>
          </Grid>

          {/* Chat window panel */}
          <Grid item xs={12} md={9}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)',
                p: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                height: '80vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 3, color: '#064e3b', textAlign: 'center' }}
              >
                {customers.find(c => c.id === selectedCustomerId)?.name || 'Customer'}'s Chat
              </Typography>

              {/* Messages */}
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  p: 2,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  border: '1px solid #d1fae5'
                }}
              >
                <List>
                  {(messages[selectedCustomerId] || []).map((msg, index) => (
                    <React.Fragment key={msg.id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{ justifyContent: msg.fromCustomer ? 'flex-start' : 'flex-end' }}
                      >
                        {msg.fromCustomer && (
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: '#10b981' }}>
                              {msg.sender.charAt(0)}
                            </Avatar>
                          </ListItemAvatar>
                        )}
                        <Card
                          sx={{
                            backgroundColor: msg.fromCustomer ? '#ecfdf5' : '#10b981',
                            color: msg.fromCustomer ? '#064e3b' : 'white',
                            px: 2,
                            py: 1,
                            borderRadius: 3,
                            maxWidth: '70%',
                            wordWrap: 'break-word'
                          }}
                        >
                          <ListItemText
                            primary={msg.text}
                            secondary={`${msg.fromCustomer ? msg.sender : 'You'}, ${msg.time}`}
                            secondaryTypographyProps={{
                              color: msg.fromCustomer ? '#047857' : '#d1fae5',
                              fontSize: '0.75rem'
                            }}
                          />
                        </Card>
                        {!msg.fromCustomer && (
                          <ListItemAvatar sx={{ ml: 1 }}>
                            <Avatar src={user?.photo || 'https://i.pravatar.cc/150?img=11'} />
                          </ListItemAvatar>
                        )}
                      </ListItem>
                      {index < (messages[selectedCustomerId]?.length || 0) - 1 && <Divider sx={{ my: 1 }} />}
                    </React.Fragment>
                  ))}
                  <div ref={chatEndRef} />
                </List>
              </Box>

              {/* Message input */}
              <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
                <TextField
                  placeholder="Type your message..."
                  fullWidth
                  variant="outlined"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#10b981',
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': { backgroundColor: '#059669' }
                  }}
                  onClick={handleSend}
                >
                  Send
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </AdminPage>
    </Box>
  )
}





