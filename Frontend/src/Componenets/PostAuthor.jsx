import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ creator, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${creator}`);
        setAuthor(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAuthor();
  }, [creator]);

  const imageUrl = `${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`;
  
  return (
    <Link to={`/posts/users/${creator}`} className="flex items-center space-x-4 p-4 bg-white rounded-lg ">
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <img src={imageUrl} alt={author?.name} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col">
        <h6 className="text-lg font-semibold">{author?.name}</h6>
        <small className="text-gray-500"><ReactTimeAgo date={new Date(createdAt)} locale="en-US" /></small>
      </div>
    </Link>
  );
};

export default PostAuthor;
