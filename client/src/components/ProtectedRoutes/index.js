import { Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import React from 'react'
const ProtechtedRoutes = () => {
    const jwtToken = Cookies.get("jwtToken")
    return jwtToken !== "undefined" ? <Outlet /> : <Navigate to="/login" />
}

export default ProtechtedRoutes