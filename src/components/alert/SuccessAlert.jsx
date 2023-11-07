import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessAlert = ({ success, setSuccess, checkoutPurchase, myorder }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      <div className="successModalBg">
        <div
          className="successModal flex items-center justify-center flex-col gap-5"
          style={{ position: "relative" }}
        >
          {location.pathname === "/upload-card" ? (
            <></>
          ) : (
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
              onClick={() => setSuccess(false)}
            ></i>
          )}
          <i class="ri-checkbox-circle-line text-green-500 text-6xl"></i>
          <p style={{ color: "black" }}>{success}</p>
          {location.pathname === "/cart-item-details" &&
            <div>
              <button className="bg-green-500 px-3 py-1 text-white" onClick={checkoutPurchase}>Yes</button>
              <button className="bg-red-500 ml-3 px-3 py-1 text-white" onClick={()=> setSuccess(false)} >No</button>
            </div>
          }

          {location.pathname === "/cart-item-details" &&
            <div>
              <button className="bg-green-500 px-3 py-1 text-white" onClick={() => navigate("/")}>Ok</button>
            </div>
          }
          {myorder && 
            <>
              {user && <button className="bg-green-500 px-3 py-1 text-white" onClick={() => navigate("/dashboard")}>Ok</button>}
              {!user && <button className="bg-green-500 px-3 py-1 text-white" onClick={() => navigate("/")}>Ok</button>}
            </> 
          }
        </div>
      </div>
    </div>
  )
}

export default SuccessAlert