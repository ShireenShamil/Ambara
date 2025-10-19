import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#2E7D32' },      // Dark Green
    secondary: { main: '#81C784' },    // Light Green
    background: { default: '#ffffff' },// White background
    text: { primary: '#1B5E20', secondary: '#4CAF50' }
  },
  typography: { fontFamily: ['Inter', 'Poppins', 'Roboto', 'sans-serif'].join(',') }
})

export default theme
