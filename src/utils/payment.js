const productSliderStyles = `
  .main-product-swiper {
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .main-product-swiper .swiper-slide {
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .main-product-swiper .swiper-button-next,
  .main-product-swiper .swiper-button-prev {
    color: #4169E1;
    background: rgba(255, 255, 255, 0.8);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .main-product-swiper .swiper-button-next:hover,
  .main-product-swiper .swiper-button-prev:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: scale(1.1);
  }
  
  .main-product-swiper .swiper-button-next:after,
  .main-product-swiper .swiper-button-prev:after {
    font-size: 18px;
  }
  
  .main-product-swiper .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: rgba(65, 105, 225, 0.5);
    transition: all 0.3s ease;
  }
  
  .main-product-swiper .swiper-pagination-bullet-active {
    background: #4169E1;
    width: 20px;
    border-radius: 5px;
  }
  
  /* Mobile Call Button Styles */
  .mobile-call-button {
    display: none;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #4169E1, #7e4fe9);
    border-radius: 50%;
    box-shadow: 0 6px 16px rgba(65, 105, 225, 0.4);
    z-index: 999;
    transition: all 0.3s ease;
    animation: pulse-ring 2s ease-out infinite;
  }
  
  .mobile-call-button svg {
    color: white;
    width: 28px;
    height: 28px;
  }
  
  .mobile-call-button:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(65, 105, 225, 0.6);
  }
  
  @keyframes pulse-ring {
    0% {
      box-shadow: 0 0 0 0 rgba(65, 105, 225, 0.7);
    }
    70% {
      box-shadow: 0 0 0 15px rgba(65, 105, 225, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(65, 105, 225, 0);
    }
  }
    @media (max-width: 768px) {
    .mobile-call-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .pulse-animation {
    animation: pulse-button 1.5s ease-out infinite;
    font-weight: bold;
  }
  
  @keyframes pulse-button {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    70% {
      box-shadow: 0 0 0 12px rgba(16, 185, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }
`;

const CUSTOMER_REVIEWS = [
    {
      id: 1,
      name: "Jayant Verma",
      date: "August 15, 2024",
      rating: 5,
      content: "I couldn't be happier with my purchase! The Sree Anjaneya Shani Raksha bracelet is beautifully crafted and I can already feel its positive energy. The shipping was fast and the packaging was very secure.",
      verified: true,
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      date: "June 29, 2024",
      rating: 5,
      content: "This is exactly what I was looking for! The quality is exceptional and it looks even better in person than in the photos. I've received many compliments already. Highly recommended!",
      verified: true,
      location: "Delhi"
    },
    {
      id: 3,
      name: "Rahul Sharma",
      date: "June 12, 2024",
      rating: 4,
      content: "The product arrived on time and was packaged very well. The craftsmanship is excellent and the energy is wonderful. I'm giving 4 stars only because I wish it came with more information about its spiritual properties.",
      verified: true,
      location: "Bangalore"
    },
    {
      id: 4,
      name: "Priya Patel",
      date: "June 28, 2024",
      rating: 5,
      content: "I bought this as a gift for my father and he absolutely loves it! The quality is superior and the design is very elegant. Customer service was excellent when I had questions about the shipping.",
      verified: true,
      location: "Chennai"
    },
    {
      id: 5,
      name: "Manish Desai",
      date: "May 17, 2024",
      rating: 5,
      content: "Simply amazing! I've been wearing this for two weeks now and have noticed positive changes in my life. Very satisfied with my purchase and will definitely buy more products from this store.",
      verified: true,
      location: "Hyderabad"
    }
];

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1 },
    'United States': { currency: 'USD', symbol: '$', rate: 0.012 },
    'United Kingdom': { currency: 'GBP', symbol: '£', rate: 0.0097 },
    'European Union': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Canada': { currency: 'CAD', symbol: 'CA$', rate: 0.016 },
    'Australia': { currency: 'AUD', symbol: 'A$', rate: 0.018 },
    'Japan': { currency: 'JPY', symbol: '¥', rate: 1.67 },
    'China': { currency: 'CNY', symbol: '¥', rate: 0.088 },
    'Singapore': { currency: 'SGD', symbol: 'S$', rate: 0.016 },
    'United Arab Emirates': { currency: 'AED', symbol: 'د.إ', rate: 0.044 },
    'Switzerland': { currency: 'CHF', symbol: 'CHF', rate: 0.011 },
    'Russia': { currency: 'RUB', symbol: '₽', rate: 0.96 },
    'South Korea': { currency: 'KRW', symbol: '₩', rate: 15.68 },
    'Brazil': { currency: 'BRL', symbol: 'R$', rate: 0.059 },
    'South Africa': { currency: 'ZAR', symbol: 'R', rate: 0.22 }
};

const PaymentModeSelector = ({ selectedMode, onChange, translations }) => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-700">
      {translations?.checkout?.mode || 'Payment Mode'}<span className="text-red-500">*</span>
    </label>
    <div className="space-y-3">
      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200">
        <input
          type="radio"
          name="paymentMode"
          value="online"
          checked={selectedMode === 'online'}
          onChange={(e) => onChange({ target: { name: 'paymentMode', value: e.target.value } })}
          className="h-5 w-5 text-blue-600"
        />          <div className="ml-4">
          <span className="font-medium text-gray-900">Pay Securely Online</span>
          <p className="text-sm text-green-600">Get 15% instant discount</p>
        </div>
      </label>

      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200">
        <input
          type="radio"
          name="paymentMode"
          value="cod"
          checked={selectedMode === 'cod'}
          onChange={(e) => onChange({ target: { name: 'paymentMode', value: e.target.value } })}
          className="h-5 w-5 text-blue-600"
        />
        <div className="ml-4">
          <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
          <p className="text-sm text-gray-500">Pay when you receive</p>
        </div>
      </label>
    </div>
  </div>
);

const MobileCallButton = () => {
    // Phone number to call
    const phoneNumber = "+919908030444"; // Customer support number
    
    return (
      <a
        href={`tel:${phoneNumber}`}
        className="mobile-call-button"
        aria-label="Call customer support"
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </a>
    );
  };




  const validateForm = (formData, translations) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!formData.firstName.trim()) errors.firstName = translations?.checkout?.formFields?.firstName?.error || 'First name is required';
  if (!formData.lastName.trim()) errors.lastName = translations?.checkout?.formFields?.lastName?.error || 'Last name is required';
  if (!formData.country.trim()) errors.country = translations?.checkout?.formFields?.country?.error || 'Country is required';
  if (!formData.streetAddress.trim()) errors.streetAddress = translations?.checkout?.formFields?.address?.error || 'Street address is required';
  if (!formData.townCity.trim()) errors.townCity = translations?.checkout?.formFields?.city?.error || 'Town/City is required';
  if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
    errors.phone = translations?.checkout?.formFields?.phone?.error || 'Please enter a valid 10-digit phone number';
  }
  if (!formData.email.trim() || !emailRegex.test(formData.email)) {
    errors.email = translations?.checkout?.formFields?.email?.error || 'Please enter a valid email';
  }
  if (!formData.paymentMode) errors.paymentMode = 'Please select a payment mode';

  return errors;
};

const handleSubmit = async (props) => {
  // This function is now implemented directly in Landing.js
  // This wrapper is kept for backwards compatibility
  if (props.e) {
    props.e.preventDefault();
  }
  
  console.warn('payment.js handleSubmit is deprecated, use the integrated version in Landing.js');
  
  // Call the actual handler that's now in Landing.js (if available)
  if (typeof window.landingHandleSubmit === 'function') {
    return window.landingHandleSubmit(props);
  }
  
  // Fallback implementation
  const errors = validateForm(props.formData, props.translations);
  
  if (Object.keys(errors).length > 0) {
    props.setFormErrors(errors);
    props.setIsSubmitting(false);
    props.setIsProcessingOrder(false);
    return;
  }
  
  // Show error that functionality is now in Landing.js
  props.setFormErrors(prev => ({
    ...prev,
    submit: 'Please use the updated version of this function in Landing.js'
  }));
  props.setIsSubmitting(false);
  props.setIsProcessingOrder(false);
};

const handleRazorpayPayment = async (props) => {
  // This function is now implemented directly in Landing.js
  // This wrapper is kept for backwards compatibility
  console.warn('payment.js handleRazorpayPayment is deprecated, use the integrated version in Landing.js');
  
  // Call the actual handler that's now in Landing.js (if available)
  if (typeof window.landingHandleRazorpayPayment === 'function') {
    return window.landingHandleRazorpayPayment(props);
  }
  
  // Show error that functionality is now in Landing.js
  props.setFormErrors(prev => ({
    ...prev,
    submit: 'Please use the updated version of this function in Landing.js'
  }));
  props.setIsSubmitting(false);
  props.setIsProcessingOrder(false);
};

export { 
  productSliderStyles, 
  CUSTOMER_REVIEWS, 
  COUNTRY_CURRENCY_MAP, 
  PaymentModeSelector, 
  MobileCallButton,
  validateForm,
  handleSubmit,
  handleRazorpayPayment
};