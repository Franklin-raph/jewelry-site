import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import krafteaImg from "../../assets/images/WhatsApp Image 2023-11-08 at 12.02.03 PM.jpeg"

const AboutUs = () => {
  return (
    <div>
        <Navbar />
        <section className='py-[8rem]'>
          <div className='text-center mb-[3rem]'>
            <h2 className='font-bold text-2xl lg:text-4xl'>Our Story</h2>
            <p>Kraftea designz</p>
          </div>
          <div className='flex items-center justify-between w-full about'>
            <div className=''>
                <h1 className='font-bold text-3xl mb-3'>The Creative Director Kraftea designz</h1>
                <p>
                  Atinuke Fowokan-Nwaneri, from the south western part of Nigeria, in 2017 created the brand which was formerly called 
                  Krafteaclothing a brand which has broadened its range from uniquely crafted clothing items to an online emporium of 
                  specially designed, meticulously sourced and luxuriously created fashion pieces for the 21st century fashionista. 
                  The range includes, earrings, keyrings, neck-pieces, and clothings.
                </p>
                <p>
                  Imagine owning a fashion item that is owned by you and just you, no patent fees required? 
                  At Kraftea Designz you can be rest assured that you get one of a kind skill krafted items
                </p>
                <p>
                  Fashion can be weird, loud, colourful, soft, crazy, persistent, resistive, assertive or expressive. 
                  What is your fashion flavour? If you’ve got one then Kraftea Designz has got a myriad of items to 
                  help you express yourself. Don’t just make a fashion statement, make a statement that speaks about the real you.
                </p>
            </div>
            <img src={krafteaImg} alt="" />
          </div>
        </section>
    </div>
  )
}

export default AboutUs