import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BlogPostItem from '../Componenets/BlogPostItem'; // Adjust the path as needed
import Banner from './Banner'; // Adjust the path as needed

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        const sortedPosts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setLatestPost(sortedPosts[0]); // Set the latest post
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton height={200} width={`100%`} />
      ) : (
        latestPost && (
          <Banner
            bannerImage={`${process.env.REACT_APP_ASSETS_URL}/uploads/${latestPost.thumbnail}`}
            bannerTitle={latestPost.title}
            bannerDescription={latestPost.description}
            createdAt={latestPost.createdAt}
            postId={latestPost._id}
          />
        )
      )}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-4 border rounded-md shadow">
                <Skeleton height={200} />
                <Skeleton height={30} style={{ marginTop: 10 }} />
                <Skeleton count={3} />
              </div>
            ))}
          </div>
        ) : (
          posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
            <h2 className="text-center text-lg text-gray-600 mt-8">No posts found</h2>
          )
        )}
      </div>
    </>
  );
};

export default BlogPosts;
