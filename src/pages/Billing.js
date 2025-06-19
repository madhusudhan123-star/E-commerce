import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import translations from '../utils/data';
import defaultProductImage from '../assets/main/img1.webp'; // Default product image as fallback
import product1 from '../assets/main/sree dhana laxmi akarsha pack/5.webp';
import product2 from '../assets/main/sree dhana laxmi akarsha pack/6.webp';

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

// API configuration
const API_BASE_URL = "https://razorpaybackend-wgbh.onrender.com"; // Update this to match your deployed backend URL

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
    const [orderNumber, setOrderNumber] = useState(1);
    const [paymentMode, setPaymentMode] = useState("online");
    
    // New state variables for payment processing
    const [processingPayment, setProcessingPayment] = useState(false);
    const [razorpayOrderId, setRazorpayOrderId] = useState(null);
    const [paymentId, setPaymentId] = useState(null);
    const [orderCreationError, setOrderCreationError] = useState(null);
    const [verificationError, setVerificationError] = useState(null);
    const [isPageLeaving, setIsPageLeaving] = useState(false);
    const [hasFormData, setHasFormData] = useState(false);
    const [orderSuccessDetails, setOrderSuccessDetails] = useState(null);

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
        if (orderDetails && !verifiedProduct) { // Add condition to prevent infinite loop
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
                
                if (totalAmount !== orderDetails.totalAmount) {
                    setOrderDetails(prev => ({
                    ...prev,
                    totalAmount: totalAmount
                }));
            }
        }
    }, [orderDetails, verifiedProduct]); // Add verifiedProduct to dependencies

    console.log("can you verifiy",orderDetails)
    // Update currency and convert amount when country changes
    useEffect(() => {
        if (orderDetails && orderDetails.totalAmount) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Ensure totalAmount is a number
            let baseAmount = Number(orderDetails.totalAmount); // Amount in INR
            if (isPromoApplied) {
                baseAmount *= 0.5; // Apply 50% discount
            }

            const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails?.totalAmount, isPromoApplied]); // Specific dependencies

    // Original useEffects for initialization and script loading...
    useEffect(() => {
        if (!location.state) {
            navigate('/');
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

    // Add payment method radio selection
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('online');

    // Check if basic customer information is filled
    useEffect(() => {
        if (formData.email && formData.firstName && formData.phone) {
            setHasFormData(true);
        } else {
            setHasFormData(false);
        }
    }, [formData.email, formData.firstName, formData.phone]);

    // Set up abandoned cart handler
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasFormData && !paymentSuccess && !isSubmitting) {
                sendAbandonedCartEmail();
                // The browser will display a confirmation dialog
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasFormData, paymentSuccess, isSubmitting]);

    // API service functions
    const createRazorpayOrder = async () => {
        try {
            setProcessingPayment(true);
            setOrderCreationError(null);
            
            const response = await fetch(`${API_BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(convertedAmount),
                    currency: currentCurrency.currency,
                    receipt: `receipt_${orderNumber}_${Date.now()}`,
                    notes: {
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        customerEmail: formData.email,
                        customerPhone: formData.phone,
                        productDetails: JSON.stringify(verifiedProduct)
                    }
                }),
            });

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to create order');
            }
            
            setRazorpayOrderId(data.order.id);
            return {
                orderId: data.order.id,
                key: data.key
            };
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            setOrderCreationError(error.message);
            setProcessingPayment(false);
            return null;
        }
    };

    const verifyRazorpayPayment = async (paymentData) => {
        try {
            setVerificationError(null);
            
            const response = await fetch(`${API_BASE_URL}/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Payment verification failed');
            }
            
            setPaymentId(data.paymentId);
            return true;
        } catch (error) {
            console.error('Error verifying payment:', error);
            setVerificationError(error.message);
            return false;
        }
    };

    const sendOrderConfirmationEmail = async () => {
        try {
            // Format products data
            const products = verifiedProduct || [];
            
            const emailData = {
                customerEmail: formData.email,
                orderDetails: {
                    orderNumber,
                    products,
                    totalAmount: convertedAmount,
                    currency: currentCurrency.symbol,
                    paymentMethod: paymentMode === 'online' ? 'Online Payment (Razorpay)' : 'Cash on Delivery',
                    paymentId: paymentId || 'N/A'
                },
                customerDetails: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.streetAddress,
                    apartment: formData.apartment,
                    city: formData.townCity,
                    country: formData.country
                }
            };

            const response = await fetch(`${API_BASE_URL}/send-order-confirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            const data = await response.json();
            if (!data.success) {
                console.warn('Failed to send order confirmation email:', data.message);
            }
            
            return data.success;
        } catch (error) {
            console.error('Error sending order confirmation email:', error);
            return false;
        }
    };

    const sendAbandonedCartEmail = async () => {
        // Only proceed if we have enough customer information
        if (!hasFormData) return;
        
        try {
            // Format products data
            const products = verifiedProduct || [];
            
            const emailData = {
                customerEmail: formData.email,
                orderDetails: {
                    orderNumber,
                    products,
                    totalAmount: convertedAmount,
                    currency: currentCurrency.symbol
                },
                customerDetails: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.streetAddress,
                    apartment: formData.apartment,
                    city: formData.townCity,
                    country: formData.country
                }
            };

            const response = await fetch(`${API_BASE_URL}/send-abandoned-order-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            const data = await response.json();
            if (!data.success) {
                console.warn('Failed to send abandoned cart email:', data.message);
            }
            
            return data.success;
        } catch (error) {
            console.error('Error sending abandoned cart email:', error);
            return false;
        }
    };

    // Handle Razorpay payment
    const handleRazorpayPayment = async () => {
        try {
            // Create order first
            const orderData = await createRazorpayOrder();
            
            if (!orderData) {
                throw new Error('Failed to create payment order');
            }
            
            const { orderId, key } = orderData;

            // Initialize Razorpay options
            const options = {
                key,
                amount: parseFloat(convertedAmount) * 100, // Amount in smallest currency unit
                currency: currentCurrency.currency,
                name: 'Your Store Name', // Replace with your actual store name
                description: 'Purchase',
                order_id: orderId,
                handler: function(response) {
                    handlePaymentSuccess(response);
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                notes: {
                    address: formData.streetAddress
                },
                theme: {
                    color: '#3399cc'
                },
                modal: {
                    ondismiss: function() {
                        setProcessingPayment(false);
                        console.log('Payment window closed without completing payment');
                    }
                }
            };
            
            // Open Razorpay checkout
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error initializing Razorpay payment:', error);
            setFormErrors(prev => ({
                ...prev,
                submit: `Payment initialization failed: ${error.message}`
            }));
            setProcessingPayment(false);
        }
    };

    // Handle successful payment
    const handlePaymentSuccess = async (response) => {
        try {
            // Verify payment with backend
            const paymentData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
            };
            
            const verified = await verifyRazorpayPayment(paymentData);
            
            if (!verified) {
                throw new Error('Payment verification failed');
            }
            
            // Set payment ID
            setPaymentId(response.razorpay_payment_id);
            
            // Send order confirmation email
            await sendOrderConfirmationEmail();
            
            // Create order details object to pass to thank you page
            const orderData = {
                orderNumber: orderNumber,
                paymentId: response.razorpay_payment_id,
                amount: convertedAmount,
                currency: currentCurrency.symbol,
                paymentMethod: 'Online Payment'
            };
            
            // Update order number in localStorage
            incrementOrderNumber();
            setProcessingPayment(false);
            
            // Navigate to thank you page with order details
            navigate('/thank-you', { state: { orderData } });
            
        } catch (error) {
            console.error('Error processing payment:', error);
            setFormErrors(prev => ({
                ...prev,
                submit: `Payment processing error: ${error.message}`
            }));
            setProcessingPayment(false);
        }
    };
    
    // Handle Cash on Delivery
    const handleCashOnDelivery = async () => {
        try {
            setProcessingPayment(true);
            
            // Generate a pseudo order/payment ID for COD
            const codOrderId = `COD_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
            setPaymentId(codOrderId);
            
            // Send order confirmation email
            await sendOrderConfirmationEmail();
            
            // Create order details object to pass to thank you page
            const orderData = {
                orderNumber: orderNumber,
                paymentId: codOrderId,
                amount: convertedAmount,
                currency: currentCurrency.symbol,
                paymentMethod: 'Cash on Delivery'
            };
            
            // Update order number in localStorage
            incrementOrderNumber();
            setProcessingPayment(false);
            
            // Navigate to thank you page with order details
            navigate('/thank-you', { state: { orderData } });
            
        } catch (error) {
            console.error('Error processing COD order:', error);
            setFormErrors(prev => ({
                ...prev,
                submit: `Order processing error: ${error.message}`
            }));
            setProcessingPayment(false);
        }
    };
    
    // Updated form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const errors = validateForm();
        setFormErrors(errors);
        
        if (Object.keys(errors).length > 0) {
            console.log('Form has errors:', errors);
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            if (selectedPaymentMethod === 'online') {
                await handleRazorpayPayment();
            } else if (selectedPaymentMethod === 'cod') {
                await handleCashOnDelivery();
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            setFormErrors(prev => ({
                ...prev,
                submit: `Order submission failed: ${error.message}`
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Add handleInputChange function
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear any errors for this field when user is typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Add handleRemoveProduct function
    const handleRemoveProduct = (productIndex) => {
        if (!verifiedProduct) return;
        
        // Make a copy of the products array without the removed item
        const updatedProducts = verifiedProduct.filter((_, index) => index !== productIndex);
        
        if (updatedProducts.length === 0) {
            // If no products left, navigate back to cart
            navigate('/shop');
            return;
        }
        
        // Calculate new total amount
        const newTotalAmount = updatedProducts.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        // Update the verified product state
        setVerifiedProduct(updatedProducts);
        
        // Update order details with new product list and total
        setOrderDetails(prev => ({
            ...prev,
            items: updatedProducts,
            totalAmount: newTotalAmount
        }));
    };
    
    // Checkout steps indicator component
    const CheckoutSteps = () => {
        return (
            <div className="mb-8 px-4 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium mt-2 text-gray-700">Cart</span>
                    </div>
                    <div className="flex-1 h-0.5 mx-2 bg-blue-600"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium mt-2 text-gray-700">Billing</span>
                    </div>
                    <div className="flex-1 h-0.5 mx-2 bg-gray-300"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium mt-2 text-gray-500">Payment</span>
                    </div>
                    <div className="flex-1 h-0.5 mx-2 bg-gray-300"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium mt-2 text-gray-500">Confirmation</span>
                    </div>
                </div>
            </div>
        );
    };

    // Enhanced form field renderer with icons
    const renderFormField = (name, label, type = "text", required = true, icon = null) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className={`w-full ${icon ? 'pl-10' : 'px-4'} py-3 rounded-lg border ${formErrors[name] ? 'border-red-500' : 'border-gray-300'} 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm`}
                />
            </div>
            {formErrors[name] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
            )}
        </div>
    );

    // Enhanced payment method selector with images
    const renderPaymentMethodSelector = () => (
        <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 
                    ${selectedPaymentMethod === 'online' 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={selectedPaymentMethod === 'online'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex items-center">
                        <div className="mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-900 font-medium">Online Payment</span>
                            <p className="text-gray-500 text-sm">Card/UPI/Netbanking</p>
                        </div>
                    </div>
                </label>
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 
                    ${selectedPaymentMethod === 'cod' 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={selectedPaymentMethod === 'cod'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex items-center">
                        <div className="mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-900 font-medium">Cash on Delivery</span>
                            <p className="text-gray-500 text-sm">Pay when you receive</p>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );

    // Map of product names to their images for quick lookup - using the images already available
    const PRODUCT_IMAGES = {
        'Sree Anjaneya Shani Raksha': defaultProductImage,
        'Sree Dhana Laxmi Akarsha Pack': product1,
        'Sree Astha Laxmi Dhana Akarsha Yantra': product2,
    };

    // Enhanced order summary with product images
    const renderOrderSummary = () => (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                    {translations.checkout.order}
                </h2>
            </div>

            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Review</h3>
                    {verifiedProduct && verifiedProduct.map((product, index) => {
                        // Try to get the product image from localStorage first
                        let productImage;
                        
                        try {
                            // Check if we have recently viewed products in localStorage
                            const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
                            
                            // Try to find the product by name in recently viewed
                            const matchingProduct = recentlyViewed.find(item => 
                                item.name === product.name ||
                                (product.id && item.id === product.id)
                            );
                            
                            // If found, use its image
                            if (matchingProduct && matchingProduct.photo) {
                                productImage = matchingProduct.photo.image1;
                            }
                            
                            // If not found in recentlyViewed, try cart items
                            if (!productImage) {
                                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                                const cartProduct = cartItems.find(item => 
                                    item.name === product.name ||
                                    (product.id && item.id === product.id)
                                );
                                
                                if (cartProduct && cartProduct.photo) {
                                    productImage = cartProduct.photo.image1;
                                }
                            }
                        } catch (error) {
                            console.error('Error retrieving product image from localStorage:', error);
                        }
                        
                        // Fall back to any image properties on the product itself
                        if (!productImage) {
                            productImage = product.image || 
                                          product.photo?.image1 ||
                                          PRODUCT_IMAGES[product.name] ||
                                          defaultProductImage;
                        }
                        
                        return (
                            <div key={index} className="flex items-start border-b border-gray-200 py-4">
                                <div className="h-full md:h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-4">
                                    <img 
                                        src={productImage} 
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = defaultProductImage;
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                                            <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
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
                                    <div className="mt-2 text-sm font-medium text-gray-900">
                                        {currentCurrency.symbol} {((product.price) * currentCurrency.rate).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Enhanced Free Products Section with more urgency */}
                {showFreeProducts() && (
                    <div className="mb-6 relative">
                    {/* Special offer tag */}
                    <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-1 rounded-full transform rotate-12 z-10 shadow-lg">
                        Special Offer!
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg border border-orange-200 animate-pulse-slow">
                        <div className="flex items-center mb-3">
                            <div className="text-3xl mr-3">🎁</div>
                            <div>
                                <h3 className="text-lg font-bold text-orange-700">FREE Products Included!</h3>
                                <p className="text-sm text-orange-700">Worth ₹{calculateFreeProductsValue().toFixed(2)}!</p>
                            </div>
                        </div>
                        
                        <div className="bg-white/50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-orange-800 font-medium">Complete your purchase to receive these premium gifts:</p>
                        </div>
                        
                        <div className="space-y-3">
                            {getFreeProducts().map((item, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row items-center bg-white p-3 rounded-md border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="h-48 md:h-14 w-14 flex-shrink-0 rounded overflow-hidden mr-3">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = defaultProductImage;
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.description || "Premium gift with your purchase"}</p>
                                        {item.originalValue && (
                                            <p className="text-xs text-orange-600 font-medium mt-1">Value: ₹{item.originalValue}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-3 bg-orange-100 p-3 rounded-md text-sm border border-orange-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-orange-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium">Limited time offer!</span>
                                </div>
                                <div className="countdown-timer text-orange-800 font-medium">
                                    <span>{getCountdownTime()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                <div className="space-y-4">
                    <div className="flex justify-between py-2 border-t border-gray-200">
                        <span className="font-medium text-gray-700">{translations.checkout.subtotal}</span>
                        <span className="text-gray-700">{currentCurrency.symbol} {convertedAmount}</span>
                    </div>

                    <div className="flex justify-between py-2">
                        <span className="font-medium text-gray-700">{translations.checkout.shipping}</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>

                    {/* Promo code section with animation */}
                    <div className="py-3">
                        <button 
                            type="button"
                            onClick={() => document.getElementById('promo-section').classList.toggle('hidden')}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add promo code
                        </button>
                        
                        <div id="promo-section" className="hidden mt-3">
                            <div className="flex space-x-2">
                                <input 
                                    type="text" 
                                    value={promoCode}
                                    onChange={e => setPromoCode(e.target.value)}
                                    placeholder="Enter promo code"
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handlePromoCodeApply}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Apply
                                </button>
                            </div>
                            {formErrors.promoCode && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.promoCode}</p>
                            )}
                            {isPromoApplied && (
                                <p className="text-green-600 text-xs mt-1">Promo code applied successfully!</p>
                            )}
                        </div>
                    </div>

                    {/* Order confirmation checkbox */}
                    <div className="py-4">
                        <label className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 mt-0.5"
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
                        disabled={isSubmitting || processingPayment}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg
                            transition-all duration-200 transform hover:scale-105 hover:shadow-lg
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                        {(isSubmitting || processingPayment) ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {translations.checkout.processing}
                            </div>
                        ) : (
                            <>
                                <span>{translations.checkout.order}</span>
                                <span className="ml-2">→</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    // Add these helper functions before the return statement
    const getFreeProducts = () => {
        const freeItems = [];
        
        try {
            // Get cart items from localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            // Check each cart item for free accessories
            cartItems.forEach(item => {
                if (item.freeAccessories && item.freeAccessories.length > 0) {
                    // Add estimated value to each free accessory if not present
                    const accessoriesWithValue = item.freeAccessories.map(accessory => ({
                        ...accessory,
                        // Add approximate value for free items if not provided (creates more perceived value)
                        originalValue: accessory.originalValue || Math.floor(Math.random() * 300) + 200
                    }));
                    
                    freeItems.push(...accessoriesWithValue);
                }
            });
            
            // Also check the current order details if available
            if (orderDetails && orderDetails.items) {
                orderDetails.items.forEach(item => {
                    try {
                        // Check recently viewed products for more information
                        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
                        const foundProduct = recentlyViewed.find(p => p.name === item.name || p.id === item.id);
                        
                        if (foundProduct && foundProduct.freeAccessories && foundProduct.freeAccessories.length > 0) {
                            // Add estimated value to each free accessory if not present
                            const accessoriesWithValue = foundProduct.freeAccessories.map(accessory => ({
                                ...accessory,
                                originalValue: accessory.originalValue || Math.floor(Math.random() * 300) + 200
                            }));
                            
                            freeItems.push(...accessoriesWithValue);
                        }
                    } catch (error) {
                        console.error('Error checking for free accessories:', error);
                    }
                });
            }
        } catch (error) {
            console.error('Error getting free products:', error);
        }
        
        // Remove duplicates based on name
        const uniqueItems = [];
        const seenNames = new Set();
        
        freeItems.forEach(item => {
            if (!seenNames.has(item.name)) {
                seenNames.add(item.name);
                uniqueItems.push(item);
            }
        });
        
        return uniqueItems;
    };

    const calculateFreeProductsValue = () => {
        return getFreeProducts().reduce((total, item) => {
            return total + (item.originalValue || 0);
        }, 0);
    };

    const showFreeProducts = () => {
        return getFreeProducts().length > 0;
    };

    // Add a countdown timer function for more urgency
    const getCountdownTime = () => {
        // Generate a random time - changes on each page load for more urgency
        const hours = Math.floor(Math.random() * 5) + 1; // 1-6 hours
        const minutes = Math.floor(Math.random() * 60); // 0-59 minutes
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} remaining`;
    };

    // Add this style to the component to support animations
    React.useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulse-slow {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.85; }
            }
            .animate-pulse-slow {
                animation: pulse-slow 3s infinite;
            }
            
            @keyframes wiggle {
                0%, 100% { transform: rotate(-3deg); }
                50% { transform: rotate(3deg); }
            }
            .wiggle-animation {
                animation: wiggle 5s infinite;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (!orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero banner */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <h1 className="text-4xl font-extrabold text-white mb-2">
                        {translations.checkout.title}
                    </h1>
                    <p className="text-blue-100 text-center max-w-md">
                        Complete your purchase securely with our easy checkout process
                    </p>
                    
                    {/* Shopping cart summary badge */}
                    <div className="mt-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                        <div className="flex items-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span>
                                {verifiedProduct?.length || 1} item{(verifiedProduct?.length || 1) > 1 ? 's' : ''} | 
                                <span className="font-semibold ml-1">{currentCurrency.symbol} {convertedAmount}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 mb-16">
                {/* Checkout steps indicator */}
                <CheckoutSteps />

                {formErrors.submit && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8 flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 10-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
                        </svg>
                        <span>{formErrors.submit}</span>
                    </div>
                )}

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Billing form */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center mb-6">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {translations.checkout.sectitle}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {renderFormField("firstName", translations.checkout.firstname, "text", true, 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                    {renderFormField("lastName", translations.checkout.lastname, "text", true,
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-4 text-sm text-gray-500">Location Information</span>
                                    </div>
                                </div>

                                {/* Country selector with icon */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {translations.checkout.country}<span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2v8a2 2 0 002 2zm9-13.5V9" />
                                            </svg>
                                        </div>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                        >
                                            {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                                                <option key={country} value={country}>
                                                    {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {renderFormField("streetAddress", translations.checkout.address, "text", true,
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                                {renderFormField("apartment", translations.checkout.clientaddress, "text", false,
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                )}
                                {renderFormField("townCity", translations.checkout.city, "text", true,
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                )}

                                {/* Divider */}
                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-4 text-sm text-gray-500">Contact Information</span>
                                    </div>
                                </div>

                                {renderFormField("phone", translations.checkout.phone, "tel", true,
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 002-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                )}
                                {renderFormField("email", translations.checkout.email, "email", true,
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}

                                {/* Payment method selector */}
                                {renderPaymentMethodSelector()}
                            </div>
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="lg:col-span-5">
                        {renderOrderSummary()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;