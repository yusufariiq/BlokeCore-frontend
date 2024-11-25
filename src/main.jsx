import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <StrictMode>
      <AuthProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </AuthProvider>
    </StrictMode>
  </Router>,
)
