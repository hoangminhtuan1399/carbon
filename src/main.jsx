import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n';
import { GeneralContext } from "./context/GeneralContext.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GeneralContext>
      <App/>
    </GeneralContext>
  </StrictMode>,
)
