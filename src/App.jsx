import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import OrderPlace from './pages/OrderPlace';
import Policy from './pages/Policy';
import Return from './pages/Returns';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Section/Footer';
import Register from './components/Auth/Register';
import Terms from './pages/Terms'


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
        <Route path="/signup" element={<Register />} />
        <Route path="/terms-condition" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;