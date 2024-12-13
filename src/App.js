import React, { useState, useEffect } from 'react';
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
import 'react-loading-skeleton/dist/skeleton.css';

AOS.init({
  delay: 300, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking if all critical resources are loaded
    window.onload = () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#DA9687]"></div>
      </div>
    );
  }

  return (
    <div className="App overflow-hidden">
      <CartProvider>
        <BrowserRouter>
          {/* Your other components including Navbar */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Store />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/billing" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
