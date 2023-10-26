import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/navbar/Navbar'
import SignInSignUp from './pages/authentication/sign-in-sign-up/SignInSignUp'
import Dashboard from './pages/dashboard/Dashboard'
import AllProducts from './pages/allProducts/AllProducts'
import Footer from './components/footer/Footer'
import CartItemDetails from './pages/cartItemDetails/CartItemDetails'
import OrderAndShippingInfo from './pages/orderAndShippingInfo/OrderAndShippingInfo'
import OrderInfo from './pages/orderInfo/OrderInfo'
import AboutUs from './pages/aboutUs/AboutUs'
import ContactUs from './pages/contactUs/ContactUs'
import audio from "./assets/HAPPY BIRTHDAY TO YOU The Happy Birthday Song.mp3"
import birthdayGif from "./assets/images/giphy.gif"

function App() {

  const baseUrl = 'https://krafteabe.pythonanywhere.com/api/v1'
  const [birthdayModal, setBirthdayModal] = useState(true)

  function handleBirthdayModalClose(){
    new Audio(audio).play();
    setBirthdayModal(false)
  }

  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify("guest-user"))
  },[])

  return (
    <>
      <BrowserRouter>
      {birthdayModal && 
        <div className='birthdayModalBg'>
          <i className='ri-close-line text-white text-2xl fixed top-10 right-[30%]' onClick={() => handleBirthdayModalClose()}></i>
          <img src={birthdayGif} alt="" className='birthdayGif'/>
        </div>
      }
        <Routes>
          <Route path="/" element={<Home baseUrl={baseUrl} />}/>
          <Route path="/about-us" element={<AboutUs baseUrl={baseUrl} />}/>
          <Route path="/contact-us" element={<ContactUs baseUrl={baseUrl} />}/>
          <Route path="/myorder/:order_id" element={<OrderAndShippingInfo baseUrl={baseUrl} />}/>
          <Route path="/order-details/:order_id" element={<OrderInfo baseUrl={baseUrl} />}/>
          <Route path="/sign-in-sign-up" element={<SignInSignUp baseUrl={baseUrl}/>}/>
          <Route path="/dashboard" element={<Dashboard baseUrl={baseUrl}/>}/>
          <Route path="/allProducts" element={<AllProducts baseUrl={baseUrl}/>}/>
          <Route path="/cart-item-details" element={<CartItemDetails baseUrl={baseUrl}/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
