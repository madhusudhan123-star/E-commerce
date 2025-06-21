import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        necessary: true, // Always true, cannot be disabled
        analytics: false,
        marketing: false,
        functional: false
    });

    // Check if user has already made a choice
    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show banner after 2 seconds for better UX
            setTimeout(() => setShowBanner(true), 2000);
        } else {
            const savedPreferences = JSON.parse(consent);
            setCookiePreferences(savedPreferences);
            loadCookies(savedPreferences);
        }
    }, []);

    // Load cookies based on preferences
    const loadCookies = (preferences) => {
        if (preferences.analytics) {
            // Load Google Analytics or other analytics
            loadAnalytics();
        }
        if (preferences.marketing) {
            // Load marketing/advertising cookies
            loadMarketing();
        }
        if (preferences.functional) {
            // Load functional cookies
            loadFunctional();
        }
    };

    const loadAnalytics = () => {
        // Example: Google Analytics
        console.log('Loading Analytics cookies...');
        // You can add Google Analytics code here
    };

    const loadMarketing = () => {
        // Example: Facebook Pixel, Google Ads
        console.log('Loading Marketing cookies...');
        // You can add marketing tracking code here
    };

    const loadFunctional = () => {
        // Example: Chat widgets, preferences
        console.log('Loading Functional cookies...');
        // You can add functional cookies here
    };

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        setCookiePreferences(allAccepted);
        localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        loadCookies(allAccepted);
        setShowBanner(false);
    };

    const handleRejectAll = () => {
        const onlyNecessary = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        setCookiePreferences(onlyNecessary);
        localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        setShowBanner(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        loadCookies(cookiePreferences);
        setShowBanner(false);
        setShowPreferences(false);
    };

    const togglePreference = (type) => {
        if (type === 'necessary') return; // Cannot be disabled
        setCookiePreferences(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const cookieInfo = {
        necessary: {
            title: 'Necessary Cookies',
            description: 'Essential for website functionality, security, and user authentication. Cannot be disabled.',
            examples: 'Shopping cart, login status, security tokens'
        },
        analytics: {
            title: 'Analytics Cookies',
            description: 'Help us understand how visitors interact with our website to improve user experience.',
            examples: 'Google Analytics, page views, user behavior tracking'
        },
        marketing: {
            title: 'Marketing Cookies',
            description: 'Used to deliver personalized advertisements and track marketing campaign effectiveness.',
            examples: 'Facebook Pixel, Google Ads, retargeting pixels'
        },
        functional: {
            title: 'Functional Cookies',
            description: 'Enable enhanced functionality and personalization features.',
            examples: 'Language preferences, chat widgets, social media features'
        }
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setShowBanner(false)}
                    />

                    {/* Cookie Banner */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 500 }}
                        className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-500 shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="container mx-auto px-4 py-6">
                            {!showPreferences ? (
                                // Main Banner
                                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                                    {/* Cookie Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🍪</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2 headerstyle">
                                            We Value Your Privacy
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            We use cookies to enhance your browsing experience, provide personalized content, 
                                            analyze our traffic, and improve our spiritual e-commerce platform. Your data helps us 
                                            serve you better while respecting your privacy choices.
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                                            <span>Secure & Encrypted</span>
                                            <span>•</span>
                                            <span>Anonymous Analytics</span>
                                            <span>•</span>
                                            <span>Personalized Experience</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                                        {/* <button
                                            onClick={handleRejectAll}
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            Reject All
                                        </button> */}
                                        <button
                                            onClick={() => setShowPreferences(true)}
                                            className="px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200"
                                        >
                                            Customize
                                        </button>
                                        <button
                                            onClick={handleAcceptAll}
                                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                        >
                                            Accept All
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Preferences Panel
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-gray-800 headerstyle">
                                            Cookie Preferences
                                        </h3>
                                        <button
                                            onClick={() => setShowPreferences(false)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="grid gap-6 max-h-96 overflow-y-auto">
                                        {Object.entries(cookieInfo).map(([key, info]) => (
                                            <div key={key} className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                                            {info.title}
                                                            {key === 'necessary' && (
                                                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                                                    Required
                                                                </span>
                                                            )}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm mb-2">
                                                            {info.description}
                                                        </p>
                                                        <p className="text-gray-500 text-xs">
                                                            <strong>Examples:</strong> {info.examples}
                                                        </p>
                                                    </div>
                                                    <div className="ml-4">
                                                        <button
                                                            onClick={() => togglePreference(key)}
                                                            disabled={key === 'necessary'}
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                                                                cookiePreferences[key]
                                                                    ? 'bg-orange-500'
                                                                    : 'bg-gray-300'
                                                            } ${key === 'necessary' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                        >
                                                            <span
                                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                                    cookiePreferences[key] ? 'translate-x-6' : 'translate-x-1'
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
                                        {/* <button
                                            onClick={handleRejectAll}
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            Reject All
                                        </button> */}
                                        <button
                                            onClick={handleSavePreferences}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                        >
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;