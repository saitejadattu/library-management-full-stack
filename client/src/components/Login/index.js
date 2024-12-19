import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { jwtDecode } from 'jwt-decode'
import Cookies from "js-cookie"
import axios from "axios"
import "./index.css"
import NavBar from '../NavBar'
const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" })
  let role = Cookies.get("role")
  const theme = useSelector((state) => state.theme)
  const navigate = useNavigate()
  const handleInput = (e) => {
    const { name, value } = e.target
    setUserDetails((prevState) => ({ ...prevState, [name]: value }))
  }
  const handleForm = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/login", userDetails, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        Cookies.set("jwtToken", response.data.jwtToken)
        Cookies.set("role", jwtDecode(Cookies.get("jwtToken")).role)
        navigate("/home")
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        alert("No response from server. Please try again later.");
      } else {
        // Something went wrong in setting up the request
        alert("An unexpected error occurred.");
      }
    }
  }
  const jwtToken = Cookies.get("jwtToken")
  if (jwtToken) {
    return <Navigate to={`${role === "user" ? "/home" : "/admin-home"}`} />
  }
  return (
    <div className={`login-container ${theme ? "bg-l-dark white" : "bg-white dark"}`}>
      <NavBar />
      <div className='login-div-container'>
        <form className='login-form-container' onSubmit={handleForm}>
          <h1>Login</h1>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input type="text" placeholder="Enter Your Email" id="email" name="email" onChange={handleInput} required />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" placeholder="Enter Your Password" id="password" name="password" onChange={handleInput} required />
          <br />
          <p className={`log-text ${theme ? "white ":"dark"}`}>Already have an account <Link to="/" className={`${theme ? "parrot":""}`}>SignUp</Link></p>
          <button type="submit" className='login-button'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login