import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';
import { CartProvider } from './components/CartContext';
import Store from './pages/Store';
import ProductPage from './components/ProductPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Checkout from "./pages/Billing";
import Admin from './pages/Admin';
import ErrorBoundary from './components/ErrorBoundary';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Return from './pages/Return';
import Shipping from './pages/Shipping';
import Cancellation from './pages/Cancellation';
import Checkouts from './pages/Checkouts';
import Landing from './pages/Landing';
import ThankYou from './pages/ThankYou';
import Layout from './components/Layout';
import { LanguageProvider } from './context/LanguageContext';
import Aly from './pages/Aly';
import ScrollToTop from './components/ScrollToTop';
import audio from './assets/main/audio.mp3';

AOS.init({
  delay: 300,
  duration: 900,
  easing: 'ease',
});

function App() {
  return (
    <ErrorBoundary>
      <div className="App overflow-hidden">
        <CartProvider>
          <LanguageProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/sree_anjaneya" element={<ErrorBoundary><Landing /></ErrorBoundary>} />
                <Route path="/thank-you" element={<ErrorBoundary><ThankYou /></ErrorBoundary>} />
                <Route path="/astha_laxmi" element={<ErrorBoundary><Aly /> </ErrorBoundary>} />
                
                {/* All other routes with navbar and footer */}
                <Route path="/" element={
                  <Layout>
                    <ErrorBoundary><Home /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/about" element={
                  <Layout>
                    <ErrorBoundary><About /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/contact" element={
                  <Layout>
                    <ErrorBoundary><Contact /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/shop" element={
                  <Layout>
                    <ErrorBoundary><Store /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/product/:id" element={
                  <Layout>
                    <ErrorBoundary><ProductPage /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/billing" element={
                  <Layout>
                    <ErrorBoundary><Checkout /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/admin" element={
                  <Layout>
                    <ErrorBoundary><Admin /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/terms" element={
                  <Layout>
                    <ErrorBoundary><Terms /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/privacy" element={
                  <Layout>
                    <ErrorBoundary><Privacy /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/return" element={
                  <Layout>
                    <ErrorBoundary><Return /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/shipping" element={
                  <Layout>
                    <ErrorBoundary><Shipping /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/cancellation" element={
                  <Layout>
                    <ErrorBoundary><Cancellation /></ErrorBoundary>
                  </Layout>
                } />
                <Route path="/checkout" element={
                  <Layout>
                    <ErrorBoundary><Checkouts /></ErrorBoundary>
                  </Layout>
                } />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </CartProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
