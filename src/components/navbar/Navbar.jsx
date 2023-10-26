import React, { useEffect, useState } from 'react'
import Logo from "../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import audio from "../../assets/HAPPY BIRTHDAY TO YOU The Happy Birthday Song.mp3"

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const [toggleNavDropDown, setToggleNavDropDown] = useState(false)
    const navigate = useNavigate()
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

    // useEffect(() => {
    //     console.log(cartItems)
    //     // setTimeout(() => {playAudio()},1000)
    //     document.addEventListener("DOMContentLoaded", () => {
    //         playAudio()
    //     })
    //     // playAudio()
    // },[])

    function signOutUser(){
        localStorage.clear()
        navigate("/sign-in-sign-up")
    }

    // function playAudio() {
    //     new Audio(audio).play();
    //   }

  return (
    <div>
        <nav className="index-nav z-10">
            <Link to="/" className='cursor-pointer'>
                <img src={Logo} alt="" />
            </Link>
            {/* <button onClick={() => playAudio()} className='text-white'>click</button> */}
            {/* {user && <p className='text-white'>Welcome, <span className='font-bold'>{user}</span> </p> } */}
            <div className='border-solid border border-gray-500 items-center justify-between py-0 pl-3 hidden w-[30%] rounded-full'>
                <input type="text" className='bg-transparent py-1' placeholder='Search for a product'/>
                <i className="ri-search-line bg-white px-4 py-1 text-black rounded-r-full"></i>
            </div>
            <ul className="nav-links">
                {cartItems.length &&
                    <div onClick={() => navigate(`/cart-item-details`)} className='rounded-full relative cursor-pointer'>
                        <i class="ri-shopping-cart-2-line text-2xl text-white"></i>
                        <p className='absolute top-[-10px] right-[-13px] text-black rounded-full bg-white' style={{ padding:"2px 4px" }}>{cartItems.length}</p>
                    </div>
                }
                {user ? 
                    <>
                        {toggleNavDropDown &&
                            <div className="user-nav-dropdown">
                                <div className="cursor-pointer flex" onClick={() => navigate("/dashboard")}>
                                    <p className='mr-1'>Dashboard</p>
                                    <i class="ri-dashboard-3-line"></i>
                                </div>
                                <div className="cursor-pointer flex" onClick={signOutUser}>
                                    <p className='mr-1'>Logout</p>
                                    <i className="ri-logout-circle-line"></i>
                                </div>
                            </div>
                        }
                        <div className="user-icon cursor-pointer" onClick={() => setToggleNavDropDown(!toggleNavDropDown)}>
                            <i className="ri-user-3-line"></i>
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                    </>
                : 
                    <li className="index-sign-in cursor-pointer">
                        <Link to="/sign-in-sign-up">Sign In</Link>
                    </li>
                }
            </ul>
        </nav>
    </div>
  )
}

export default Navbar