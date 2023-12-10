import React, { useEffect, useState } from 'react'
import emarald from "../../assets/images/emarald.jfif"
import SuccessAlert from "../../components/alert/SuccessAlert"
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

const CartItemDetails = ({baseUrl}) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    const [total, setTotal] = useState(0)
    const [itemsArray, setItemsArray] = useState([])
    const [success, setSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
    const [discountModal, setDiscountModal] = useState(false)
    const navigate = useNavigate()
    // const [newCartItems, setNewCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")))

    
    const transformArray = () => {
        const itemMap = new Map();

      cartItems.forEach(obj => {
      const { id, item, image, name, price, category, description, status } = obj;
  
      if (itemMap.has(id)) {
        itemMap.set(id, { ...itemMap.get(id), qty: itemMap.get(id).qty + 1 });
      } else {
        itemMap.set(id, { id, image, price, category, description, status, name, qty: 1 });
      }
    });
  
    // setItemsArray(cartItems)
    return Array.from(itemMap.values());
    }

    let transformedArray = transformArray(cartItems);

    useEffect(() => {
        setTotal(cartItems.reduce((total, obj) => {
            return total + Number(obj.price);
          }, 0))
          setTimeout(() => {setDiscountModal(true)},2000)

          localStorage.setItem("newTransformedArray", JSON.stringify(transformArray(cartItems)))
    },[])

    function confirmCheckout(){
      setSuccess("Are you sure you want to continue with this purchase?")
      setItemsArray(transformArray)
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
      <Navbar />
      <div className='pt-[7rem] lg:px-12 px-6 pb-[10rem]' id='mobileSpace'>
          <div className='flex items-center justify-between pb-2' style={{ borderBottom:"1px solid #333" }}>
              <h1 className='font-bold'>My Cart</h1>
              <div className="flex items-center">
                  <p className='mr-5'>Total: ${total}</p>
                  <button className='py-1 px-2 bg-black text-white' onClick={confirmCheckout}>Checkout</button>
              </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {transformedArray && transformedArray.map(cartItem => (
                <div className='cart-item-details flex items-end shadow-xl p-[2rem]'>
                      <img src={cartItem.image} alt="" className='w-[50px] mr-[1rem]'/>
                      <div className='flex justify-between w-full g-10'>
                          <div>
                              <p>${cartItem.price}</p>
                              <p className='text-sm'>{cartItem.name}</p>
                          </div>
                          <div>
                              <p>X{cartItem.qty}</p>
                              <p>${Number(cartItem.price) * cartItem.qty}</p>
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