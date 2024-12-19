import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "./index.css"
import Cookies from "js-cookie"
import axios from "axios"
import NavBar from '../NavBar'
import ClipLoader from 'react-spinners/ClipLoader'
import { useSelector } from 'react-redux'
const AdminHome = () => {
  const [borrowList, setBorrowList] = useState([])
  const [loading, setLoading] = useState(false)
  const jwtToken = Cookies.get("jwtToken")
  const theme = useSelector((state) => state.theme)
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/borrow_requests", {
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    })

    setBorrowList(response.data.result)
    setLoading((prevState) => !prevState)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const loadingView = () => (
    <div className={`loading ${theme ? "bg-l-dark" : "bg-white"}`}>
      <ClipLoader
        color={`${theme ? "white" : "black"}`}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
  const renderData = () => (
    <table className={`${theme ? "bg-l-dark" : "bg-white"}`}>
      <thead>
        <tr className={`${theme ? "white" : "dark"}`}>
          <th>Book Id</th>
          <th>User Id</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {borrowList && borrowList.map((each) =>
          <tr className={`${theme ? "white" : "dark"}`} key={each.id}>
            <td>{each.book_id}</td>
            <td>{each.user_id}</td>
            <td>{each.status}</td>
            <td><Link className={`request-button ${theme ? "bg-red white" : "bg-l-red white"}`} to={`/detailed-borrow-view/${each.id}`}>View</Link></td>
          </tr>
        )}
      </tbody>
    </table>
  )
  return (
    <div>
      <NavBar />
      <div>
        {loading ? loadingView() : renderData()}
      </div>
    </div>
  )
}

export default AdminHome