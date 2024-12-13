import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '@formspree/react';
import translations from '../utils/data';

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1 },
    'United States': { currency: 'USD', symbol: '$', rate: 0.012 },
    'United Kingdom': { currency: 'GBP', symbol: '£', rate: 0.0096 },
    'European Union': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Australia': { currency: 'AUD', symbol: 'A$', rate: 0.018 },
    'Canada': { currency: 'CAD', symbol: 'C$', rate: 0.016 },
    'Japan': { currency: 'JPY', symbol: '¥', rate: 1.79 },
    'China': { currency: 'CNY', symbol: '¥', rate: 0.087 },
    'Brazil': { currency: 'BRL', symbol: 'R$', rate: 0.062 },
    'Russia': { currency: 'RUB', symbol: '₽', rate: 1.1 },
    'South Africa': { currency: 'ZAR', symbol: 'R', rate: 0.22 },
    'Mexico': { currency: 'MXN', symbol: '$', rate: 0.21 },
    'Switzerland': { currency: 'CHF', symbol: 'CHF', rate: 0.011 },
    'Singapore': { currency: 'SGD', symbol: 'S$', rate: 0.016 },
    'Sweden': { currency: 'SEK', symbol: 'kr', rate: 0.14 },
    'Norway': { currency: 'NOK', symbol: 'kr', rate: 0.12 },
    'South Korea': { currency: 'KRW', symbol: '₩', rate: 15.94 },
    'New Zealand': { currency: 'NZD', symbol: 'NZ$', rate: 0.02 },
    'Turkey': { currency: 'TRY', symbol: '₺', rate: 0.23 },
    'United Arab Emirates': { currency: 'AED', symbol: 'د.إ', rate: 0.044 },
    'Saudi Arabia': { currency: 'SAR', symbol: 'ر.س', rate: 0.045 },
    'Argentina': { currency: 'ARS', symbol: '$', rate: 2.04 },
    'Egypt': { currency: 'EGP', symbol: 'ج.م', rate: 0.36 },
    'Thailand': { currency: 'THB', symbol: '฿', rate: 0.43 },
    'Indonesia': { currency: 'IDR', symbol: 'Rp', rate: 191.7 },
    'Malaysia': { currency: 'MYR', symbol: 'RM', rate: 0.05 },
    'Vietnam': { currency: 'VND', symbol: '₫', rate: 283.32 },
    'Philippines': { currency: 'PHP', symbol: '₱', rate: 0.66 },
    'Nigeria': { currency: 'NGN', symbol: '₦', rate: 10.5 },
    'Pakistan': { currency: 'PKR', symbol: '₨', rate: 3.17 },
    'Bangladesh': { currency: 'BDT', symbol: '৳', rate: 1.02 },
    'Israel': { currency: 'ILS', symbol: '₪', rate: 0.045 },
    'Chile': { currency: 'CLP', symbol: '$', rate: 9.9 },
    'Peru': { currency: 'PEN', symbol: 'S/.', rate: 0.046 },
    'Colombia': { currency: 'COP', symbol: '$', rate: 48.12 },
    'Poland': { currency: 'PLN', symbol: 'zł', rate: 0.048 },
    'Finland': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Denmark': { currency: 'DKK', symbol: 'kr', rate: 0.08 },
    'Portugal': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Belgium': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Netherlands': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Austria': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Luxembourg': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Ireland': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Greece': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Spain': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Italy': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Czech Republic': { currency: 'CZK', symbol: 'Kč', rate: 0.25 },
    'Romania': { currency: 'RON', symbol: 'lei', rate: 0.05 },
    'Hungary': { currency: 'HUF', symbol: 'Ft', rate: 4.12 }
};
const DEFAULT_COUNTRY = 'India';
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY];
const VALID_PROMO_CODE = "";


const Checkout = ({ currentLang }) => {
    const t = translations || translations.ENGLISH;
    const location = useLocation();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [promoCode, setPromoCode] = useState("");
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [state, handleFormspreeSubmit] = useForm("xjkvpbyr");
    const [orderNumber, setOrderNumber] = useState(1); // Initial order number

    const [paymentMode, setPaymentMode] = useState("online");

    useEffect(() => {
        if (orderDetails) {
            // If orderDetails has a paymentMode, use it. Otherwise, default to "online".
            setPaymentMode(orderDetails.paymentMode || "online");
        }
    }, [orderDetails]);
    useEffect(() => {
        // Simulate fetching the latest order number from the backend
        const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
        setOrderNumber(parseInt(latestOrderNumber, 10));
    }, []);

    const incrementOrderNumber = () => {
        const nextOrderNumber = orderNumber + 1;
        setOrderNumber(nextOrderNumber);
        localStorage.setItem("orderNumber", nextOrderNumber); // Persist order number locally
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: DEFAULT_COUNTRY,
        streetAddress: '',
        apartment: '',
        townCity: '',
        phone: '',
        email: '',
        paymentMode: ""
    });

    // Add new state for product verification
    const [verifiedProduct, setVerifiedProduct] = useState(null);

    // Add useEffect to verify product details
    useEffect(() => {
        if (orderDetails) {
            // Verify product details from location state
            const productInfo = orderDetails.items ?
                orderDetails.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity || 1,
                    price: Number(item.price) || Number(item.cost) || 0, // Handle both price and cost
                })) :
                [{
                    name: orderDetails.productName,
                    quantity: orderDetails.quantity || 1,
                    price: Number(orderDetails.unitPrice) || Number(orderDetails.cost) || 0,
                }];

            setVerifiedProduct(productInfo);

            // Calculate and update total amount
            const totalAmount = productInfo.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

            setOrderDetails(prev => ({
                ...prev,
                totalAmount: totalAmount
            }));
        }
    }, [orderDetails]);

    // Update currency and convert amount when country changes
    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Ensure totalAmount is a number
            const baseAmount = Number(orderDetails.totalAmount) || 0;
            const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails]);

    // Original useEffects for initialization and script loading...
    useEffect(() => {
        if (!location.state) {
            navigate('/product');
            return;
        }
        setOrderDetails(location.state);

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [location.state, navigate]);

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.country.trim()) errors.country = 'Country is required';
        if (!formData.streetAddress.trim()) errors.streetAddress = 'Street address is required';
        if (!formData.townCity.trim()) errors.townCity = 'Town/City is required';

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        return errors;
    };

    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            let baseAmount = orderDetails.totalAmount; // Amount in INR
            if (isPromoApplied) {
                baseAmount *= 0.5; // Apply 50% discount
            }

            const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails, isPromoApplied]);

    const handlePromoCodeApply = () => {
        if (promoCode.trim().toUpperCase() === VALID_PROMO_CODE) {
            setIsPromoApplied(true);
            setFormErrors(prev => ({ ...prev, promoCode: "" }));
        } else {
            setIsPromoApplied(false);
            setFormErrors(prev => ({ ...prev, promoCode: "Invalid promo code" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (!formData.confirmedOrder) {
            setFormErrors(prev => ({
                ...prev,
                submit: "Please confirm your order details before proceeding"
            }));
            return;
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                // Use the paymentMode from orderDetails if available
                const currentPaymentMode = orderDetails.paymentMode || paymentMode;

                if (currentPaymentMode === 'online') {
                    handleRazorpayPayment();
                } else if (currentPaymentMode === 'cod') {
                    // Prepare the data for COD orders
                    const formSubmitData = {
                        customerDetails: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            address: formData.streetAddress,
                            apartment: formData.apartment,
                            city: formData.townCity,
                            country: formData.country,
                        },
                        orderDetails: {
                            orderNumber,
                            productName: orderDetails.productName,
                            quantity: orderDetails.quantity,
                            totalAmount: convertedAmount,
                            paymentMethod: "Cash on Delivery",
                            orderStatus: "Pending",
                        },
                    };

                    // Make sure to await the Formspree submission
                    const formResponse = await handleFormspreeSubmit(formSubmitData);

                    // Check if the submission was successful
                    if (formResponse && !formResponse.error) {
                        incrementOrderNumber();
                        setPaymentSuccess(true);
                    } else {
                        throw new Error('Failed to submit form to Formspree');
                    }

                    setIsSubmitting(false);
                } else {
                    throw new Error('Invalid payment mode');
                }
            } catch (error) {
                console.error('Submission error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: error.message || 'Failed to process order. Please try again.'
                }));
                setIsSubmitting(false);
            }
        }
    };
    const renderFormField = (name, label, type = "text", required = true) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${formErrors[name] ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors[name] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
            )}
        </div>
    );
    const handleRazorpayPayment = () => {
        const options = {
            key: 'rzp_live_tGJjXr7rvi6keg',
            amount: convertedAmount * 100,
            currency: currentCurrency.currency,
            name: 'Your Company Name',
            description: `Order for ${orderDetails.items ?
                orderDetails.items.map(item => item.name).join(", ") :
                orderDetails.productName}`,
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            handler: async function (response) {
                try {
                    const formSubmitData = {
                        customerDetails: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            address: formData.streetAddress,
                            apartment: formData.apartment,
                            city: formData.townCity,
                            country: formData.country,
                        },
                        orderDetails: {
                            orderNumber, // Add order number
                            items: orderDetails.items || [{
                                name: orderDetails.productName,
                                quantity: orderDetails.quantity,
                                price: orderDetails.unitPrice
                            }],
                            totalAmount: convertedAmount, // Use the discounted amount
                            currency: currentCurrency.currency,
                            paymentMethod: "Online Payment (Razorpay)",
                            paymentId: response.razorpay_payment_id,
                            orderStatus: "Paid",
                        },
                    };

                    const formResponse = await handleFormspreeSubmit(formSubmitData);

                    if (formResponse && !formResponse.error) {
                        incrementOrderNumber(); // Increment order number after successful submission
                        setPaymentSuccess(true);
                    } else {
                        throw new Error("Failed to submit form to Formspree");
                    }

                    setIsSubmitting(false);
                } catch (error) {
                    console.error("Order submission error:", error);
                    setFormErrors(prev => ({
                        ...prev,
                        submit: "Payment successful but failed to send order details. Please contact support.",
                    }));
                    setIsSubmitting(false);
                }
            },
            modal: {
                ondismiss: function () {
                    setIsSubmitting(false);
                }
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    // Add new function to handle product removal
    const handleRemoveProduct = (productIndex) => {
        if (orderDetails.items) {
            const updatedItems = orderDetails.items.filter((_, index) => index !== productIndex);
            const processedItems = updatedItems.map(item => ({
                ...item,
                price: Number(item.price) || Number(item.cost) || 0,
                quantity: Number(item.quantity) || 1
            }));

            const newTotalAmount = processedItems.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

            setOrderDetails({
                ...orderDetails,
                items: processedItems,
                totalAmount: newTotalAmount
            });

            // Update local storage
            localStorage.setItem('cartItems', JSON.stringify(processedItems));

            if (processedItems.length === 0) {
                navigate('/cart');
            }
        }
    };

    // Update renderOrderSummary to include remove button
    const renderOrderSummary = () => (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {translations.checkout.order}
            </h2>

            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Review</h3>
                {verifiedProduct && verifiedProduct.map((product, index) => (
                    <div key={index} className="border-b border-gray-200 py-4">
                        <div className="flex justify-between mb-2">
                            <div className="flex-1">
                                <span className="font-medium text-gray-800">{product.name}</span>
                                <span className="text-gray-600 ml-2">x {product.quantity}</span>
                            </div>
                            <button
                                onClick={() => handleRemoveProduct(index)}
                                className="text-red-500 hover:text-red-700 ml-4"
                                title="Remove item"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Unit Price:</span>
                            <span>{currentCurrency.symbol} {((product.price) * currentCurrency.rate).toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                {/* Existing order summary content */}
                <div className="flex justify-between py-2 border-t border-gray-200">
                    <span className="font-medium text-gray-700">{translations.checkout.subtotal}</span>
                    <span className="text-gray-700">{currentCurrency.symbol} {convertedAmount}</span>
                </div>

                <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-700">{translations.checkout.shipping}</span>
                    <span className="text-green-600">Free</span>
                </div>

                {/* Add order confirmation checkbox */}
                <div className="py-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            required
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                confirmedOrder: e.target.checked
                            }))}
                        />
                        <span className="text-sm text-gray-700">
                            I confirm that the product details and order information are correct
                        </span>
                    </label>
                </div>

                <div className="flex justify-between py-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">{translations.checkout.total}</span>
                    <span className="text-lg font-bold text-gray-800">
                        {currentCurrency.symbol} {convertedAmount}
                    </span>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg
                        transition-all duration-200 transform hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {translations.checkout.processing}

                        </div>
                    ) : (
                        translations.checkout.order
                    )}
                </button>
            </div>
        </div>
    );


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (!orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (paymentSuccess || state.succeeded) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className="bg-green-50 rounded-lg p-8 border border-green-200">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                        {translations.checkout.successfully}
                    </h2>
                    <p className="text-gray-600 mb-2">
                        {translations.checkout.orderNumber}: {orderNumber}
                    </p>
                    <p className="text-gray-600 mb-6">
                        {translations.checkout.thank}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        {translations.checkout.continue}
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className='mt-64'>
            <div className="max-w-7xl mx-auto px-4 py-12 ">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    {translations.checkout.title}
                </h1>

                {formErrors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
                        {formErrors.submit}
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {translations.checkout.sectitle}
                            </h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {renderFormField("firstName", translations.checkout.firstname)}
                                    {renderFormField("lastName", translations.checkout.lastname)}
                                </div>
                                {/* Country selector */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {translations.checkout.country}<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                                            <option key={country} value={country}>
                                                {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {renderFormField("streetAddress", translations.checkout.address)}
                                {renderFormField("apartment", translations.checkout.clientaddress, "text", false)}
                                {renderFormField("townCity", translations.checkout.city)}
                                {renderFormField("phone", translations.checkout.phone, "tel")}
                                {renderFormField("email", translations.checkout.email, "email")}
                            </div>
                        </div>
                    </div>

                    <div>
                        {renderOrderSummary()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;