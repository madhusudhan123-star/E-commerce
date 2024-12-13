import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import { CartProvider } from './components/CartContext';
import Store from './pages/Store';
import ProductPage from './components/ProductPage';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Checkout from "./pages/Billing"
import Admin from './pages/Admin';
import ErrorBoundary from './components/ErrorBoundary';
// ..
AOS.init({
  delay: 300, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
});

function App() {
  return (
    <ErrorBoundary>
      <div className="App overflow-hidden">
        <CartProvider>
          <BrowserRouter>
            {/* Your other components including Navbar */}
            <Navbar />
            <Routes>
              <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
              <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
              <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
              <Route path="/shop" element={<ErrorBoundary><Store /></ErrorBoundary>} />
              <Route path="/product/:id" element={<ErrorBoundary><ProductPage /></ErrorBoundary>} />
              <Route path="/billing" element={<ErrorBoundary><Checkout /></ErrorBoundary>} />
              <Route path="/admin" element={<ErrorBoundary><Admin /></ErrorBoundary>} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </div>
    </ErrorBoundary>
  );
}


export default App;
