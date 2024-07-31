import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../Componenets/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import DeletePost from './DeletePost';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(res.data);
        console.log(res.data)
        setCreatorId(res.data.creator);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    getPost();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen mt-9 bg-gray-100">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {post && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <div className="flex justify-between items-center mb-4">
            {creatorId && <PostAuthor creator={creatorId} createdAt={post.createdAt} />}
            {currentUser?.userId === post?.creator && (
              <div>
                <Link to={`/posts/${post._id}/edit`} className="bg-blue-500 text-white px-3 py-2 mr-2 rounded hover:bg-blue-600 transition duration-200">
                  Edit
                </Link>
               <DeletePost postId={id}/>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.category}</p>
          <div className="mb-4">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="Post Thumbnail" className="w-full h-64 rounded object-cover" />
          </div>
          <div className="prose max-w-none">
            <p>{post.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
