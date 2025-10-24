import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#10b981',     // Emerald green for buttons, highlights
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#064e3b',     // Dark green for sidebar, cards, hover accents
      contrastText: '#ffffff'
    },
    success: { main: '#34d399' },
    warning: { main: '#facc15' },
    error: { main: '#ef4444' },
    info: { main: '#22d3ee' },
    background: {
      default: '#f1fdf5',  // Light mint background for dashboard
      paper: '#ffffff'      // White card background
    },
    text: {
      primary: '#064e3b',   // Dark green text
      secondary: '#10b981', // Lighter green for highlights
    }
  },
  typography: {
    fontFamily: ['Inter', 'Poppins', 'Roboto', 'sans-serif'].join(','),
    h6: {
      fontWeight: 700
    },
    subtitle1: {
      fontWeight: 600
    },
    subtitle2: {
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#064e3b'
        }
      }
    }
  }
})

export default theme
