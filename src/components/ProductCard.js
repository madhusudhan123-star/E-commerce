// // ProductCard.js
// import React from 'react';

// const ProductCard = ({ name, price, oldPrice, rating, isNew, image }) => {
//     return (
//         <div className="relative p-4">
//             {/* Placeholder for image */}
//             <div className="h-72">
//                 <img
//                     src={image}
//                     alt={name}
//                     className="object-cover w-full h-full rounded-md"
//                 />
//             </div>

//             {isNew && (
//                 <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
//                     New
//                 </span>
//             )}

//             <div className="mt-4 text-center">
//                 <h3 className="text-lg font-medium">{name}</h3>
//                 {oldPrice ? (
//                     <div className="text-gray-600 text-sm line-through">{`$${oldPrice}`}</div>
//                 ) : null}
//                 <div className="text-lg font-semibold text-gray-900">{`$${price}`}</div>
//                 <div className="mt-2 text-yellow-500">
//                     {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;
// ProductCard.js
import React from 'react';

const ProductCard = ({ name, price, oldPrice, rating, isNew, image, card }) => {
    return (
        <div className="relative p-4 group">
            {/* Image container with overlay */}
            <div className="relative h-96">
                <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-full rounded-md"
                />
                {/* Overlay with button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-md">
                    <button className="bg-[#D88E7D] hover:bg-[#514B60] text-white px-6 py-3 rounded-3xl transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                        {card ? 'Add to cart' : 'View details'}
                    </button>
                </div>
            </div>

            {isNew && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    New
                </span>
            )}

            <div className="mt-4 text-center">
                <h3 className="text-2xl font-medium transition-colors duration-300 group-hover:text-[#D88E7D]">
                    {name}
                </h3>
                {oldPrice ? (
                    <div className="text-gray-600 text-sm line-through">{`$${oldPrice}`}</div>
                ) : null}
                <div className="text-lg font-semibold text-gray-900">{`$${price}`}</div>
                <div className="mt-2 text-yellow-500">
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;