// Cookie utility functions for managing different types of cookies

// Utility function to set a cookie
export const setCookie = (name, value, days = 365, path = '/') => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${path};SameSite=Lax`;
};

// Utility function to get a cookie
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

// Utility function to delete a cookie
export const deleteCookie = (name, path = '/') => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${path}`;
};

// Check if user has consented to specific cookie types
export const hasConsentFor = (cookieType) => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) return false;
    
    try {
        const preferences = JSON.parse(consent);
        return preferences[cookieType] === true;
    } catch (error) {
        console.error('Error parsing cookie consent:', error);
        return false;
    }
};

// Get all cookie preferences
export const getCookiePreferences = () => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) return null;
    
    try {
        return JSON.parse(consent);
    } catch (error) {
        console.error('Error parsing cookie consent:', error);
        return null;
    }
};

// Necessary cookies (always allowed)
export const setNecessaryCookie = (name, value, days = 365) => {
    setCookie(name, value, days);
};

// Analytics cookies (only if user consented)
export const setAnalyticsCookie = (name, value, days = 365) => {
    if (hasConsentFor('analytics')) {
        setCookie(name, value, days);
        return true;
    }
    return false;
};

// Marketing cookies (only if user consented)
export const setMarketingCookie = (name, value, days = 365) => {
    if (hasConsentFor('marketing')) {
        setCookie(name, value, days);
        return true;
    }
    return false;
};

// Functional cookies (only if user consented)
export const setFunctionalCookie = (name, value, days = 365) => {
    if (hasConsentFor('functional')) {
        setCookie(name, value, days);
        return true;
    }
    return false;
};

// Clean up cookies when user withdraws consent
export const cleanupCookiesByType = (cookieType) => {
    const cookiesToClean = {
        analytics: ['_ga', '_gid', '_gat', '_gtag', 'analytics_session'],
        marketing: ['_fbp', '_fbc', 'marketing_pixel', 'ads_data'],
        functional: ['user_preferences', 'chat_session', 'language_pref']
    };

    if (cookiesToClean[cookieType]) {
        cookiesToClean[cookieType].forEach(cookieName => {
            deleteCookie(cookieName);
            deleteCookie(cookieName, '/');
            // Also try to delete with domain
            if (window.location.hostname) {
                deleteCookie(cookieName, '/', window.location.hostname);
            }
        });
    }
};

// Initialize Google Analytics (only if consented)
export const initializeGoogleAnalytics = (trackingId) => {
    if (!hasConsentFor('analytics')) return false;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', trackingId, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure'
    });

    return true;
};

// Initialize Facebook Pixel (only if consented)
export const initializeFacebookPixel = (pixelId) => {
    if (!hasConsentFor('marketing')) return false;

    // Facebook Pixel Code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    return true;
};

// Shopping cart cookies (necessary)
export const setCartCookie = (cartData) => {
    setNecessaryCookie('shopping_cart', JSON.stringify(cartData), 7); // 7 days
};

export const getCartCookie = () => {
    const cartData = getCookie('shopping_cart');
    if (cartData) {
        try {
            return JSON.parse(cartData);
        } catch (error) {
            console.error('Error parsing cart cookie:', error);
            return null;
        }
    }
    return null;
};

// User preferences cookies (functional)
export const setUserPreferences = (preferences) => {
    if (setFunctionalCookie('user_preferences', JSON.stringify(preferences), 365)) {
        return true;
    }
    // Store in localStorage as fallback if functional cookies not allowed
    localStorage.setItem('user_preferences_fallback', JSON.stringify(preferences));
    return false;
};

export const getUserPreferences = () => {
    if (hasConsentFor('functional')) {
        const prefs = getCookie('user_preferences');
        if (prefs) {
            try {
                return JSON.parse(prefs);
            } catch (error) {
                console.error('Error parsing user preferences cookie:', error);
            }
        }
    }
    
    // Fallback to localStorage
    const fallbackPrefs = localStorage.getItem('user_preferences_fallback');
    if (fallbackPrefs) {
        try {
            return JSON.parse(fallbackPrefs);
        } catch (error) {
            console.error('Error parsing fallback preferences:', error);
        }
    }
    
    return null;
};

// Session management (necessary)
export const setSessionCookie = (sessionId) => {
    setNecessaryCookie('session_id', sessionId, 1); // 1 day
};

export const getSessionCookie = () => {
    return getCookie('session_id');
};

// Language preference (functional)
export const setLanguagePreference = (language) => {
    setFunctionalCookie('language_pref', language, 365);
};

export const getLanguagePreference = () => {
    return getCookie('language_pref') || 'en'; // Default to English
};

// Recently viewed products (functional)
export const addToRecentlyViewed = (productId) => {
    if (!hasConsentFor('functional')) return false;

    let recentlyViewed = getRecentlyViewed();
    
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    
    // Add to beginning
    recentlyViewed.unshift(productId);
    
    // Keep only last 10 items
    recentlyViewed = recentlyViewed.slice(0, 10);
    
    setFunctionalCookie('recently_viewed', JSON.stringify(recentlyViewed), 30);
    return true;
};

export const getRecentlyViewed = () => {
    if (!hasConsentFor('functional')) return [];

    const recentlyViewed = getCookie('recently_viewed');
    if (recentlyViewed) {
        try {
            return JSON.parse(recentlyViewed);
        } catch (error) {
            console.error('Error parsing recently viewed cookie:', error);
        }
    }
    return [];
};

// GDPR compliance helper
export const isGDPRCountry = () => {
    // List of EU countries that require GDPR compliance
    const gdprCountries = [
        'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 
        'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 
        'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'
    ];
    
    // You would typically get this from a geolocation service
    // For now, return true to always show cookie consent
    return true;
};

// Cookie consent expiry check
export const isCookieConsentExpired = () => {
    const consentDate = localStorage.getItem('cookieConsentDate');
    if (!consentDate) return true;
    
    const consentTime = new Date(consentDate);
    const now = new Date();
    const daysDiff = Math.floor((now - consentTime) / (1000 * 60 * 60 * 24));
    
    // Consider consent expired after 365 days
    return daysDiff > 365;
};

// Clear all non-necessary cookies
export const clearAllCookies = () => {
    cleanupCookiesByType('analytics');
    cleanupCookiesByType('marketing');
    cleanupCookiesByType('functional');
};