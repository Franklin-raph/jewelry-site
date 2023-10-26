import {useState, useEffect} from 'react'
import ErrorAlert from '../../components/alert/ErrorAlert'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

const AllProducts = ({baseUrl}) => {
    const [jewelries, setJewelries] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))
    const [error, setError] = useState(false)
    const [cartTotals, setCardTotals] = useState(0)
    const cartItemsArray = JSON.parse(localStorage.getItem("cartItems")) || []
    const navigate = useNavigate()

    useEffect(() => {
        getProducts()
        setCardTotals(cartItemsArray.length)
    },[])

    async function getProducts(){
        const response = await fetch(`${baseUrl}/product/`)
        const data = await response.json()
        setJewelries(data)
        console.log(data)
    }

    function addItemToCart(id){
        if(!user){
            setError("Please login before adding item to cart")
        }else{
            setCardTotals(cartItemsArray.length + 1)
            const itemToBeAdded = jewelries.find(jewelry => jewelry.id === id)
            cartItemsArray.push({...itemToBeAdded})
            localStorage.setItem("cartItems", JSON.stringify(cartItemsArray))
            // console.log(cartTotals)
            console.log(cartItemsArray)
        }
    }

  return (
    <div>
        <Navbar />
        <div className='lg:px-12 py-[7rem]' id='mobileSpace'>
            <div className="flex items-center justify-between mb-4">
                <h1 className="font-bold my-1 ml-[3rem]" style={{ borderBottom:"1px solid #000" }}>All Products</h1>
            </div>
            <div className='featured-images'>
                {jewelries && jewelries.map((jewelry,index) => (
                        <div key={index} className='flex items-center flex-col justify-center bg-slate-200 pt-8 pb-5 shadow-lg featuredItem'>
                            <img src={jewelry.image} alt={jewelry.name} className='featuredItemImg'/>
                            <div className='flex items-center flex-col gap-1 mt-5 mb-3'>
                                <p>{jewelry.name}</p>
                                <p className='font-bold'>${+jewelry.price}</p>
                            </div>
                            <button className='bg-transparent text-black py-1 px-4 hover:bg-black hover:text-white transition' onClick={() => addItemToCart(`${jewelry.id}`)} style={{ border:"1px solid #000" }}>Add to cart</button>
                        </div>
                    ))}
            </div>
            {error && <ErrorAlert error={error} setError={setError}/> }
        </div>
    </div>
  )
}

export default AllProducts