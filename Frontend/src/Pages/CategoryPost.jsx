import React, { useState,useEffect } from 'react'
import BlogPostItem from "../Componenets/BlogPostItem"
import { Dumy_Posts } from '../data'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const {category}=useParams()
  useEffect(()=>{
    const fetchPosts= async()=>{
     setIsLoading(true);
     try {
      const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
      setPosts(res?.data)
     } catch (error) {
      console.log(error)
     }
     setIsLoading(false)
    }
    fetchPosts();
  },[category])

  return (
    <div>
      {posts.length > 0 ? (
        <div className="cards flex">
          {posts.map(({_id: id, thumbnail, category, title, description, creator,createdAt }) => (
            <BlogPostItem
              key={id}
              postId={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              creator={creator}
              createdAt={createdAt}
            />
          ))}
        </div>
      ) : (
        <h2>No posts found</h2>
      )}
    </div>
  );
};

export default CategoryPost
