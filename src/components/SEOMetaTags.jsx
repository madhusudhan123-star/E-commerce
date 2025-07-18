/**
 * SEO Meta Tags Generator for E-commerce Products
 * 
 * This component generates SEO-optimized meta tags for better search engine visibility
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { createProductUrl } from '../utils/urlSlugs';

/**
 * Product SEO Meta Tags Component
 */
export const ProductSEO = ({ product, siteUrl = 'https://yoursite.com' }) => {
  if (!product) return null;

  const productUrl = `${siteUrl}${createProductUrl(product.id, product.name)}`;
  const imageUrl = product.photo?.image1 ? `${siteUrl}${product.photo.image1}` : null;
  
  // Generate structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": imageUrl,
    "url": productUrl,
    "sku": `PROD-${product.id}`,
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "price": product.cost,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Sacred Collection"
      }
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "ratingCount": product.reviews?.length || 1
    } : null,
    "review": product.reviews?.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.user
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "reviewBody": review.comment,
      "datePublished": review.date
    })) || []
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{product.name} - Sacred Spiritual Collection | Buy Online</title>
      <meta name="description" content={`${product.description.substring(0, 155)}...`} />
      <meta name="keywords" content={`${product.name}, ${product.category}, spiritual items, religious artifacts, online shopping, India`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={productUrl} />
      
      {/* Open Graph Tags for Social Media */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={`${product.name} - Sacred Collection`} />
      <meta property="og:description" content={product.description} />
      <meta property="og:url" content={productUrl} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:site_name" content="Sacred Collection" />
      <meta property="product:price:amount" content={product.cost} />
      <meta property="product:price:currency" content="INR" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="product" />
      <meta name="twitter:title" content={`${product.name} - Sacred Collection`} />
      <meta name="twitter:description" content={product.description.substring(0, 200)} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Product-specific Meta Tags */}
      <meta name="product:price:amount" content={product.cost} />
      <meta name="product:price:currency" content="INR" />
      <meta name="product:availability" content="in stock" />
      <meta name="product:condition" content="new" />
      
      {/* Structured Data for Google */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

/**
 * Category SEO Meta Tags Component
 */
export const CategorySEO = ({ categoryName, products = [], siteUrl = 'https://yoursite.com' }) => {
  const categoryUrl = `${siteUrl}/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
  const productCount = products.length;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} - Sacred Collection`,
    "description": `Browse our collection of ${productCount} premium ${categoryName.toLowerCase()} items`,
    "url": categoryUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": productCount,
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${siteUrl}${createProductUrl(product.id, product.name)}`,
        "name": product.name
      }))
    }
  };

  return (
    <Helmet>
      <title>{categoryName} - Premium Spiritual Collection | Sacred Items Online</title>
      <meta name="description" content={`Shop premium ${categoryName.toLowerCase()} collection. ${productCount} authentic spiritual items with fast delivery across India.`} />
      <meta name="keywords" content={`${categoryName}, spiritual ${categoryName.toLowerCase()}, religious items, sacred collection, buy online`} />
      
      <link rel="canonical" href={categoryUrl} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${categoryName} Collection - Sacred Spiritual Items`} />
      <meta property="og:description" content={`Browse ${productCount} premium ${categoryName.toLowerCase()} items in our spiritual collection`} />
      <meta property="og:url" content={categoryUrl} />
      
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${categoryName} - Sacred Collection`} />
      <meta name="twitter:description" content={`Premium ${categoryName.toLowerCase()} collection with ${productCount} authentic items`} />
      
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

/**
 * Homepage SEO Meta Tags Component
 */
export const HomeSEO = ({ siteUrl = 'https://yoursite.com' }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sacred Collection",
    "url": siteUrl,
    "description": "Premium spiritual and religious items collection with authentic handcrafted idols, yantras, and sacred artifacts",
    "sameAs": [
      // Add your social media URLs here
      // "https://facebook.com/yourpage",
      // "https://instagram.com/yourpage"
    ]
  };

  return (
    <Helmet>
      <title>Sacred Collection - Premium Spiritual Items & Religious Artifacts Online</title>
      <meta name="description" content="Shop authentic spiritual items, handcrafted idols, sacred yantras, and religious artifacts. Premium quality spiritual collection with fast delivery across India." />
      <meta name="keywords" content="spiritual items, religious artifacts, handcrafted idols, sacred yantras, spiritual collection, religious shopping online India" />
      
      <link rel="canonical" href={siteUrl} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Sacred Collection - Premium Spiritual Items Online" />
      <meta property="og:description" content="Discover authentic spiritual items and religious artifacts. Premium handcrafted collection for your spiritual journey." />
      <meta property="og:url" content={siteUrl} />
      
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

const SEOComponents = { ProductSEO, CategorySEO, HomeSEO };
export default SEOComponents;
