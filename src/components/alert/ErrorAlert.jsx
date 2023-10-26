import {useState} from 'react'

const ErrorAlert = ({ error, setError }) => {
    
    const [success, setSuccess] = useState("")
    const [loader, setLoader] = useState(false)
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
        </div>
      </div>
    </div>
  )
}

export default ErrorAlert