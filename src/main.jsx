import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/syne/400.css'
import '@fontsource/syne/500.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/syne-mono/400.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/jetbrains-mono/400.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
