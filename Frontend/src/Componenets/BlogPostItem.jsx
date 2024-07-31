import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const BlogPostItem = ({ postId, category, title, description, creator, thumbnail, createdAt }) => {
  
  const shortDescription = description.length > 145 ? description.substr(0, 145) + "..." : description;
  // const postTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;

  return (
    <div className='container mx-auto px-4'>
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 mx-auto">
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <img
          className="w-full h-full object-cover"
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt={title}
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-3">
          <Link to={`/posts/${postId}`}>
            <h2 className="font-bold text-lg md:text-xl">{title}</h2>
          </Link>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-700 text-sm md:text-base mb-4">
          {shortDescription}
        </p>
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
          <PostAuthor creator={creator} createdAt={createdAt} />
          <Link
            to={`/posts/categories/${category}`}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm md:text-base bg-blue-100 rounded px-2 py-1 mt-2 md:mt-0"
          >
            {category}
          </Link>
        </div> */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <PostAuthor creator={creator} createdAt={createdAt} />
          </div>
          <div className="flex justify-between items-center mt-2">
            <Link
              to={`/posts/categories/${category}`}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm bg-blue-100 rounded px-2 py-1"
            >
              {category}
            </Link>
            <Link to={`/posts/${postId}`} className="text-blue-900 hover:text-blue-800 transition-colors duration-300 text-xl">
              <span>&rarr;</span>
            </Link>
          </div>
      </div>
    </div>
    </div>
  );
};

export default BlogPostItem;
