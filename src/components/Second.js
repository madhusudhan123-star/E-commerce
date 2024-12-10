import React from 'react';

const SecondComponent = ({ translations, page = 'home' }) => {
    // Get data based on current page
    const getData = () => {
        switch (page) {
            case 'about':
                return translations.about.second;
            case 'home':
            default:
                return translations.home.second;
        }
    };

    const data = getData();

    return (
        <div className='flex relative text-center lg:text-start md:text-start sm:text-center flex-col w-full lg:flex-row md:flex-row sm:flex-row'>
            {data.design && (
                <img
                    src={data.design}
                    className='absolute rotate-180 top-[-150px] z-[1] hidden lg:block md:block sm:hidden'
                    alt='Design'
                />
            )}
            <div className='w-full p-0 lg:p-20 md:p-20 sm:p-0 px-0 lg:px-28 md:px-28 sm:px-0 lg:w-1/2 md:w-1/2 sm:w-full z-10'>
                <h1 className='text-lg mb-5'>{data.short}</h1>
                <h1 className='text-5xl mb-8 font-medium'>{data.title}</h1>
                <p className='mb-4'>{data.subtitle}</p>
                {data.button && (
                    <button className='bg-[#D88E7D] hover:bg-[#514B60] text-white px-6 py-3 rounded-3xl'>
                        {data.button}
                    </button>
                )}
            </div>
            <div className='w-full p-8 lg:w-1/2 md:w-1/2 sm:w-full'>
                <img src={data.image} alt={data.title} />
            </div>
        </div>
    );
};

export default SecondComponent;