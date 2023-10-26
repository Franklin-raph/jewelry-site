import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

const Dashboard = ({baseUrl}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [allMyOrders, setAllMyOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllMyOrders()
  },[])

  async function getAllMyOrders(){
    const response = await fetch(`${baseUrl}/add-to-cart/`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${user.access}`
      },
    })
    const data = await response.json()
    if(response.ok){
      setAllMyOrders(data.reverse())
    }
    console.log(data)
  }

  return (
    <div>
      <Navbar />
      <div className="pt-[6rem] px-4 pb-[8rem]" id='mobileSpace'>
          <div className='flex items-center justify-between border-[#d3d3d3] border-b-2 my-3 pb-2'>
            <div className='flex items-center gap-1 border-[#d3d3d3] border p-1 rounded-md cursor-pointer' onClick={() => navigate('/')}>
              <i class="ri-arrow-left-line"></i>
              <p>Back</p>
            </div>
            <h1 className="font-bold">My Orders</h1>
            <p></p>
          </div>
          <div className='flex items-center justify-between mb-5' style={{ borderBottom:"1px solid #d3d3d3" }}>
            <p>Order Date</p>
            <p>Status</p>
            <p>Price</p>
          </div>
          {allMyOrders.map(myOrder => (
            <div className='flex items-center justify-between cursor-pointer hover:bg-slate-200 p-2' onClick={() => navigate(`/order-details/${myOrder.order_id}`)}>
              <p>{myOrder.order_date.slice(0, 10)}</p>
              <p className='capitalize'>{myOrder.status}</p>
              <p>${myOrder.total_price}</p>
            </div>
          )) }
      </div>
    </div>
    
  )
}

export default Dashboard