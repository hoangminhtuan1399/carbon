import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GeneralContext } from "./context/GeneralContext.jsx";
import App from './App.jsx';
import './index.css';
import './i18n';
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GeneralContext>
      <App/>
    </GeneralContext>
  </StrictMode>,
)
