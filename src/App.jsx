import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Cart from './pages/Cart';
import Home from './pages/home';
import Login from './pages/Login';
import OrderPlace from './pages/OrderPlace';
import Policy from './pages/Policy';
import Return from './pages/Returns';
import Navbar from './components/navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-place" element={<OrderPlace />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/returns" element={<Return />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;