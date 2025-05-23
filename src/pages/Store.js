import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import translations from '../utils/data';
import PageHeader from '../components/Other';

const Store = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { products } = translations;

    const filteredProducts = selectedCategory === 'all'
        ? products.product
        : products.product.filter(product => product.category === selectedCategory);

    return (
        <div>
            <PageHeader title={"Store"} subtitle={"Home > Store"} />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className='text-3xl  text-[#D88E7D] stylefont'>Collection</h1>
                    <h1 className="text-6xl  mb-4 headerstyle">Our Products</h1>
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            className={`px-4 py-2 rounded ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setSelectedCategory('all')}
                        >
                            All
                        </button>
                        {products.categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="group">
                            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.photo.image1}
                                        alt={product.name}
                                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {product.isNew && (
                                        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold">₹{product.cost}</span>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`text-xl ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Store;