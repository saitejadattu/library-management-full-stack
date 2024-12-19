import React from 'react'
import Cookies from "js-cookie"
import { Navigate, Outlet } from 'react-router-dom'

const UserRoutes = () => {
    const role = Cookies.get("role")
    return role === "user" ? <Outlet /> : <Navigate to="/login" />
}

export default UserRoutes