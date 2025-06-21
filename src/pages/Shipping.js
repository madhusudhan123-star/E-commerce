import React from 'react';

const Shipping = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:mt-28 lg:px-8">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipping Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: June 2024</p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Shipping Coverage</h2>
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Domestic Shipping</h3>
        <p className="text-gray-700 mb-4">
          We deliver to all major cities and towns across India. Pin code verification is available at checkout. Remote locations may require additional delivery time. Certain restricted areas may not be serviceable.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">International Shipping</h3>
        <p className="text-gray-700 mb-4">
          We are happy to offer international shipping to customers worldwide. Our goal is to deliver your order as quickly and efficiently as possible, no matter where you are.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Shipping Methods</h2>
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Standard Delivery</h3>
        <p className="text-gray-700 mb-4">
          Delivery within 5–7 business days. Available across all serviceable locations.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Shipping Partners</h2>
        <p className="text-gray-700 mb-4">We work with reputed courier partners, including:</p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Aramex</li>
          <li>DHL</li>
          <li>Blue Dart</li>
          <li>DTDC</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Order Processing</h2>
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Processing Time</h3>
        <p className="text-gray-700 mb-4">
          Orders are processed within 24 hours of placement. Order confirmation is sent via email. Bulk orders may require additional processing time.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Order Tracking</h3>
        <p className="text-gray-700 mb-4">
          A tracking number is provided via email. Customer service assistance is available for tracking queries.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Customer Support</h2>
        <div className="text-gray-700 mb-6">
          <p className="mb-2"><strong>Email:</strong> <a href="mailto:israelitesshopping171@gmail.com" className="text-blue-600 hover:text-blue-800">israelitesshopping171@gmail.com</a></p>
          <p className="mb-2"><strong>Phone:</strong> 990-852-6444</p>
          <p className="mb-2"><strong>Response time:</strong> Within 4 business hours during operational hours.</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Policy Updates</h2>
        <p className="text-gray-700 mb-6">
          This policy is subject to change. Updates will be posted on our website. Customers will be notified via email for significant changes at least 7 days in advance. Continued use of our services implies acceptance of the updated policy.
        </p>

        <p className="text-gray-700 mb-6">
          For more information, contact us at <a href="mailto:israelitesshopping171@gmail.com" className="text-blue-600 hover:text-blue-800">israelitesshopping171@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default Shipping;