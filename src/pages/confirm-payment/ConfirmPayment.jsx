import {useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'

const ConfirmPayment = ({baseUrl}) => {

    const sessionId = JSON.parse(localStorage.getItem("sessionId"))
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [paymentUrl, setPaymentUrl] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        confirmPayment()
    },[])

    async function confirmPayment(){
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/confirm-payment/?session_id=${sessionId}`)
        const data = await response.json()
        if(response) setIsLoading(false)
        if(!response.ok){
            setError(data.detail)
            setPaymentUrl(data.payment_url)
        }
        
        if(response.ok){
            setSuccess(data.detail)
        }
    }

  return (
    <div>
        <Navbar />
        <div className='pt-[5rem] px-12 pb-[5rem] mb-[5rem]'>
            {isLoading && 
                <>
                    <div className='loader-bg1'>
                        <div className="loader-bg2">
                            <i class="fa-solid fa-gear fa-spin text-2xl"></i>
                        </div>
                    </div>
                    <h1 className='mb-4 font-bold text-center fixed' style={{ top:"40%", left:"50%", transform:"translate(-50%, -50%)" }}>Your payment is been confirmed, please wait</h1>
                </>
            }

            {error &&
                <ErrorAlert error={error} setError={setError} paymentUrl={paymentUrl}/>
            }

            {success &&
                <SuccessAlert success={success} setSuccess={setSuccess}/>
            }
        </div>
    </div>
  )
}

export default ConfirmPayment