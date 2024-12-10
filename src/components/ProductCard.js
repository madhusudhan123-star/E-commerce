import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, cost, photo, isNew }) => {
    return (
        <div className="group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Link to={`/product/${id}`}>
                <div className="relative overflow-hidden">
                    <img
                        src={photo.image1}
                        alt={name}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    {isNew && (
                        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">
                            New
                        </span>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-blue-600">${cost}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;