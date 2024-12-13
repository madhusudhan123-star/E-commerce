import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ id, name, cost, photo, isNew }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Link to={`/product/${id}`}>
                <div data-aos="fade-up" className="relative overflow-hidden">
                    {!imageLoaded && (
                        <Skeleton height={256} />
                    )}
                    <LazyLoadImage
                        src={photo.image1}
                        alt={name}
                        effect="blur"
                        afterLoad={() => setImageLoaded(true)}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    {isNew && (
                        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">
                            New
                        </span>
                    )}
                </div>
                <div className="p-4">
                    {!imageLoaded ? (
                        <>
                            <Skeleton height={24} width="80%" />
                            <Skeleton height={20} width="40%" />
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl font-semibold headerstyle">{name}</h3>
                            <p className="text-blue-600">₹{cost.toLocaleString()}</p>
                        </>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;