/**
 * Example React Router implementation using SEO-optimized URL slugs
 * 
 * This component demonstrates how to implement SEO-friendly routing
 * for your e-commerce products using the URL slug utilities.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { 
  extractProductIdFromUrl, 
  validateSlug, 
  slugToProductId, 
  slugToCategory,
  createProductUrl 
} from '../utils/urlSlugs';
import translations from '../utils/data';

// Product Detail Component with SEO routing
const ProductDetailWithSlug = () => {
  const { id, slug } = useParams();
  const productId = parseInt(id, 10);
  
  // Find the product in your data
  const product = translations.products.product.find(p => p.id === productId);
  
  if (!product) {
    return <Navigate to="/404" replace />;
  }
  
  // Validate if the slug matches the product name
  if (!validateSlug(slug, product.name)) {
    // Redirect to correct URL with proper slug
    const correctUrl = createProductUrl(product.id, product.name);
    return <Navigate to={correctUrl} replace />;
  }
  
  return (
    <div className="product-detail">
      {/* Product detail content */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div className="price">₹{product.cost}</div>
      {/* Add more product details here */}
    </div>
  );
};

// Category Page Component
const CategoryPage = () => {
  const { categorySlug } = useParams();
  const categoryName = slugToCategory[categorySlug];
  
  if (!categoryName) {
    return <Navigate to="/404" replace />;
  }
  
  // Filter products by category
  const categoryProducts = translations.products.product.filter(
    product => product.category === categoryName
  );
  
  return (
    <div className="category-page">
      <h1>{categoryName}</h1>
      <div className="products-grid">
        {categoryProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>₹{product.cost}</p>
            <a href={createProductUrl(product.id, product.name)}>
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Legacy product URL redirect component
const LegacyProductRedirect = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  
  const product = translations.products.product.find(p => p.id === productId);
  
  if (!product) {
    return <Navigate to="/404" replace />;
  }
  
  // Redirect to new SEO-friendly URL
  const newUrl = createProductUrl(product.id, product.name);
  return <Navigate to={newUrl} replace />;
};

// Main routing component
const SEORouting = () => {
  return (
    <Router>
      <Routes>
        {/* SEO-friendly product URLs */}
        <Route 
          path="/product/:id/:slug" 
          element={<ProductDetailWithSlug />} 
        />
        
        {/* SEO-friendly category URLs */}
        <Route 
          path="/category/:categorySlug" 
          element={<CategoryPage />} 
        />
        
        {/* Legacy product URLs - redirect to new format */}
        <Route 
          path="/product/:id" 
          element={<LegacyProductRedirect />} 
        />
        
        {/* Legacy product URL without ID - redirect to store */}
        <Route 
          path="/product" 
          element={<Navigate to="/store" replace />} 
        />
        
        {/* Other routes */}
        <Route path="/store" element={<div>Store Page</div>} />
        <Route path="/404" element={<div>Page Not Found</div>} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </Router>
  );
};

export default SEORouting;
