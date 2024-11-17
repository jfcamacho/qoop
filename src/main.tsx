import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './config/GlobalContext.tsx';

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalProvider>
  // <StrictMode>
  // </StrictMode>,
)
