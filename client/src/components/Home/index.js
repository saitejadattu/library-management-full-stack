import React, { useState, useEffect, CSSProperties } from 'react'
import { Link } from "react-router-dom"
import "./index.css"
import axios from "axios"
import NavBar from '../NavBar'
import { useSelector } from "react-redux"
import ClipLoader from "react-spinners/ClipLoader";
const Home = () => {
  const [bookList, setBookList] = useState([])
  const [loading, setLoading] = useState(false)
  const theme = useSelector((state) => state.theme)
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/books")
    setBookList(response.data.result)
    setLoading((prevState) => !prevState)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const loadingView = () => (
    <div className={`loading ${theme? "bg-l-dark": "bg-white"}`}>
      <ClipLoader
        color={`${theme? "white": "black"}`}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
  const renderTable = () => (
    <table className={`${theme ? "bg-dark" : "bg-white"}`}>
      <thead>
        <tr className={`${theme ? "white" : "dark"}`}>
          <th className={`${theme ? "bg-thd" : "bg-thw"}`}>Book</th>
          <th className={`${theme ? "bg-thd" : "bg-thw"}`}>Author</th>
          <th className={`${theme ? "bg-thd" : "bg-thw"}`}>Quantity</th>
          <th className={`${theme ? "bg-thd" : "bg-thw"}`}>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookList && bookList.map((eachBook) =>
          <tr key={eachBook.id} className={`${theme ? "white" : "dark"}`}>
            <td>{eachBook.title}</td>
            <td>{eachBook.author}</td>
            <td>{eachBook.quantity}</td>
            <td><Link className={`request-button ${theme ? "bg-red white" : "bg-l-red white"}`} to={`/request-book/${eachBook.id}`}>Request</Link></td>
          </tr>
        )}
      </tbody>
    </table>
  )
  return (
    <div className={`home-container${theme ? "bg-white" : "bg-dark"}`}>
      <NavBar />
      <div>
        {loading ? loadingView() : renderTable()}
      </div>
    </div>
  )
}

export default Home