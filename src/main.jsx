import { createRoot } from 'react-dom/client'
import { AppContext } from "./context/AppContext.jsx"
import App from './App.jsx'
import './index.css'
import './i18n'
import '@ant-design/v5-patch-for-react-19'
import BaseApi from "../api/base/BaseApi.js"

async function init() {
  try {
    await BaseApi.init()
    console.log("APIs initialized successfully")

    createRoot(document.getElementById('root')).render(
      <AppContext>
        <App/>
      </AppContext>
    )
  } catch (e) {
    console.error("Failed to initialize APIs:", e)
  }
}

init()
