// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCart(prevCart => {
            // Add unique identifier for each cart item
            const cartItem = {
                ...product,
                cartItemId: Date.now() + Math.random(), // Unique ID for each cart item
                addedAt: new Date().toISOString()
            };
            const updatedCart = [...prevCart, cartItem];
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (cartItemId) => {
        setCart(prevCart => {
            // Remove by cartItemId instead of product id
            const updatedCart = prevCart.filter(item => item.cartItemId !== cartItemId);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};