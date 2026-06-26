import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/vazirmatn'
import './index.css'
import App from './App.jsx'
import { initializeMockDB } from './data.js'

// Initialize the static mock database in localStorage
initializeMockDB();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)