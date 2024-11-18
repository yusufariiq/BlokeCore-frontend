import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Cart from './pages/Cart';
import CartSlider from './components/Common/CartSlider';
import Checkout from './pages/Checkout';
import ClubsPage from './components/Collections/ClubsPage';
import Contact from './pages/Contact';
import Faq  from './pages/Faq';
import Footer from './components/Section/Footer';
import Home from './pages/Home';
import LatestCollection from './components/Collections/LatestCollection';
import Login from './components/Auth/Login';
import NationsPage from './components/Collections/NationsPage';
import Order from './pages/Order';
import Payment from './pages/Payment';
import Policy from './pages/Policy';
import ProductDetails from './components/Collections/ProductDetails';
import Return from './pages/Returns';
import Navbar from './components/Navigation/Navbar';
import Register from './components/Auth/Register';
import SearchResults from './pages/SearchResults';
import Shipping from './pages/Shipping';
import Terms from './pages/Terms'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Navbar />
      <Toaster 
        position='top-right'
        gutter={8}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/latest" element={<LatestCollection />} />
        <Route path="/nations" element={<NationsPage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/returns" element={<Return />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/shipping-info" element={<Shipping />} />
        <Route path="/slider-cart" element={<CartSlider />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;