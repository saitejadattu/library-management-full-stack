import React,{useState, useEffect} from 'react'
import axios from "axios" 
import Cookies from "js-cookie"
const Users = () => {
    const [userList, setUserList] = useState([])
    const jwtToken = Cookies.get("jwtToken")
    const fetchData =async () =>{
        const response = await axios.get("http://localhost:5000/api/")
        console.log(response)
    }

    useEffect(()=>{
        fetchData()
    },[])   
  return (
    <div>Users</div>
  )
}

export default Users