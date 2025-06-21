import React from 'react';

const Cancellation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:mt-28 lg:px-8">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cancellation Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: June 2024</p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Cancellation Period</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Orders can be canceled within 24 hours of placing the order.</li>
          <li>After 24 hours, we begin processing and shipping your order, and cancellations will not be possible.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How to Cancel Your Order</h2>
        <p className="text-gray-700 mb-4">To cancel your order, please follow these steps:</p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li><strong>Contact Us Immediately:</strong> Reach out to our customer support team at <span className="text-blue-600">+91990-852-6444</span> within 24 hours of your order.</li>
          <li><strong>Provide Order Details:</strong> Include your order number and reason for cancellation in your message to help us process your request faster.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Cancellations Post-Shipping</h2>
        <p className="text-gray-700 mb-6">
          If your order has already been shipped, we will not be able to cancel it. In this case, you may return the product after receiving it.
          To initiate a return, please refer to our Return Policy for further instructions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Refund Process</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li><strong>Full Refunds:</strong> If your cancellation request is processed before the product is shipped, you will receive a full refund.</li>
          <li><strong>Partial Refunds:</strong> If you cancel the order after the product has been shipped, the cost of the product will be refunded with less shipping charges, once we receive the returned item in its original condition.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Non-Cancellable Conditions</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li><strong>Opened/Used Products:</strong> Once the product has been opened or used, cancellations will not be accepted. Please check the product carefully upon delivery.</li>
          <li><strong>Special Promotions or Offers:</strong> Orders placed under special promotions or discounts may be subject to different cancellation terms, which will be specified during the purchase process.</li>
        </ul>

        <p className="text-gray-700 mb-6">
          We aim to provide a seamless experience, and our customer service team is here to assist you with any issues you may encounter.
        </p>

        <p className="text-gray-700 mb-6">
          Thank you for choosing us. We appreciate your understanding and support!
        </p>

        <p className="text-gray-700 mb-6">
          For any questions about our cancellation policy, please contact us at <a href="mailto:israelitesshopping171@gmail.com" className="text-blue-600 hover:text-blue-800">israelitesshopping171@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default Cancellation;