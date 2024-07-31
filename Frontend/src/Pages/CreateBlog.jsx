import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
   const [error,setError]=useState('')
     const {currentUser}=useContext(UserContext)
     const token=currentUser?.token;
     const naviagte=useNavigate()
     useEffect(()=>{
        if(!token){
      naviagte('/login')
        }
     },[])
    const POST_CATEGORIES = [
        "Agriculture", "Business", "Education", "Entertainment", 
        "Art", "Investment", "Uncategorized", "Weather"
    ];
    const createPost=async(e)=>{
            e.preventDefault();
            const postData=new FormData();
            postData.set('title',title)
            postData.set('category',category)
            postData.set('description',description)
            postData.set('thumbnail',thumbnail)
            try {
                const res=await  axios.post(`${process.env.REACT_APP_BASE_URL}/posts`,postData,{headers:{Authorization:`Bearer ${token}`}})
                
                    return naviagte('/')
                    
         
               
            } catch (error) {
                setError(error.response?.data?.message)
            }
    }

    return (
        <section className="max-w-2xl mt-8 mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold mb-2 text-slate-800">Create Post</h2>
               
            </div>
            {error&&<p>{error}</p>}
            <form className="space-y-6" onSubmit={createPost}>
                <div>
                    
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    
                    <select 
                        name="category" 
                        value={category} 
                        onChange={e => setCategory(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {POST_CATEGORIES.map(item => <option key={item}>{item}</option>)}
                    </select>
                </div>
                <div>
                    
                    <textarea 
                        name="description" 
                        id="description" 
                        cols="10" 
                        rows="4" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                    ></textarea>
                </div>
                <div>
                    
                    <input 
                        type="file" 
                        onChange={e => setThumbnail(e.target.files[0])} 
                        accept="image/png, image/jpg, image/jpeg" 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-md hover:bg-slate-200 hover:border border-slate-200 hover:text-slate-800">
                        Create Blog
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CreateBlog;
