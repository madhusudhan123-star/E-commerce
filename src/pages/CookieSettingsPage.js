import React from 'react';
import CookieSettings from '../components/CookieSettings';

const CookieSettingsPage = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 headerstyle mb-4">
                            Privacy & Cookie Settings
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Manage your privacy preferences and control how we use cookies on our website.
                        </p>
                    </div>

                    {/* Privacy Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Your Privacy Matters
                        </h2>
                        <div className="prose max-w-none text-gray-600">
                            <p className="mb-4">
                                At our spiritual e-commerce platform, we respect your privacy and are committed to protecting your personal data. 
                                We use cookies and similar technologies to enhance your browsing experience, provide personalized content, 
                                and analyze our website traffic.
                            </p>
                            <p className="mb-4">
                                You have full control over your cookie preferences. You can accept all cookies, reject non-essential ones, 
                                or customize your settings based on your preferences. Your choices will be remembered and you can change 
                                them at any time.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-orange-50 rounded-xl p-4">
                                <h3 className="font-semibold text-orange-800 mb-2">🔒 Data Security</h3>
                                <p className="text-orange-700 text-sm">
                                    All data is encrypted and stored securely. We never sell your personal information to third parties.
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4">
                                <h3 className="font-semibold text-blue-800 mb-2">⚡ Performance</h3>
                                <p className="text-blue-700 text-sm">
                                    Analytics cookies help us improve website performance and user experience.
                                </p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4">
                                <h3 className="font-semibold text-green-800 mb-2">🎯 Personalization</h3>
                                <p className="text-green-700 text-sm">
                                    Functional cookies remember your preferences and enhance your shopping experience.
                                </p>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4">
                                <h3 className="font-semibold text-purple-800 mb-2">📊 Analytics</h3>
                                <p className="text-purple-700 text-sm">
                                    We use anonymous data to understand how visitors interact with our website.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cookie Settings Button */}
                    <div className="text-center">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            <span>🍪</span>
                            Manage Cookie Settings
                        </button>
                    </div>

                    {/* Legal Links */}
                    <div className="text-center mt-8 text-sm text-gray-500">
                        <p>
                            For more information, please read our{' '}
                            <a href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</a>
                            {' '}and{' '}
                            <a href="/terms-of-service" className="text-orange-600 hover:underline">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Cookie Settings Modal */}
            <CookieSettings 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
            />
        </div>
    );
};

export default CookieSettingsPage;