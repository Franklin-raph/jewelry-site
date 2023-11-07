import {useState} from 'react'
import { useLocation } from "react-router-dom";

const ErrorAlert = ({ error, setError, paymentUrl }) => {
    
    const [success, setSuccess] = useState("")
    const [loader, setLoader] = useState(false)
    const location = useLocation();

    function makepayment(){
      window.location.href = paymentUrl
    }

    function cancelPayment(){
      window.location.href = "/"
    }

  return (
    <div>
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
            onClick={() => setError(false)}
          ></i>
          <i class="ri-close-circle-line text-red-500 text-6xl"></i>
          <p style={{ color: "black" }}>{error}</p>
          {location.pathname === "/confirm-payment" && 
            <div className='flex items-center gap-5'>
              <button onClick={() => makepayment()}>Ok</button>
              <button onClick={() => cancelPayment()}>Cancel Payment</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ErrorAlert