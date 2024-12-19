import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { useSelector } from "react-redux"
import axios from "axios"
import ClipLoader from 'react-spinners/ClipLoader'
import NavBar from '../NavBar'
import "./index.css"
const EachBook = () => {
    const [book, setBook] = useState('')
    const [loading, setLoader] = useState(false)
    const [borrowData, setBoroowData] = useState({ start_date: '', end_date: '' })
    const { id } = useParams()
    const jwtToken = Cookies.get("jwtToken")
    const theme = useSelector((state) => state.theme)
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:5000/api/book-request/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        setBook(response.data.result)
        // console.log(response)
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
        <form onSubmit={handleForm} className='each-book-form-container'>
            <h1>Barrow Request</h1>
            <br />
            <div className={`each-book-div-container ${theme ? "white" : "dark"}`}>
                <div className='book-info-container'>
                    {book && <>
                        <p className={`${theme ? "white" : "l-dark"}`}><span className={`${theme ? "l-white" : "dark"}`}>Book Name:</span> {book.title}</p>
                        <p className={`${theme ? "white" : "l-dark"}`}><span className={`${theme ? "l-white" : "dark"}`}>Author:</span> {book.author}</p>
                        <p className={`${theme ? "white" : "l-dark"}`}><span className={`${theme ? "l-white" : "dark"}`}>Quantity:</span> {book.quantity}</p>
                    </>}
                </div>
                <div className='borrow-date-input-container'>
                    <label>Start Date</label>
                    <input type="date" name="start_date" onChange={handleInput} required />
                    <span>to</span>
                    <label>End Date</label>
                    <input type="date" name="end_date" onChange={handleInput} required />
                </div>

            </div>
            <button type="submit" className={`request-btn ${theme ? "bg-white dark" : "bg-dark white"}`}>Request</button>
        </form>
    )
    const handleInput = (e) => {
        const { name, value } = e.target
        setBoroowData((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleForm = async (e) => {
        e.preventDefault()
        const jwtToken = Cookies.get("jwtToken")
        try {
            const response = await axios.post(`http://localhost:5000/api/borrow_request/${id}`, borrowData, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            })
            if (response.status === 200) {
                alert(response.data.message)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 405) {
                    alert(error.response.data.message)
                } else if (error.response.status === 401) {
                    alert(error.response.data.message)
                } else if (error.response.status === 404) {
                    alert(error.response.data.message)
                }
            } else if (error.request) {
                // Request was made but no response received
                alert("No response from server. Please try again later.");
            } else {
                // Something went wrong in setting up the request
                alert("An unexpected error occurred.");
            }

        }
    }
    return (
        <div className={`each-book-container ${theme ? "bg-l-dark white" : "bg-white dark"}`}>
            <NavBar />
            <div className='each-book-bg-container'>
                {loading ? loadingView() : renderData()}
            </div>
        </div>
    )
}

export default EachBook