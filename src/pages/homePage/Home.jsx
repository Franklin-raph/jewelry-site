import React, { useEffect, useState } from 'react'
import LandingImage from "../../assets/images/bg-image.webp"
import RingImages from "../../assets/images/ring.png"
import necklace from "../../assets/images/necklace.jpg"
import watch from "../../assets/images/watch.jfif"
import bangle from "../../assets/images/bangle.jfif"
import ear_ring from "../../assets/images/ear-ring.webp"
import ear_ring1 from "../../assets/images/ear-ring1.webp"
import emarald from "../../assets/images/emarald.jfif"
import image1 from "../../assets/images/blog-item-01.png"
import image2 from "../../assets/images/blog-item-02.png"
import image3 from "../../assets/images/blog-item-03.png"
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useNavigate } from 'react-router-dom';
import ErrorAlert from '../../components/alert/ErrorAlert'
import Navbar from '../../components/navbar/Navbar'

const Home = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [toggleCategories, setToggleCategories] = useState(false)
    const [currentCategory, setCurrentCategory] = useState("All")
    const [jewelriesCategories, setJewelriesCategories] = useState([])
    const [error, setError] = useState(false)
    const [jewelries, setJewelries] = useState([
        {
            id:"1",
            img:RingImages,
            name:"Ring",
            price:100
        },
        {
            id:"2",
            img:necklace,
            name:"Necklace",
            price:200
        },
        {
            id:"3",
            img:watch,
            name:"Wrist Watch",
            price:300
        },
        {
            id:"4",
            img:bangle,
            name:"Golden Bangle",
            price:400
        },
        {
            id:"5",
            img:ear_ring,
            name:"Ear Ring",
            price:500
        },
        // {
        //     img:ear_ring1,
        //     name:"Diamond Ear Ring",
        //     price:"$200"
        // },
        // {
        //     img:emarald,
        //     name:"Emarald Necklace",
        //     price:"$300"
        // }
    ])

    async function getProducts(){
        const response = await fetch(`${baseUrl}/product/`)
        const data = await response.json()
        setJewelries(data)
        console.log(data)
    }

    useEffect(() => {
        getProducts()
        getCategory()
    },[])

    const options = {
        margin: 40,
        responsiveClass: true,
        nav: true,
        dots: true,
        autoplay: true,
        // navText: true,
        // navText: ["Prev", "Next"],
        smartSpeed: 1000,
        loop:true,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 4,
    
            }
        },
    };

    const [cartTotals, setCardTotals] = useState(0)
    // const storedItems = 
    useEffect(() => {
        setCardTotals(cartItemsArray.length)
    },[])

    const cartItemsArray = JSON.parse(localStorage.getItem("cartItems")) || []

    function addItemToCart(id){
        // if(!user){
            // setError("Please login before adding item to cart")
        // }else{
            setCardTotals(cartItemsArray.length + 1)
            const itemToBeAdded = jewelries.find(jewelry => jewelry.id === id)
            cartItemsArray.push({...itemToBeAdded})
            localStorage.setItem("cartItems", JSON.stringify(cartItemsArray))
            // console.log(cartTotals)
            console.log(cartItemsArray)
        // }
    }

    async function getCategory(){
        const response = await fetch(`${baseUrl}/category/`)
        const data = await response.json()
        setJewelriesCategories(data)
        console.log(data)
    }

    async function getItemsByCategory(id, name){
        setCurrentCategory(name)
        if(name === "All"){
            getProducts()
        }else{
            const response = await fetch(`${baseUrl}/filter-products/?id=${id}`)
            const data = await response.json()
            if(response.ok){
                setJewelries(data)
            }
            console.log(response, data)
        }
        // const response = await fetch()
    }

  return (
    <div>
        <Navbar cartTotals={cartTotals}/>
        <main>
            <div>
                <h1>Kraft designs</h1>
                <p>Your home of finest selections of precious, simple, elegant pieces of jewelry.</p>
                {user ? 
                    <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                : 
                    <div className="main-btns">
                        <Link to="/sign-in-sign-up">Sign In</Link>
                        <Link to="/sign-in-sign-up">Get Started</Link>
                    </div>
                }
            </div>
            <img src={LandingImage} alt="" />
        </main>

        <section id="gallery" className='px-[4rem]'>
            <div className="gallery-image">
                <div className="header">
                    <h3>Our Gallery</h3>
                    <p>The Precious Jewellry works in life that light up your way.</p>
                </div>
                <OwlCarousel
                    {...options}
                >
                    {jewelries && jewelries.map((jewelry,index) => (
                        <div key={index} className='flex items-center flex-col justify-center bg-slate-200 pt-8 pb-5'>
                            <img src={jewelry.image} alt="Rings"/>
                            <div className='flex items-center gap-10 mt-5 mb-3'>
                                <p>{jewelry.name}</p>
                                <p>${jewelry.price}</p>
                            </div>
                            {/* <button className='bg-transparent text-black py-1 px-4 hover:bg-black hover:text-white transition' style={{ border:"1px solid #000" }}>Add to cart</button> */}
                        </div>
                    ))}
                </OwlCarousel>
            </div>
        </section>

        <section id="gallery mobileSpace" className='mb-[10rem]'>
            <div className="gallery-image bg-slate-200 pb-10 pt-8">
                <div className='text-center'>
                    <h2 className='text-[30px] font-bold pb-2 mb-[30px] inline-block' style={{ borderBottom:"2px solid #000" }}>Featured Products</h2>
                </div>
                <div className="mb-3 flex items-center justify-between px-[90px]">
                    <div className='px-2 py-1 rounded-md relative mb-5' onClick={() => setToggleCategories(!toggleCategories)} style={{ border:"1px solid #555" }}>
                        <div className="cursor-pointer flex items-center gap-1">
                            <p className='text-[13px]'>Categories</p>
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                        {toggleCategories && 
                            <div className='absolute bg-slate-200 top-10 text-left px-4 py-1 rounded-md right-[5px] z-10' style={{ border:"1px solid #000" }}>
                                {jewelriesCategories.map(jewelry => (
                                    <p key={jewelry.id} className='cursor-pointer text-[13px] py-1 hover:text-gray-500' onClick={() => getItemsByCategory(jewelry.id, jewelry.name)}>{jewelry.name}</p>
                                ))}
                            </div>
                        }
                    </div>
                    <p style={{ borderBottom:"1px solid #000" }}>{currentCategory}</p>
                    
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
                <div className='flex items-center w-full justify-center mt-12'>
                    <button className='bg-transparent text-black py-1 px-4 hover:bg-black hover:text-white transition' style={{ border:"1px solid #000" }} onClick={() => navigate("/allProducts")}>View All Products</button>
                </div>
            </div>
        </section>

        {/* <section id="blogs" className='px-[3rem] mt-1 mb-[10rem]'>
            <h2 className='mb-3 font-bold text-2xl text-gray-500'>Latest Blogs</h2>
            <div className='body grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-between gap-8'>
                <div className='shadow-lg'>
                    <img src={image1} alt="" className='w-full'/>
                    <div className='p-3'>
                        <div className='flex items-center justify-between text-gray-500 text-[14px]'>
                            <p>04 Oct. 2023</p>
                            <Link>Lorem Ipsup</Link>
                        </div>
                        <h1 className='font-[500] mt-3'>Blog title</h1>
                        <p className='text-sm mt-1'>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>
                    </div>
                </div>
                <div className='shadow-lg'>
                    <img src={image2} alt="" className='w-full'/>
                    <div className='p-3'>
                        <div className='flex items-center justify-between text-gray-500 text-[14px]'>
                            <p>04 Oct. 2023</p>
                            <Link>Lorem Ipsup</Link>
                        </div>
                        <h1 className='font-[500] mt-3'>Blog title</h1>
                        <p className='text-sm mt-1'>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>
                    </div>
                </div>
                <div className='shadow-lg'>
                    <img src={image3} alt="" className='w-full' />
                    <div className='p-3'>
                        <div className='flex items-center justify-between text-gray-500 text-[14px]'>
                            <p>04 Oct. 2023</p>
                            <Link>Lorem Ipsup</Link>
                        </div>
                        <h1 className='font-[500] mt-3'>Blog title</h1>
                        <p className='text-sm mt-1'>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>
                    </div>
                </div>
                <div className='shadow-lg'>
                    <img src={image1} alt="" className='w-full' />
                    <div className='p-3'>
                        <div className='flex items-center justify-between text-gray-500 text-[14px]'>
                            <p>04 Oct. 2023</p>
                            <Link>Lorem Ipsup</Link>
                        </div>
                        <h1 className='font-[500] mt-3'>Blog title</h1>
                        <p className='text-sm mt-1'>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>
                    </div>
                </div>
            </div>
        </section> */}
        {error && <ErrorAlert error={error} setError={setError}/> }
    </div>
  )
}

export default Home