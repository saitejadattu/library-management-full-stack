import React from 'react'
import "./index.css"
import { useSelector } from 'react-redux'
import NavBar from '../NavBar'
const About = () => {
    const theme = useSelector((state)=>state.theme)
    return (
        <div className={`${theme? "bg-l-dark white": "bg-white l-dark"}`}>
            <NavBar/>
            <div className='about-container-alignment'>
            <div className='about-div-container'>
                <h1 className="about-heading">About Our Web App</h1>
                <p>Welcome to library Management System, a streamlined library management platform designed to enhance the interaction between librarians and users while maintaining an efficient record of library activities.</p>
                <h1>For Users</h1>
                <p>
                    Users can explore the library's collection and view the availability of books in real time. With a simple and user-friendly interface, they can.
                    <br />
                    <ul>
                        <li>Browse and search for books available in the library.</li>
                        <li> Request a book for borrowing by selecting the desired date range.</li>
                        <li>Submit a return when the borrowing period ends.</li>
                        <li>View their borrowing history to keep track of past transactions.</li>
                    </ul>
                    To ensure fair usage, each user is allowed to make a single request per book, preventing duplicate requests.
                </p>
                <h1>For Librarians</h1>
                <p>Librarians are empowered with a robust set of tools to manage user requests and maintain the library’s operations. Key features include:</p>
                <li>Viewing and managing book borrowing requests from users.</li>
                <li>Approving or rejecting requests based on availability and other criteria.</li>
                <li>Tracking book returns and updating the library’s inventory in real time.</li>
                <li>Accessing user borrowing histories to maintain detailed records.</li>
                <p>Our platform bridges the gap between librarians and users by simplifying workflows, ensuring accountability, and delivering a seamless library management experience.</p>
            </div>
            </div>
        </div>
    )
}

export default About