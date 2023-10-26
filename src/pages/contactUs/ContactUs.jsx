import {useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Loader from '../../components/loader/Loader'
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'

const ContactUs = ({baseUrl}) => {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [subject, setSubject] = useState("")
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleContact(e){
        e.preventDefault()
        if(!email || !first_name || !last_name || !subject || !message){
            setError("Please fill in the required fields")
        }else{
            setLoader(true)
            const response = await fetch(`${baseUrl}/contact-us/`,{
                method:"POST",
                body: JSON.stringify({first_name, last_name, email, subject, message}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response) setLoader(false)
            const data = await response.json()
            console.log(response, data)
            if(response.ok){
                setSuccess("Message has been sent successfully")
                setEmail("")
                setFirstName("")
                setLastName("")
                setSubject("")
                setMessage("")
            }
            if(!response.ok){
                setError("An error occured, message could not be sent")
            }
        }
    }

  return (
    <div>
        <Navbar />
        <div className="flex-col flex md:flex-row px-6 lg:px-12 py-[8rem] justify-between" id='mobileSpace'>
            <div className='mb-5'>
                <h1 className='font-bold text-2xl lg:text-4xl'>Contact Us</h1>
                <p className='text-md lg:text-lg mt-3'>Need to get in touch with us? <br /> Please fill out the form with the required details </p>
            </div>
            <form style={{ boxShadow:"0px 0px 3px #aaa", padding:"20px" }} onSubmit={handleContact}>
                <div className="flex gap-10">
                    <div className='w-full'>
                        <label>First Name <span className='text-red-500'>*</span> </label>
                        <input type="text" onChange={e => setFirstName(e.target.value)} value={first_name}/>
                    </div>
                    <div className='w-full'>
                        <label>Last Name <span className='text-red-500'>*</span> </label>
                        <input type="text" onChange={e => setLastName(e.target.value)} value={last_name}/>
                    </div>
                </div>
                <div className="flex gap-10 my-10">
                    <div className='w-full'>
                        <label>Email Address <span className='text-red-500'>*</span> </label>
                        <input type="text" onChange={e => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className='w-full'>
                        <label>Email Subject <span className='text-red-500'>*</span> </label>
                        <input type="text" onChange={e => setSubject(e.target.value)} value={subject}/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label>Message <span className='text-red-500'>*</span> </label>
                    <textarea onChange={e => setMessage(e.target.value)} value={message} cols="10" rows="3" style={{ borderBottom:"1px solid #000", outline:"none", padding:"5px", resize:"none" }}></textarea>
                </div>
                <input type="submit" value="Submit" className='mt-5 py-3 bg-slate-800 text-white cursor-pointer' style={{ borderBottom:"none" }}/>
            </form>
        </div>
        {loader && <Loader /> }
        {error && <ErrorAlert error={error} setError={setError}/>}
        {success && <SuccessAlert success={success} setSuccess={setSuccess}/> }
    </div>
  )
}

export default ContactUs