import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d50000",
    },
    secondary: {
      main: "#00e5ff",
    },
    background: {
      default: "#ffcdd2",
      paper: "#ffebee",
    },
    error: {
      main: "#b71c1c",
    },
    info: {
      main: "#fbc02d",
    },
    success: {
      main: "#388e3c",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)