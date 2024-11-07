import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <StrictMode>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </StrictMode>
  </Router>,
)
