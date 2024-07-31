
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
const DeletePost = ({postId: id}) => {
  const location=useLocation()
  const {currentUser}=useContext(UserContext)
     const token=currentUser?.token;
     const naviagte=useNavigate()
     useEffect(()=>{
        if(!token){
      naviagte('/login')
        }
     },[])
     const removePost=async()=>{
      try {
        const res= await  axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        if(res.status==200){
          if(location.pathname==`/myposts/${currentUser.id}`){
            naviagte(0)
          }
          else{
            naviagte('/')
          }
        }
      } catch (error) {
        
      }
     }
  return (
    <>
       <Link  onClick={()=>removePost(id)} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-200">
                  Delete
        </Link>
    </>
  )
}

export default DeletePost
