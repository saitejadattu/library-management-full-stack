import React from 'react'
import Cookies from "js-cookie"
import { Navigate, Outlet } from 'react-router-dom'

const LibrarianRoutes = () => {
  const role = Cookies.get("role")
  return role === "librarian" ? <Outlet /> : <Navigate to="/login" />
}

export default LibrarianRoutes