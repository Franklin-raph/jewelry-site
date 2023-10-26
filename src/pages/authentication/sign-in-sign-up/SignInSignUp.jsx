import { useNavigate } from "react-router-dom"
import Logo from "../../../assets/images/logo.png"
import { useState } from "react"
import ErrorAlert from "../../../components/alert/ErrorAlert"
import Navbar from "../../../components/navbar/Navbar"

const SignInSignUp = ({baseUrl}) => {

  const [loader, setLoader] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpPassword2, setSignUpPassword2] = useState("")
  const [email, setEmail] = useState("")
  const [signUpError, setSignUpError] = useState("")
  // const [signUpError, setSignUpError] = useState("")
  const navigate = useNavigate()
  
  function showRegisterForm(){
    document.querySelector("#form1").style.left = "-50%"
    document.querySelector("#form2").style.left = "50%"
  }

  function showLoginForm(){
    document.querySelector("#form2").style.left = "150%"
    document.querySelector("#form1").style.left = "50%"
  }

  async function loginUser(){
    if(!email || !password){
      setError("Please fill in all fields")
      setTimeout(() => {
        setError("")
      },3000)
    }else{
      setLoader(true)
      const res = await fetch(`${baseUrl}/token/`, {
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email:email, password:password})
      })
      const data = await res.json()
      console.log(res, data)
      if(res.ok){
        localStorage.setItem("user", JSON.stringify(data))
        navigate("/")
      }
      if(!res.ok){
        setError("An error occured")
      }
    }
  }

  async function signUp(){
    if(!signUpPassword || !email || !signUpPassword2){
      setSignUpError("Please fill in all fields")
      setTimeout(() => {
        setSignUpError("")
      },3000)
    }else if(signUpPassword !== signUpPassword2){
      setSignUpError("Both password fields must match")
      setTimeout(() => {
        setSignUpError("")
      },3000)
    }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      setSignUpError("Please use a valid email address")
      setTimeout(() => {
        setSignUpError("")
      },3000)
    }else{
      setLoader(true)
      const res = await fetch(`${baseUrl}/signup/`, {
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email:email, password:signUpPassword})
      })
      const data = await res.json()
      console.log(res, data)
      if(res.ok){
        localStorage.setItem("user", JSON.stringify(data))
        navigate("/")
      }
      if(!res.ok){
        setError("An error occured")
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mb-[10rem]" id="mobileSpace">
        <div id="form1">
          <div className="formContainer">
            <img src={Logo} alt="" />
            <h4>Sign in</h4>
            {error && <span className="error-text">{error}</span>}
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-6"/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-6"/>
            <div className="flex items-center gap-1">
              <p>Don't have an account?</p>
              <p className="cursor-pointer" onClick={showRegisterForm}>Create one!</p>
            </div>
            <div className="buttons">
              <button className="login-btn" onClick={loginUser}>Login</button>
            </div>
          </div>
        </div>

        <div id="form2">
          <div className="formContainer">
            <img src={Logo} alt="" />
            <h4>Sign up</h4>
            {signUpError && <span className="error-text">{signUpError}</span>}
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-5"/>
            <input type="password" placeholder="Password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} className="mb-5"/>
            <input type="password" placeholder="Confirm Password" value={signUpPassword2} onChange={e => setSignUpPassword2(e.target.value)} className="mb-5"/>
            <div className="flex items-center gap-1">
              <p>Already have an account?</p>
              <p className="cursor-pointer" onClick={showLoginForm}>Sign in!</p>
            </div>
            <button className="sign-up-btn" onClick={signUp}>Sign Up</button>
          </div>
        </div>
        {error && <ErrorAlert error={error} setError={setError}/> }
      </div>
    </div>
  )
}

export default SignInSignUp