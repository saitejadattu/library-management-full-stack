import React, { useState } from 'react'
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import Cookies from "js-cookie"
import "./index.css"
import NavBar from '../NavBar'
const SignUp = () => {
    const [userDetails, setUserDetails] = useState({ email: "", password: "", role: "" })
    const theme = useSelector((state) => state.theme)
    const handleInput = (e) => {
        const { name, value } = e.target
        setUserDetails((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleForm = async (e) => {
        e.preventDefault()
        // console.log(userDetails)
        try {
            const response = await axios.post("http://localhost:5000/api/register", userDetails, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            )
            alert(response.data.message)
        } catch (error) {
            if (error.response) {
                // Backend responded with an error
                alert(error.response.data.message || "SignUp failed. Please try again.");
            } else if (error.request) {
                // Request was made but no response received
                alert("No response from server. Please try again later.");
            } else {
                // Something went wrong in setting up the request
                alert("An unexpected error occurred.");
            }
        }
    }
    const handleRole = () => {
        if(userDetails.role===""){
            setUserDetails((prevState)=>({...prevState, role: "librarian"}))
        }else{
            setUserDetails((prevState)=>({...prevState, role: ""}))
        }
    }
    // console.log(userDetails)
    const jwtToken = Cookies.get("jwtToken")
    if (jwtToken) {
        return <Navigate to="/home" />
    }
    return (
        <div className={`login-container ${theme ? "bg-l-dark white" : "bg-white dark"}`}>
            <NavBar />
            <div className='login-div-container'>
                <form className='login-form-container' onSubmit={handleForm}>
                    <h1>SignUp</h1>
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="text" placeholder="Enter Your Email" id="email" name="email" onChange={handleInput} required />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" placeholder="Enter Your Password" id="password" name="password" onChange={handleInput} required />
                    <br />
                    <p className={`log-text ${theme ? "white " : "dark"}`}>Already have an account <Link to="/login" className={`${theme ? "parrot" : ""}`}>Login</Link></p>
                    <div className='role-container'>
                    <input type="checkbox" id="role" onChange={handleRole} />
                        <label htmlFor="role">Check This only if You Want to Procced as Librarian</label>
                    </div>
                    <button type="submit right" className='login-button'>SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp