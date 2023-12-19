import React, { useEffect, useState } from 'react'
import emarald from "../../assets/images/emarald.jfif"
import SuccessAlert from "../../components/alert/SuccessAlert"
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

const CartItemDetails = ({baseUrl}) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const cartItems = JSON.parse(localStorage.getItem("cart")) || []
    const [total, setTotal] = useState(0)
    const [itemsArray, setItemsArray] = useState([])
    const [success, setSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
    const [discountModal, setDiscountModal] = useState(false)
    const [cartNumber, setCartNumber] = useState()
    const navigate = useNavigate()

    const [cartItemsFromServer, setCartItemsFromServer] = useState([])

    useEffect(() => {
      setCartItemsFromServer(cartItems.cart_items)
      setCartNumber(JSON.parse(localStorage.getItem("cartNumber")))
    },[])
    console.log(cartItemsFromServer)

    async function incrementCart(id){
      setCartNumber((cartNumber) => cartNumber + 1)
      localStorage.setItem("cartNumber", JSON.stringify(cartNumber + 1))

      console.log(id, JSON.stringify(cartItems.cart_items));
      const response = await fetch(`${baseUrl}/add_remove_item/?action=add&&id=${id}`,{
        method:"PUT",
        body: JSON.stringify(cartItems.cart_items),
        headers: {
          "Content-Type":"application/json"
        }
      })
      const data = await response.json()
      if(response.ok){
        localStorage.setItem("cart", JSON.stringify(data))
        setCartItemsFromServer(data.cart_items)
      }
    }

    async function decrementCart(id){
      setCartNumber((cartNumber) => cartNumber - 1)
      localStorage.setItem("cartNumber", JSON.stringify(cartNumber - 1))

      console.log(id, JSON.stringify(cartItems.cart_items));
      const response = await fetch(`${baseUrl}/add_remove_item/?action=subtract&&id=${id}`,{
        method:"PUT",
        body: JSON.stringify(cartItems.cart_items),
        headers: {
          "Content-Type":"application/json"
        }
      })
      const data = await response.json()
      if(response.ok){
        localStorage.setItem("cart", JSON.stringify(data))
        setCartItemsFromServer(data.cart_items)
      }
    }

    function confirmCheckout(){
      setSuccess("Are you sure you want to continue with this purchase?")
      console.log(cartItemsFromServer);
      setItemsArray(cartItemsFromServer)
    }


    async function checkoutPurchase(){
      console.log("data sent to the backend ==> ", itemsArray)
      if(!user){
        console.log("Guest cart")
        setLoader(true)
        const response = await fetch(`${baseUrl}/guest-add-to-cart/`,{
          method:"POST",
          body: JSON.stringify(itemsArray),
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data = await response.json()
        console.log(data)
        if(response) setLoader(false)
        if(response.ok){
          localStorage.setItem("sessionId", JSON.stringify(data.session_id))
          navigate(`/myorder/${data.order_id}`)
        }
      }else{
        console.log("usercart")
        console.log("data sent to the backend ==> ", itemsArray)
        setLoader(true)
        const response = await fetch(`${baseUrl}/add-to-cart/`,{
          method:"POST",
          body: JSON.stringify(itemsArray),
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user.access}`
          }
        })
        const data = await response.json()
        console.log(data)
        if(response) setLoader(false)
        if(response.ok){
          localStorage.setItem("sessionId", JSON.stringify(data.session_id))
          navigate(`/myorder/${data.order_id}`)
        }
      }
    }


  return (
    <div>
      <Navbar cartNumber={cartNumber}/>
      <div className='pt-[7rem] lg:px-12 px-6 pb-[10rem]' id='mobileSpace'>
          <div className='flex items-center justify-between pb-2' style={{ borderBottom:"1px solid #333" }}>
              <h1 className='font-bold'>My Cart</h1>
              <div className="flex items-center">
                  <p className='mr-5'>Total: 
                    {
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(Number(cartItems && cartItems.total_price))
                    }
                  </p>
                  <button className='py-1 px-2 bg-black text-white' onClick={confirmCheckout}>Checkout</button>
              </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {cartItemsFromServer && cartItemsFromServer.map(cartItem => (
                <div className='cart-item-details flex items-end shadow-xl p-[2rem]'>
                      <img src={cartItem.image} alt="" className='w-[50px] mr-[1rem]'/>
                      <div className='flex justify-between w-full g-10'>
                          <div>
                              <p>
                                {
                                  new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                  }).format(Number(cartItem.price))
                                }
                              </p>
                              <p className='text-sm'>{cartItem.name}</p>
                          </div>
                          <div>
                              <p>X{cartItem.quantity}</p>
                              <p>
                              {
                                new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                }).format(Number(cartItem.price) * cartItem.quantity )
                              }
                              </p>
                          <div className='flex items-center justify-between gap-10'>
                            <button className='cursor-pointer text-2xl text-gray-600' onClick={() => decrementCart(`${cartItem.id}`)} >-</button>
                            <button className='cursor-pointer text-2xl text text-gray-600' onClick={() => incrementCart(`${cartItem.id}`)}>+</button>
                          </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          {success && <SuccessAlert success={success} setSuccess={setSuccess} checkoutPurchase={checkoutPurchase}/>}
          {loader && <Loader />}
          {!user && 
          <>
            {discountModal && 
              <div className="successModalBg">
                <div
                  className="failureModal flex items-center justify-center flex-col gap-10"
                  style={{ position: "relative" }}
                >
                  <i
                    className="fa-solid fa-xmark"
                    style={{
                      color: "#333",
                      position: "absolute",
                      cursor: "pointer",
                      top: "15px",
                      right: "15px",
                      fontSize: "22px",
                    }}
                    onClick={() => setDiscountModal(false)}
                  ></i>
                  {/* <i class="ri-close-circle-line text-red-500 "></i> */}
                  <i class="ri-hand-coin-line text-6xl text-gray-500"></i>
                  <p style={{ color: "black" }}>Ready to unlock amazing savings and shop like a pro? Create your account now and join the savings party at Kraftea</p>
                </div>
              </div>
            }
          </>
          }
      </div>
    </div>
  )
}

export default CartItemDetails