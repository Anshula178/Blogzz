import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import DeletePost from './DeletePost';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [id]);

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      {posts.length ? (
        <div className="container mx-auto">
          {posts.map((post) => (
            <article key={post.id} className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 mr-4">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt={post.title} className="w-full h-full object-cover rounded-full" style={{ borderRadius: '45%' }} />

                </div>
                <h5 className="text-lg font-semibold">{post.title}</h5>
              </div>
              <div className="flex space-x-4">
                <Link to={`/posts/${post._id}`} className="text-white px-4 py-2 rounded bg-blue-700 hover:bg-blue-800">View</Link>
                <Link to={`/posts/${post._id}/edit`} className="text-white px-4 py-2 rounded bg-green-700 hover:bg-green-800">Edit</Link>
                <DeletePost postId={post._id}/>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="text-2xl font-semibold text-center text-gray-600">You have no posts yet</h2>
      )}
    </section>
  );
};

export default Dashboard;
