import React, { useState } from 'react'
import "./index.css"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import { FaRegSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
const NavBar = () => {
  const jwtToken = Cookies.get("jwtToken")
  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove("jwtToken")
    Cookies.remove("role")
    navigate("/login")
  }
  const theme = useSelector((state) => state.theme)
  const role = Cookies.get("role")
  const dispatch = useDispatch()
  const handleTheme = () => {
    dispatch({ type: "theme" })
  }
  return (
    <div className={`nav-container ${theme ? 'white bg-dark' : 'dark bg-white'}`}>
      <Link className={`${theme ? 'white' : 'dark'}`} to={`${role === "user" ? "/home" : "/admin-home"}`}>Library</Link>
      {/* {role === "librarian" && <Link className={` ${theme ? 'white' : 'dark'}`} to="/users">Users</Link>} */}
      <div className='button-div'>
        <button className={`button ${theme ? 'white' : 'dark'}`} onClick={handleLogout}>{jwtToken ? "LogOut" : "Login"}</button>
        <Link className={`button ${theme ? 'white' : 'dark'}`} to="/about">About</Link>
        <button className={`theme-button ${theme ? 'white' : 'dark'}`} onClick={handleTheme}>{theme ? <FaMoon /> : <FaRegSun />}</button>
      </div>
    </div >
  )
}

export default NavBar