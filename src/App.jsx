import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Order from './pages/Order';
import Policy from './pages/Policy';
import Return from './pages/Returns';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Section/Footer';
import Register from './components/Auth/Register';
import Terms from './pages/Terms'
import Faq  from './pages/Faq';
import Shipping from './pages/Shipping';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/returns" element={<Return />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/shipping-info" element={<Shipping />} />
        <Route path="/terms-conditions" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;