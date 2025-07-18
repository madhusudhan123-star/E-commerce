/**
 * Example implementation showing how to use SEO-friendly URLs in your components
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { createProductUrl, createCategoryUrl } from '../utils/urlSlugs';
import translations from '../utils/data';

// Example: Updated navigation component with SEO URLs
export const SEONavigation = () => {
  return (
    <nav className="seo-navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/category/spiritual-idols">Spiritual Idols</Link></li>
        <li><Link to="/category/sacred-yantras">Sacred Yantras</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

// Example: Product listing with SEO URLs
export const SEOProductListing = () => {
  const products = translations.products.product;

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>₹{product.cost}</p>
          <div className="product-actions">
            {/* SEO-friendly product URL */}
            <Link 
              to={createProductUrl(product.id, product.name)}
              className="btn btn-primary"
            >
              View Details
            </Link>
            
            {/* Category link */}
            <Link 
              to={createCategoryUrl(product.category)}
              className="btn btn-secondary"
            >
              More in {product.category}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

// Example: Breadcrumb navigation with SEO URLs
export const SEOBreadcrumb = ({ product }) => {
  if (!product) return null;

  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link>
      <span className="separator"> / </span>
      <Link to="/shop">Shop</Link>
      <span className="separator"> / </span>
      <Link to={createCategoryUrl(product.category)}>
        {product.category}
      </Link>
      <span className="separator"> / </span>
      <span className="current">{product.name}</span>
    </nav>
  );
};

// Example: Featured products section with SEO URLs
export const SEOFeaturedProducts = () => {
  const featuredProducts = translations.products.product.filter(p => p.isNew || p.rating >= 4.5);

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="products-slider">
        {featuredProducts.map(product => (
          <div key={product.id} className="featured-product">
            <Link to={createProductUrl(product.id, product.name)}>
              <img src={product.photo?.image1} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">₹{product.cost}</p>
              {product.isNew && <span className="badge new">New</span>}
              {product.rating >= 4.5 && <span className="badge popular">Popular</span>}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

// Example: Search results with SEO URLs
export const SEOSearchResults = ({ searchQuery, searchResults }) => {
  return (
    <div className="search-results">
      <h2>Search Results for "{searchQuery}"</h2>
      {searchResults.length === 0 ? (
        <p>No products found. <Link to="/shop">Browse all products</Link></p>
      ) : (
        <div className="results-grid">
          {searchResults.map(product => (
            <div key={product.id} className="search-result">
              <Link to={createProductUrl(product.id, product.name)}>
                <img src={product.photo?.image1} alt={product.name} />
                <div className="result-info">
                  <h3>{product.name}</h3>
                  <p className="category">
                    Category: <Link to={createCategoryUrl(product.category)}>{product.category}</Link>
                  </p>
                  <p className="price">₹{product.cost}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example: Related products with SEO URLs
export const SEORelatedProducts = ({ currentProduct }) => {
  const relatedProducts = translations.products.product.filter(
    p => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 4);

  return (
    <section className="related-products">
      <h3>Related Products</h3>
      <div className="related-grid">
        {relatedProducts.map(product => (
          <div key={product.id} className="related-product">
            <Link to={createProductUrl(product.id, product.name)}>
              <img src={product.photo?.image1} alt={product.name} />
              <h4>{product.name}</h4>
              <p>₹{product.cost}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="view-all">
        <Link to={createCategoryUrl(currentProduct.category)}>
          View All {currentProduct.category}
        </Link>
      </div>
    </section>
  );
};

const SEOComponents = {
  SEONavigation,
  SEOProductListing,
  SEOBreadcrumb,
  SEOFeaturedProducts,
  SEOSearchResults,
  SEORelatedProducts
};

export default SEOComponents;
