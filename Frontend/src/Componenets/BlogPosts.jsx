import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPostItem from '../Componenets/BlogPostItem'; // Adjust the path as needed
import Banner from './Banner'; // Adjust the path as needed

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        const sortedPosts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setLatestPost(sortedPosts[0]); // Set the latest post
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {latestPost && (
        <Banner
          bannerImage={`${process.env.REACT_APP_ASSETS_URL}/uploads/${latestPost.thumbnail}`}
          bannerTitle={latestPost.title}
          bannerDescription={latestPost.description}
          createdAt={latestPost.createdAt}
          postId={latestPost._id}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt }) => (
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
          <h2 className='text-4xl text-slate-800 text-center font-bold '>No posts found</h2>
        )}
      </div>
    </>
  );
};

export default BlogPosts;
