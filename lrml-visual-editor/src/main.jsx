import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ColourModeContextProvider from './context/providers/ColourModeContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColourModeContextProvider>
      <App />
    </ColourModeContextProvider>
  </React.StrictMode>,
)
