import React from 'react';
import { motion } from 'framer-motion';
import { getCookiePreferences, hasConsentFor, clearAllCookies } from '../utils/cookieUtils';

const CookieSettings = ({ isOpen, onClose }) => {
    const [preferences, setPreferences] = React.useState({
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false
    });

    React.useEffect(() => {
        const savedPreferences = getCookiePreferences();
        if (savedPreferences) {
            setPreferences(savedPreferences);
        }
    }, []);

    const togglePreference = (type) => {
        if (type === 'necessary') return;
        setPreferences(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const savePreferences = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        
        // Clear cookies if user disabled them
        Object.keys(preferences).forEach(type => {
            if (!preferences[type] && type !== 'necessary') {
                clearAllCookies();
            }
        });
        
        onClose();
        window.location.reload(); // Reload to apply new settings
    };

    const clearAllData = () => {
        if (window.confirm('This will clear all cookies and stored data. Are you sure?')) {
            localStorage.removeItem('cookieConsent');
            localStorage.removeItem('cookieConsentDate');
            clearAllCookies();
            setPreferences({
                necessary: true,
                analytics: false,
                marketing: false,
                functional: false
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 headerstyle">
                            🍪 Cookie Settings
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Current Status */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Current Status</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                    <span>Necessary: Active</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${hasConsentFor('analytics') ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span>Analytics: {hasConsentFor('analytics') ? 'Active' : 'Inactive'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${hasConsentFor('marketing') ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span>Marketing: {hasConsentFor('marketing') ? 'Active' : 'Inactive'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${hasConsentFor('functional') ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span>Functional: {hasConsentFor('functional') ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Cookie Categories */}
                        <div className="space-y-4">
                            {/* Necessary */}
                            <div className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-800">🔒 Necessary Cookies</h4>
                                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                        Always Active
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Essential for website functionality and security. These cannot be disabled.
                                </p>
                                <p className="text-xs text-gray-500">
                                    Examples: Shopping cart, login status, security tokens, session management
                                </p>
                            </div>

                            {/* Analytics */}
                            <div className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-800">📊 Analytics Cookies</h4>
                                    <button
                                        onClick={() => togglePreference('analytics')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                                            preferences.analytics ? 'bg-orange-500' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Help us understand how visitors interact with our website to improve user experience.
                                </p>
                                <p className="text-xs text-gray-500">
                                    Examples: Google Analytics, page views, user behavior tracking, performance metrics
                                </p>
                            </div>

                            {/* Marketing */}
                            <div className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-800">🎯 Marketing Cookies</h4>
                                    <button
                                        onClick={() => togglePreference('marketing')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                                            preferences.marketing ? 'bg-orange-500' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Used to deliver personalized advertisements and track marketing campaign effectiveness.
                                </p>
                                <p className="text-xs text-gray-500">
                                    Examples: Facebook Pixel, Google Ads, retargeting pixels, conversion tracking
                                </p>
                            </div>

                            {/* Functional */}
                            <div className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-800">⚙️ Functional Cookies</h4>
                                    <button
                                        onClick={() => togglePreference('functional')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                                            preferences.functional ? 'bg-orange-500' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                preferences.functional ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Enable enhanced functionality and personalization features.
                                </p>
                                <p className="text-xs text-gray-500">
                                    Examples: Language preferences, recently viewed products, chat widgets, social media features
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                            <button
                                onClick={clearAllData}
                                className="px-4 py-2 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
                            >
                                Clear All Data
                            </button>
                            <div className="flex gap-3 flex-1">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={savePreferences}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CookieSettings;