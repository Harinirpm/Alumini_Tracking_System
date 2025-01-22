// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom';

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )
// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );

import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18's createRoot API
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {UserProvider} from './UserContext';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Create the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the App component within BrowserRouter and StrictMode
root.render(
<GoogleOAuthProvider clientId="619757038011-v1j07j5fjlroisdtr05bilfkid4gb7bu.apps.googleusercontent.com">
    <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>

);
