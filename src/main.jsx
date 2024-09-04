import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App.jsx'
import './index.css'
import ReactPWAInstallProvider from './PWA/ReactPWAInstallContext.jsx';

serviceWorkerRegistration.unregister();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactPWAInstallProvider enableLogging>
      <App />
    </ReactPWAInstallProvider>
  </StrictMode>,
)
