import React, { useEffect, useState } from 'react';
import Avatar1 from "../Assests/avatar1.jpg";
import Avatar2 from "../Assests/avatar2.jpg";
import Avatar3 from "../Assests/avatar3.jpg";
import Avatar4 from "../Assests/avatar10.jpg";
import Avatar5 from "../Assests/avatar11.jpg";
import { Link } from 'react-router-dom';
import axios from 'axios';


const Authors = () => {
  const [authors, setAuthors] = useState([]);
 useEffect(()=>{
  const getAuthors=async()=>{
    try {
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
    setAuthors(res.data)
    console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  getAuthors();
 },[])

  return (
    <section className="p-6">
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map(({ _id, avatar, name, posts }) => (
            <Link
              key={_id}
              to={`/posts/users/${_id}`}
              className="flex flex-col items-center p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="w-24 h-24 mb-4">
                <img
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold">{name}</h4>
                <p className="text-sm text-gray-500">{posts} Posts</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="text-xl text-center text-gray-700">No Authors Found</h2>
      )}
    </section>
  );
};

export default Authors;
