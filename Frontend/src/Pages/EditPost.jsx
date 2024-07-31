import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('UnCategorized');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [error, setError] = useState('');
    const POST_CATEGORIES = [
        "Agriculture", "Business", "Education", "Entertainment", 
        "Art", "Investment", "Uncategorized", "Weather"
    ];
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setCategory(res.data.category); // Ensure you set category if it's needed
            } catch (error) {
                console.log(error);
            }
        };
        getPost();
    }, [id, token]);

    const editPost = async (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('title', title);
        postData.append('category', category);
        postData.append('description', description);
        if (thumbnail) {
            postData.append('thumbnail', thumbnail);
        }

        try {
            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <section className="max-w-2xl mt-8 mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold mb-2 text-blue-500">Edit Post</h2>
            </div>
            {error && <p>{error}</p>}
            <form className="space-y-6" onSubmit={editPost}>
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
                        {POST_CATEGORIES.map(item => <option key={item} value={item}>{item}</option>)}
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
                    <button type="submit" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        Edit Blog
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditPost;
