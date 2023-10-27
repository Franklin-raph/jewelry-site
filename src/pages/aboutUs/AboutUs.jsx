import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import LandingImage from "../../assets/images/bg-image.webp"

const AboutUs = () => {
  return (
    <div>
        <Navbar />
        <section className='py-[8rem]'>
          <div className='text-center mb-[3rem]'>
            <h2 className='font-bold text-2xl lg:text-4xl'>Our Story</h2>
            <p>Lorem Ipsum</p>
          </div>
          <div className='flex items-center justify-between w-full about'>
            <div className=''>
                <h1 className='font-bold text-3xl mb-3'>The Creative Director Kraftea designz</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos obcaecati voluptate dicta alias maxime beatae iusto vero incidunt hic cum laudantium, doloribus, praesentium, esse quae doloremque et dolorum exercitationem officia.
                </p>
            </div>
            <img src={LandingImage} alt="" />
          </div>
        </section>
    </div>
  )
}

export default AboutUs