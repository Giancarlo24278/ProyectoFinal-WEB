import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

import { StorageProvider } from './Context/StorageProvider'
import { ThemeProvider } from './Context/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <StorageProvider>
        <App />
      </StorageProvider>
    </ThemeProvider>
  </React.StrictMode>
)