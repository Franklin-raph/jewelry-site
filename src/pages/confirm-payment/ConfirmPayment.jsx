import React from 'react'
import Navbar from '../../components/navbar/Navbar'

const ConfirmPayment = () => {
  return (
    <div>
        <Navbar />
        <div className='pt-[5rem] px-12 pb-[5rem] mb-[5rem]'>
            <h1 className='mb-4 font-bold'>My Order Summary</h1>
        </div>
    </div>
  )
}

export default ConfirmPayment