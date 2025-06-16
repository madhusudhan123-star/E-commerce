import React from 'react';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className='relative z-0'>
            <div className='bg-[#ffffff73] absolute w-screen h-[50vh] top-0'></div>
            <div className={`about-page-bg w-screen h-[50vh] flex flex-col gap-5 justify-center items-center`}>
                <h1 className='text-6xl z-10  headerstyle'>{title}</h1>
                {/* <h2 className='text-3xl z-10 font-medium'>{subtitle}</h2> */}
            </div>
        </div>
    );
};

export default PageHeader;