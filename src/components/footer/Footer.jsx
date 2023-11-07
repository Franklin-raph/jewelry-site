import React from 'react'
import Logo from "../../assets/images/logo png.png"
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='fixed w-full bottom-0 z-10 flex items-center justify-between'>
      <div className='flex items-start flex-col'>
        <Link to="/" className='cursor-pointer mb-3'>
            <img src={Logo} alt="" className='w-[40px]'/>
        </Link>
        <ul className='flex gap-3'>
          <li>
            <Link to="#">
              <i class="ri-facebook-circle-fill"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i class="ri-twitter-x-fill"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i class="ri-instagram-line"></i>
            </Link>
          </li>
        </ul>
      </div>
      <ul className="flex items-center gap-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about-us">About us</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact us</Link>
        </li>
      </ul>
      <p>All Rights Reserved &copy; {new Date().getFullYear()} </p>
    </footer>
  )
}

export default Footer