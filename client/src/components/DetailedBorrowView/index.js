import React, { useEffect, useState } from 'react'
import axios from "axios"
import NavBar from '../NavBar'
import { useSelector } from "react-redux"
import Cookies from "js-cookie"
import "./index.css"
import { useParams } from "react-router-dom"
import ClipLoader from 'react-spinners/ClipLoader'
const DetailedBorrowView = () => {
    const [borrowData, setBorrowData] = useState('')
    const [userData, setUserData] = useState("")
    const [bookData, setBookData] = useState('')
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const jwtToken = Cookies.get("jwtToken")
    const theme = useSelector((state) => state.theme)
    const fetchData = async () => {
        const borrowResponse = await axios.get(`http://localhost:5000/api/single-borrow-request/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        const userResponse = await axios.get(`http://localhost:5000/api/user/${borrowResponse.data.result.user_id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        const bookResponse = await axios.get(`http://localhost:5000/api/book-request/${borrowResponse.data.result.book_id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        setBorrowData(borrowResponse.data.result)
        setUserData(userResponse.data.result)
        setBookData(bookResponse.data.result)
    }
    const handleApprove = async () => {

        const response = await axios.put(`http://localhost:5000/api/borrow_requests/${id}/approve`, {}, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        alert(response.data.message)
    }
    const handleDeney = async () => {

        const response = await axios.put(`http://localhost:5000/api/borrow_requests/${id}/deny`, {}, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        alert(response.data.message)
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
    const renderData = () => (
        <div className={`detailed-view-info-container ${theme ? "bg-l-dark white" : "bg-white dark"}`}>
            <p><span>Book Name: </span>{bookData.title}</p>
            <p><span>User Email: </span>{userData.email}</p>
            <p><span>Start Date: </span>{borrowData.start_date}</p>
            <p><span>End Date: </span>{borrowData.end_date}</p>
            <div className='ap-dn-button-container'>
                <button className={`request-btn ${theme ? "white bg-l-blue" : "white bg-green"}`} onClick={handleApprove}>Approve</button>
                <button className={`request-btn ${theme ? "white bg-red" : "white bg-l-red"}`} onClick={handleDeney}>Deney</button>
            </div>
        </div >
    )
    return (
        <div className={`detailed-view-container ${theme ? "bg-white dark" : "bg-dark white"}`}>
            <NavBar />

            {loading ? loadingView() : renderData()}

        </div>
    )
}

export default DetailedBorrowView