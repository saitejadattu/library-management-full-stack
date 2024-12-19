import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Users from './components/Users'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'
import EachBook from "./components/EachBook"
import AdminHome from "./components/AdminHome"
import DetailedBorrowView from './components/DetailedBorrowView'
import ProtechtedRoutes from './components/ProtectedRoutes'
import LibrarianRoutes from './components/LibrarianRoutes'
import UserRoutes from './components/UserRoutes'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtechtedRoutes />}>
          <Route element={<UserRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/request-book/:id" element={<EachBook />} />
          </Route>
          <Route element={<LibrarianRoutes />}>
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/detailed-borrow-view/:id" element={<DetailedBorrowView />} />
            <Route path="/users" element={<Users/>}/>
          </Route>
        </Route>
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App