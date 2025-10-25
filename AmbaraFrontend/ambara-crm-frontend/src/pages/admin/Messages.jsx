import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import AdminPage from '../../components/AdminPage'
import { useAuth } from '../../context/AuthContext'

export default function AdminMessages() {
  const [open, setOpen] = useState(true)
  const toggleSidebar = () => setOpen(v => !v)
  const { user } = useAuth()
  const chatEndRef = useRef(null)

  // Example messages history (customer and admin)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Amal', text: 'Hi, I need help with my order.', fromCustomer: true, time: '10:15 AM' },
    { id: 2, sender: 'You', text: 'Sure! Could you share your order ID?', fromCustomer: false, time: '10:17 AM' },
    { id: 3, sender: 'Amal', text: 'Order ID is #1234.', fromCustomer: true, time: '10:18 AM' },
    { id: 4, sender: 'You', text: 'Thanks! I am checking now.', fromCustomer: false, time: '10:20 AM' },
  ])

  const [newMsg, setNewMsg] = useState('')

  // Auto-scroll to bottom when new message added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!newMsg.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { id: Date.now(), sender: 'You', text: newMsg, fromCustomer: false, time }])
    setNewMsg('')
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1fdf5' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <SidebarAdmin open={open} />

      <AdminPage open={open} title="Chat">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)',
                p: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: '#064e3b',
                  textAlign: 'center'
                }}
              >
                {user?.name ? `${user.name}'s Inbox` : 'Admin Inbox'}
              </Typography>

              {/* Chat Window */}
              <CardContent>
                <Box
                  sx={{
                    height: 400,
                    overflowY: 'auto',
                    p: 2,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    border: '1px solid #d1fae5'
                  }}
                >
                  <List>
                    {messages.map((msg, index) => (
                      <React.Fragment key={msg.id}>
                        <ListItem
                          alignItems="flex-start"
                          sx={{
                            justifyContent: msg.fromCustomer ? 'flex-start' : 'flex-end'
                          }}
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
                        {index < messages.length - 1 && <Divider sx={{ my: 1 }} />}
                      </React.Fragment>
                    ))}
                    <div ref={chatEndRef} />
                  </List>
                </Box>

                {/* Message Input */}
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </AdminPage>
    </Box>
  )
}

// import React, { useState, useEffect } from 'react'
// import { Box, Typography } from '@mui/material'
// import Navbar from '../../components/Navbar'
// import SidebarAdmin from '../../components/SidebarAdmin'
// import { DataGrid } from '@mui/x-data-grid'  // Material UI DataGrid
// import { useAuth } from '../../context/AuthContext'

// // Dummy messages data
// const dummyMessages = [
//   { id: 1, sender: 'Amal', role: 'Customer', text: 'Hi, I need help with my order.', date: '2025-10-24 10:15 AM' },
//   { id: 2, sender: 'Rasmiya', role: 'Admin', text: 'Sure! Could you share your order ID?', date: '2025-10-24 10:17 AM' },
//   { id: 3, sender: 'Amal', role: 'Customer', text: 'Order ID is #1234.', date: '2025-10-24 10:18 AM' },
//   { id: 4, sender: 'Rasmiya', role: 'Admin', text: 'Thanks! I am checking now.', date: '2025-10-24 10:20 AM' }
// ]

// export default function AdminMessagesTable() {
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const { user } = useAuth()
//   const [rows, setRows] = useState([])

//   useEffect(() => {
//     // Initialize rows with dummy data
//     setRows(dummyMessages)
//   }, [])

//   const columns = [
//     { field: 'id', headerName: 'Message ID', width: 130 },
//     { field: 'sender', headerName: 'Sender', width: 150 },
//     { field: 'role', headerName: 'Role', width: 130 },
//     { field: 'text', headerName: 'Message', width: 400, editable: true },
//     { field: 'date', headerName: 'Date / Time', width: 180 }
//   ]

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1fdf5' }}>
//       <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//       <SidebarAdmin open={sidebarOpen} />

//       <Box
//         component="main"
//         sx={{
//           marginLeft: sidebarOpen ? '240px' : 0,
//           width: '100%',
//           p: 3
//         }}
//       >
//         <Typography variant="h4" mb={2} sx={{ fontWeight: 700, color: '#064e3b' }}>
//           {user?.name ? `${user.name}'s Messages` : 'Messages'}
//         </Typography>

//         <Box sx={{ height: 500, width: '100%' }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={7}
//             rowsPerPageOptions={[7, 15, 25]}
//             checkboxSelection={false}
//             disableSelectionOnClick
//             sx={{
//               backgroundColor: 'white',
//               borderRadius: 2,
//               '& .MuiDataGrid-cell': {
//                 color: '#064e3b'
//               },
//               '& .MuiDataGrid-columnHeaders': {
//                 backgroundColor: '#ecfdf5',
//                 color: '#064e3b',
//                 fontWeight: 600
//               },
//               '& .MuiDataGrid-footerContainer': {
//                 backgroundColor: '#ecfdf5'
//               }
//             }}
//           />
//         </Box>
//       </Box>
//     </Box>
//   )
// }
