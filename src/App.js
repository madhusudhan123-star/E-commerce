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


function App() {
  return (
    <div className="App">
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
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
