import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

import About from './pages/About';
import Cart from './pages/Cart';
import CartSlider from './components/Common/CartSlider';
import Checkout from './pages/Checkout';
import ClubsPage from './components/Collections/ClubsPage';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Footer from './components/Section/Footer';
import Home from './pages/Home';
import LatestCollection from './components/Collections/LatestCollection';
import Login from './components/Auth/Login';
import NationsPage from './components/Collections/NationsPage';
import Order from './pages/Order';
import PaymentResult from './pages/PaymentResult';
import Policy from './pages/Policy';
import ProductDetails from './components/Collections/ProductDetails';
import Return from './pages/Returns';
import Navbar from './components/Navigation/Navbar';
import Register from './components/Auth/Register';
import SearchResults from './pages/SearchResults';
import Shipping from './pages/Shipping';
import Terms from './pages/Terms'

import EnglishClubPage from './components/Collections/Clubs/EnglishClubPage';
import FranceClubPage from './components/Collections/Clubs/FranceClubPage';
import GermanClubPage from './components/Collections/Clubs/GermanClubPage';
import ItalyClubPage from './components/Collections/Clubs/ItalyClubPage';
import OtherClubPage from './components/Collections/Clubs/OtherClubPage';
import SpanishClubPage from './components/Collections/Clubs/SpanishClubPage';

import AfricaPage from './components/Collections/Nations/AfricaPage'
import AmericanPage from './components/Collections/Nations/AmericanPage';
import AsiaPage from './components/Collections/Nations/AsiaPage'
import EuropePage from './components/Collections/Nations/EuropePage'
import OceaniaPage from './components/Collections/Nations/OceaniaPage'

import OtherSport from './components/Collections/OtherSport';
import Baseball from './components/Collections/Other/Baseball';
import Basketball from './components/Collections/Other/Basketball';
import Profile from './pages/Profile';
import TrackOrder from './pages/TrackOrder';

function App() {
  return (
    <div>
      <Navbar />
      <Toaster
        position='top-center'
        gutter={8}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/clubs/english" element={<EnglishClubPage />} />
        <Route path="/clubs/french" element={<FranceClubPage />} />
        <Route path="/clubs/german" element={<GermanClubPage />} />
        <Route path="/clubs/italian" element={<ItalyClubPage />} />
        <Route path="/clubs/others" element={<OtherClubPage />} />
        <Route path="/clubs/spanish" element={<SpanishClubPage />} />

        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/latest" element={<LatestCollection />} />

        <Route path="/nations" element={<NationsPage />} />
        <Route path="/nations/africa" element={<AfricaPage />} />
        <Route path="/nations/america" element={<AmericanPage />} />
        <Route path="/nations/asia" element={<AsiaPage />} />
        <Route path="/nations/europe" element={<EuropePage />} />
        <Route path="/nations/oceania" element={<OceaniaPage />} />

        <Route path="/others" element={<OtherSport />} />
        <Route path="/others/baseball" element={<Baseball />} />
        <Route path="/others/basketball" element={<Basketball />} />

        <Route path="/policy" element={<Policy />} />
        <Route path="/product/:productId" element={<ProductDetails />} />

        <Route path="/returns" element={<Return />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/shipping-info" element={<Shipping />} />
        <Route path="/slider-cart" element={<CartSlider />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="*" element={<Error />} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/order" element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        } />
        <Route path="/track-order" element={
          <ProtectedRoute>
            <TrackOrder />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/payment-result" element={
          <ProtectedRoute>
            <PaymentResult />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;