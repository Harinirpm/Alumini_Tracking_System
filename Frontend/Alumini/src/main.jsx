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
import './index.css';

// Create the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the App component within BrowserRouter and StrictMode
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
