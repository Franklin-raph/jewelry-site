import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import LandingImage from "../../assets/images/bg-image.webp"

const AboutUs = () => {
  return (
    <div>
        <Navbar />
        <section className='flex items-center justify-between about'>
            <div className='ml-[3rem] py-[8rem]'>
              <p className='font-bold'>Our Story</p>
                <h1 className='font-bold text-4xl mb-3'>The Creative Director Kraftea designz</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos obcaecati voluptate dicta alias maxime beatae iusto vero incidunt hic cum laudantium, doloribus, praesentium, esse quae doloremque et dolorum exercitationem officia.
                </p>
            </div>
            <img src={LandingImage} alt="" />
        </section>
    </div>
  )
}

export default AboutUs