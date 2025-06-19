import React from 'react';

const Horizontal = ({ data }) => {
    return (
        <section className="">
            <div className="flex overflow-x-auto md:overflow-x-hidden lg:overflow-x-hidden space-x-4">
                {data.map((item, index) => (
                    <div key={index} className="relative flex-shrink-0 w-1/4">
                        <div className="h-full hover:bg-gradient-to-r from-zinc-900 to-transparent absolute z-10 w-full"></div>
                        <img className="relative z-0 w-full h-64" src={item.image} alt={item.title} />
                        <h1 className="absolute bottom-0 text-white text-4xl z-10 mb-5 ml-5 headerstyle">{item.title}</h1>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Horizontal;