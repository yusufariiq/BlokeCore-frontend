import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/Common/ProtectedRoute';
import { setupAxiosInterceptors } from './utils/axiosInterceptor';

import About from './pages/Static/About';
import Cart from './pages/Catalogue/Cart';
import CartSlider from './components/Layout/CartSlider';
import Checkout from './pages/Checkout/Checkout';
import ClubsPage from './pages/Collections/ClubsPage';
import Contact from './pages/Static/Contact';
import Faq from './pages/Static/Faq';
import Footer from './components/Common/Footer';
import Home from './pages/Home';
import LatestCollection from './pages/Collections/LatestCollection';
import Login from './pages/Auth/Login';
import NationsPage from './pages/Collections/NationsPage';
import Order from './pages/Account/Order';
import PaymentResult from './pages/Checkout/PaymentResult';
import Policy from './pages/Static/Policy';
import ProductDetails from './components/Product/ProductDetails';
import Return from './pages/Static/Returns';
import Navbar from './components/Common/Navbar';
import Register from './pages/Auth/Register';
import SearchResults from './pages/Catalogue/SearchResults';
import Shipping from './pages/Static/Shipping';
import Terms from './pages/Static/Terms';

import EnglishClubPage from './pages/Collections/Clubs/EnglishClubPage';
import FranceClubPage from './pages/Collections/Clubs/FranceClubPage';
import GermanClubPage from './pages/Collections/Clubs/GermanClubPage';
import ItalyClubPage from './pages/Collections/Clubs/ItalyClubPage';
import OtherClubPage from './pages/Collections/Clubs/OtherClubPage';
import SpanishClubPage from './pages/Collections/Clubs/SpanishClubPage';

import AfricaPage from './pages/Collections/Nations/AfricaPage'
import AmericanPage from './pages/Collections/Nations/AmericanPage';
import AsiaPage from './pages/Collections/Nations/AsiaPage'
import EuropePage from './pages/Collections/Nations/EuropePage'
import OceaniaPage from './pages/Collections/Nations/OceaniaPage'

import OtherSport from './pages/Collections/OtherSport';
import Baseball from './pages/Collections/Other/Baseball';
import Basketball from './pages/Collections/Other/Basketball';

import Profile from './pages/Account/Profile';
import TrackOrder from './pages/Account/TrackOrder';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';

function App() {
  setupAxiosInterceptors();

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/latest" element={<LatestCollection />} />
        <Route path="/reset-password" element={<ResetPassword />} />

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