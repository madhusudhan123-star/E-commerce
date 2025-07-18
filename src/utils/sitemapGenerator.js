/**
 * Sitemap Generator for SEO
 * 
 * This utility generates XML sitemaps for better search engine crawling
 */

import translations from './data';
import { createProductUrl, categorySlugs } from './urlSlugs';

/**
 * Generates sitemap URLs for all products
 */
export const generateProductSitemapUrls = (baseUrl = 'https://yoursite.com') => {
  return translations.products.product.map(product => ({
    url: `${baseUrl}${createProductUrl(product.id, product.name)}`,
    lastmod: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    changefreq: 'monthly',
    priority: '0.8',
    images: product.photo ? Object.values(product.photo).map(img => ({
      loc: `${baseUrl}${img}`,
      caption: product.name,
      title: product.name
    })) : []
  }));
};

/**
 * Generates sitemap URLs for all categories
 */
export const generateCategorySitemapUrls = (baseUrl = 'https://yoursite.com') => {
  return Object.entries(categorySlugs).map(([category, slug]) => ({
    url: `${baseUrl}/category/${slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7'
  }));
};

/**
 * Generates sitemap URLs for static pages
 */
export const generateStaticSitemapUrls = (baseUrl = 'https://yoursite.com') => {
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/store', priority: '0.9', changefreq: 'weekly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
    { path: '/shipping', priority: '0.4', changefreq: 'monthly' },
    { path: '/return', priority: '0.4', changefreq: 'monthly' }
  ];

  return staticPages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: page.changefreq,
    priority: page.priority
  }));
};

/**
 * Generates complete XML sitemap
 */
export const generateXMLSitemap = (baseUrl = 'https://yoursite.com') => {
  const staticUrls = generateStaticSitemapUrls(baseUrl);
  const categoryUrls = generateCategorySitemapUrls(baseUrl);
  const productUrls = generateProductSitemapUrls(baseUrl);
  
  const allUrls = [...staticUrls, ...categoryUrls, ...productUrls];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  allUrls.forEach(urlData => {
    xml += '  <url>\n';
    xml += `    <loc>${urlData.url}</loc>\n`;
    xml += `    <lastmod>${urlData.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${urlData.changefreq}</changefreq>\n`;
    xml += `    <priority>${urlData.priority}</priority>\n`;
    
    // Add image tags for products
    if (urlData.images && urlData.images.length > 0) {
      urlData.images.forEach(image => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${image.loc}</image:loc>\n`;
        xml += `      <image:caption>${image.caption}</image:caption>\n`;
        xml += `      <image:title>${image.title}</image:title>\n`;
        xml += '    </image:image>\n';
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

/**
 * Generates robots.txt content
 */
export const generateRobotsTxt = (baseUrl = 'https://yoursite.com') => {
  return `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and checkout pages
Disallow: /admin/
Disallow: /checkout/
Disallow: /billing/
Disallow: /api/

# Allow specific important pages
Allow: /product/
Allow: /category/
Allow: /store/
Allow: /about/
Allow: /contact/

# Crawl delay (optional)
Crawl-delay: 1`;
};

/**
 * Helper function to save sitemap to public folder
 * (This would typically be used in a build script)
 */
export const saveSitemapToPublic = (baseUrl = 'https://yoursite.com') => {
  const sitemap = generateXMLSitemap(baseUrl);
  const robots = generateRobotsTxt(baseUrl);
  
  // In a real application, you would write these to files
  console.log('Generated sitemap.xml:');
  console.log(sitemap);
  console.log('\nGenerated robots.txt:');
  console.log(robots);
  
  return { sitemap, robots };
};

/**
 * SEO Analysis helper
 */
export const analyzeSEO = () => {
  const products = translations.products.product;
  const categories = Object.keys(categorySlugs);
  
  const analysis = {
    totalProducts: products.length,
    totalCategories: categories.length,
    productsWithImages: products.filter(p => p.photo && Object.keys(p.photo).length > 0).length,
    productsWithReviews: products.filter(p => p.reviews && p.reviews.length > 0).length,
    productsWithRatings: products.filter(p => p.rating && p.rating > 0).length,
    averageNameLength: products.reduce((sum, p) => sum + p.name.length, 0) / products.length,
    averageDescriptionLength: products.reduce((sum, p) => sum + p.description.length, 0) / products.length,
    categoriesDistribution: categories.reduce((acc, cat) => {
      acc[cat] = products.filter(p => p.category === cat).length;
      return acc;
    }, {})
  };
  
  return analysis;
};

const sitemapUtils = {
  generateProductSitemapUrls,
  generateCategorySitemapUrls,
  generateStaticSitemapUrls,
  generateXMLSitemap,
  generateRobotsTxt,
  saveSitemapToPublic,
  analyzeSEO
};

export default sitemapUtils;
