import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function InputForm({setIsOpen}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit =async(e)=>{
        e.preventDefault()
        let endpoit = (isSignUp)? "signUp": "logIn"
        await axios.post(`http://localhost:5000/${endpoit}`,{email,password})
        .then((res)=>{
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            setIsOpen()
        })
        .catch(data=> setError(data.response?.data?.error))

    }
  return (   
    <>
        <form className='form' onSubmit={handleSubmit}>
            <div className='form-control'>
                <label>Email: </label>
                <input type="email" required className='input' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email' />
            </div>
            <div className='form-control'>
                <label>Password: </label>
                <input type="password" required className='input' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password' />
            </div>
            <button type='submit'>{(isSignUp)? "SignUp":"Login"}</button><br />
            {(error != "") && <h6 className='error'>{error}</h6>}
            <p onClick={()=>{setIsSignUp(pre=>!pre)}}>{(isSignUp)? "Already have an account":"create new account"}</p>
        </form>
    </>
  )
}

export default InputForm