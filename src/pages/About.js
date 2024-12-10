import React from 'react'
import translations from '../utils/data'
import SecondComponent from '../components/Second'
import Horizontal from '../components/Horziental'
import Team from '../components/Team'
import Other from '../components/Other'
const About = () => {
    return (
        <div>
            <div>
                <Other title={translations.about.title} subtitle={translations.about.subtitle} />
            </div>
            <div className='relative'>
                <SecondComponent translations={translations} page="about" />
            </div>
            <div>
                <div className='w-full flex items-center flex-col my-20 '>
                    <h3 className='text-2xl'>{translations.about.short2}</h3>
                    <h1 className='text-5xl font-bold'>{translations.about.title2}</h1>
                    <p className='w-full lg:w-1/2 md:w-1/2 text-center mb-20'>{translations.about.sub2}</p>
                    <Horizontal data={translations.about.horizontal} />
                </div>
            </div>
            <div>
                <Team />
            </div>
        </div>
    )
}

export default About