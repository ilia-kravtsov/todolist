import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blue, deepPurple, indigo} from "@mui/material/colors";
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e88e5',
        },
        secondary: deepPurple,
        mode: 'light'
    },
    typography: {
        fontSize: 14,
    },

})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

