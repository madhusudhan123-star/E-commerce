/**
 * Utility functions for creating SEO-optimized URL slugs from product names
 */

/**
 * Creates a SEO-friendly URL slug from a product name
 * @param {string} productName - The product name to convert
 * @returns {string} - SEO-optimized URL slug
 */
export const createUrlSlug = (productName) => {
  if (!productName || typeof productName !== 'string') {
    return '';
  }

  return productName
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Creates a product URL with slug
 * @param {number} productId - The product ID
 * @param {string} productName - The product name
 * @returns {string} - Complete product URL
 */
export const createProductUrl = (productId, productName) => {
  const slug = createUrlSlug(productName);
  return `/product/${productId}/${slug}`;
};

/**
 * Creates a category URL with slug
 * @param {string} categoryName - The category name
 * @returns {string} - Complete category URL
 */
export const createCategoryUrl = (categoryName) => {
  const slug = createUrlSlug(categoryName);
  return `/category/${slug}`;
};

/**
 * Extracts product ID from URL slug
 * @param {string} url - The URL containing product ID and slug
 * @returns {number|null} - Extracted product ID or null if not found
 */
export const extractProductIdFromUrl = (url) => {
  const match = url.match(/\/product\/(\d+)\//);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Validates if a URL slug matches the expected format
 * @param {string} slug - The URL slug to validate
 * @param {string} expectedName - The expected product name
 * @returns {boolean} - True if slug matches expected format
 */
export const validateSlug = (slug, expectedName) => {
  const expectedSlug = createUrlSlug(expectedName);
  return slug === expectedSlug;
};

/**
 * Pre-generated URL slugs for all products (for better performance)
 */
export const productSlugs = {
  // Idols
  1: 'sree-astha-laxmi',
  2: 'sree-anjaneya-shani-raksha',
  3: 'sree-dhana-laxmi-akarsha-pack',
  
  // Yantras
  4: 'meru-ring',
  6: 'sree-anjaneyas-gada',
  7: 'shri-hanuman-chalisa-yantra-locket',
  8: 'shree-yantra-wall-hanging',
};

/**
 * Category slugs for SEO-friendly category URLs
 */
export const categorySlugs = {
  'Idols': 'spiritual-idols',
  'Yantras': 'sacred-yantras',
  'Statues': 'divine-statues',
  'Handicrafts': 'sacred-handicrafts',
};

/**
 * Reverse mapping for slugs to product IDs (for routing)
 */
export const slugToProductId = Object.fromEntries(
  Object.entries(productSlugs).map(([id, slug]) => [slug, parseInt(id, 10)])
);

/**
 * Reverse mapping for category slugs
 */
export const slugToCategory = Object.fromEntries(
  Object.entries(categorySlugs).map(([category, slug]) => [slug, category])
);

export default {
  createUrlSlug,
  createProductUrl,
  createCategoryUrl,
  extractProductIdFromUrl,
  validateSlug,
  productSlugs,
  categorySlugs,
  slugToProductId,
  slugToCategory,
};
