import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

const OrderInfo = ({baseUrl}) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [orderedProducts, setOrderedProducts] = useState()
    const { order_id } = useParams()
    const [total, setTotal] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
    const [shippingAddress, setShippingAddress] = useState("")
    const [myorder, setMyorder] = useState(false)
    const navigate = useNavigate()

    useEffect(() =>{
        getMyOrder()
    },[])

    async function getMyOrder(){
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

  return (
    <div>
        <Navbar />
        <div className='px-12 py-[7rem]'>
            <div className="flex items-center justify-between mb-[1rem] pb-2" style={{ borderBottom:"1px solid #000" }}>
                <div className='flex items-center gap-1 border-[#d3d3d3] border p-1 rounded-md cursor-pointer' onClick={() => navigate('/dashboard')}>
                    <i class="ri-arrow-left-line"></i>
                    <p>Back</p>
                </div>
                <h1 className="font-bold my-1 ml-[1rem]">My ordered products</h1>
                <p></p>
            </div>
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
                <div className='flex items-start gap-2 my-4 justify-between'>
                    <p>Shipping Address:</p>
                    <p>{orderedProducts && orderedProducts.shipping_address}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderInfo