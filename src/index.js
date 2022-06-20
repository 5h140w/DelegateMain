import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppStateProvider } from './AppState'
import './fonts.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Lena'
    },
    h2: {
      fontSize: "calc((2.8 - 1) * 1.2vw + 1rem)",
      fontFamily: 'Lena',
      fontWeight: 400,
      textAlign: 'center',
    },
    h3: {
      fontSize: 30,
      fontFamily: 'Roboto',
      fontWeight: 200,
      padding: 25, 
      textAlign: 'center',
    },
    h4: {
      fontSize: 23,
      fontFamily: 'Roboto',
      fontWeight: 400,
      padding: 10,
      textAlign: 'center',
    },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontFamily: 'Lena',
    },
    poster: {
      color: 'red',
    },
    toplink: {
      color: 'green'
    },
    number: {
      fontSize: 100,
      fontFamily: 'Mono',
      color: '#000000',
      padding: 25
    },
    linklight: {
      fontSize: 16,
      fontFamily: 'Roboto',
      fontWeight: 400,
      color: '#32D74B',
    }
  },
});

ReactDOM.render(
//  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ThemeProvider>,
//  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
