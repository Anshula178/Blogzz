import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Explore Our Categories</h2>
          <p className="text-slate-600 text-lg mb-8">
            Discover posts across various categories tailored to your interests.
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-6">
          {[
            'Agriculture',
            'Business',
            'Education',
            'Entertainment',
            'Art',
            'Investment',
            'Uncategorized',
            'Weather'
          ].map((category) => (
            <li key={category} className="flex-none">
              <Link
                to={`posts/categories/${category}`}
                className="block bg-white text-slate-700   px-6 py-4 rounded-lg text-sm font-medium  hover:shadow-lg transition-transform transform hover:scale-105"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CategoryList;
