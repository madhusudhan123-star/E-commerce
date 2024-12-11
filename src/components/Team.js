import React, { useState } from 'react'
import translations from '../utils/data'
import bg from '../assets/home/bg-test.png';

const Team = () => {
    const [hoveredId, setHoveredId] = useState(null);
    return (
        <div> <section className="py-16 px-4 bg-white">
            {/* Header */}
            <div className="text-center mb-12">
                <h3 className="text-3xl italic text-[#D88E7D] stylefont">Reviews</h3>
                <h2 className="text-6xl headerstyle">Happy Clients Thoughts</h2>
                <p className="text-gray-600 mt-2">
                    Neque convallis a cras semper auctor neque vitae. Et egestas quis ipsum suspendisse. Ornare quam viverra orci sagittis eu volutpat odio.
                </p>
            </div>

            {/* Reviews Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-0 lg:p-20 md:p-20 dm:p-0">
                {translations.home.reviews.map((review, index) => (
                    <div
                        key={index}
                        className="text-center p-6 rounded-lg relative flex gap-10 items-start lg:items-center md:items-center"
                        onMouseEnter={() => setHoveredId(index)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div>
                            <div className=''>
                                {hoveredId === index && (
                                    <img src={bg} className="absolute inset-0 w-56  object-cover" />
                                )}
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-44 rounded-full mb-4 relative z-10"
                                />
                            </div>
                            {/* Rating */}
                            <div className="flex  mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-yellow-400 ${i < review.rating ? "text-yellow-500" : "text-gray-300"
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {/* Text */}
                            <p className="text-gray-600 mb-2 text-start lg:text-ceter md:text-center">{review.review}</p>
                            <h4 className="font-bold text-lg text-start lg:text-ceter md:text-center">{review.name}</h4>
                            <p className="text-sm text-gray-400 text-start lg:text-ceter md:text-center">{review.date}</p>
                        </div>
                        <div
                            className={`h-full w-[1px] ${index === 3 ? "hidden" : "bg-black lg:bg-black hidden lg:block md:block sm:hidden"
                                }`}
                        />
                    </div>
                ))}
            </div>
        </section></div>
    )
}

export default Team