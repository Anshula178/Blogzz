import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor'; // Adjust the path as needed
import CategoryList from './CategoryList';

const Banner = ({ postId, bannerImage, bannerTitle, bannerDescription, createdAt }) => {
  // Ensure createdAt is a valid date
  const formattedDate = new Date(createdAt).toLocaleDateString();

  // Shorten the description if it exceeds a certain length
  const shortDescription = bannerDescription.length > 100 ? bannerDescription.substr(0, 100) + "..." : bannerDescription;

  return (
    <>
      <div className='bg-white'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl">
            {/* Background Image */}
            <img
              src={bannerImage}
              alt="Banner background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Clickable Link Container */}
            <Link to={`/posts/${postId}`} className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-4 rounded-lg max-w-sm text-left">
              <div>
                {/* Title */}
                <h1 className="text-slate-800 text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                  {bannerTitle}
                </h1>
                <p className="text-slate-600 text-sm md:text-base mt-2">
                  {shortDescription}
                </p>
                <div className="mt-2 text-slate-600 text-xs md:text-sm">
                  {formattedDate}
                </div>
              </div>
            </Link>
          </div>
        </div>
        <CategoryList />
      </div>
    </>
  );
};

export default Banner;
