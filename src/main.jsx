import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store.js';
import ShopContextProvider from './context/ShopContext.jsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </Provider>
    </Router>,
  </StrictMode>
)
