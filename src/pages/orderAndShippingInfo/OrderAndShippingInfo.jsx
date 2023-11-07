import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'
import Loader from '../../components/loader/Loader'
import Navbar from '../../components/navbar/Navbar'

const OrderAndShippingInfo = ({baseUrl}) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [orderedProducts, setOrderedProducts] = useState()
    const { order_id } = useParams()
    const [total, setTotal] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
    const [shippingAddress, setShippingAddress] = useState("")
    const [email, setEmail] = useState("")
    const [myorder, setMyorder] = useState(false)
    const navigate = useNavigate()
    console.log(order_id)

    useEffect(() =>{
        getMyOrder()
    },[])

    async function getMyOrder(){
        if(!user){
            const response = await fetch(`${baseUrl}/guest-orders/${order_id}/`)
            const data = await response.json()
            if(response.ok){
                setOrderedProducts(data)
                setTotal(data.cart_items.reduce((total, obj) => {
                    return total + Number(obj.subtotal);
                }, 0))
            }
            console.log(response, data)
        }else{
            const response = await fetch(`${baseUrl}/orders/${order_id}/`,{
            headers:{
                Authorization:`Bearer ${user.access}`
              }
            })
            const data = await response.json()
            if(response.ok){
                setOrderedProducts(data)
                setTotal(data.cart_items.reduce((total, obj) => {
                    return total + Number(obj.subtotal);
                }, 0))
            }
            console.log(response, data)
        }
        
    }

    async function purchaseItem(){
        // console.log(first)
        if(!shippingAddress){
            setError("Please input your shipping info")
        }else{
            setLoader(true)
            const response = await fetch(`${baseUrl}/orders/${order_id}/`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${user.access}`
                  },
                body:JSON.stringify({shipping_address:shippingAddress})
            })
            const data = await response.json()
            if(response) setLoader(false)
            if(response.ok){
                // localStorage.removeItem("cartItems")
                setMyorder(true)
                // setSuccess("Your order is being processed.")
                window.location.href = data.payment_link
            }
            console.log(response, data)
        }
    }

    async function guestPurchaseItem(){
        // console.log(first)
        if(!shippingAddress || !email){
            setError("Please fill out all fields")
        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            setError("Please use a valid email address")
        }else{
            setLoader(true)
            const response = await fetch(`${baseUrl}/guest-orders/${order_id}/`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                  },
                body:JSON.stringify({shipping_address:shippingAddress, user:email})
            })
            const data = await response.json()
            if(response) setLoader(false)
            if(response.ok){
                localStorage.removeItem("cartItems")
                setMyorder(true)
                setSuccess("Your order is being processed.")
            }
            console.log(response, data)
        }
    }

  return (
    <div>
        <Navbar />
        <div className='pt-[5rem] px-12 pb-[5rem] mb-[5rem]'>
            <h1 className='mb-4 font-bold'>My Order Summary</h1>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th className='text-start'>Product name</th>
                        <th className='text-end'>Qty.</th>
                        <th className='text-end'>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                {orderedProducts && orderedProducts.cart_items.map(item => (
                    // <div>{item.product_name}</div>
                    <tr>
                        <td className='pt-4'>{item.product_name}</td>
                        <td className='pt-4 text-end'>{item.quantity}</td>
                        <td className='pt-4 text-end'>${item.subtotal}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='flex items-center justify-between mt-4 border-[#d3d3d3] border-t-2'>
                <h1 className='font-bold'>Total</h1>
                <h1 className='font-bold'>${total}</h1>
            </div>
            <div>
                <div className='flex items-center gap-3 my-4 justify-between'>
                    <p>Order Date:</p>
                    <p>{orderedProducts && orderedProducts.order_date.slice(0, 10)}</p>
                </div>
                <div className='flex items-center gap-3 my-4 justify-between'>
                    <p>Order ID:</p>
                    <p>{orderedProducts && orderedProducts.order_id}</p>
                </div>
                <div className='flex items-center gap-3 my-4 justify-between'>
                    <p>Status:</p>
                    <p className='capitalize'>{orderedProducts && orderedProducts.status}</p>
                </div>
                <div className='flex items-start gap-2 my-6 flex-col justify-between'>
                    <p>Shipping Address:</p>
                    <input type="text" placeholder='Please input your shipping address' onChange={e => setShippingAddress(e.target.value)}/>
                </div>
                {!user && 
                    <div className='flex items-start gap-2 my-8 flex-col justify-between'>
                        <p>Email Address:</p>
                        <input type="email" placeholder='Please input your email address' onChange={e => setEmail(e.target.value)}/>
                    </div>
                }
            </div>
            {user && <button onClick={purchaseItem} className='bg-black text-white px-3 py-1'>Confirm Purchase</button> }
            {!user && <button onClick={guestPurchaseItem} className='bg-black text-white px-3 py-1'>Confirm Purchase</button> }
            {error && <ErrorAlert error={error} setError={setError}/> }
            {success && <SuccessAlert success={success} setSuccess={setSuccess} myorder={myorder}/> }
            {loader && <Loader />}
        </div>
    </div>
      
  )
}

export default OrderAndShippingInfo