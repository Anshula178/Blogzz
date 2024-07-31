import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Perform the logout logic and update the state
    setCurrentUser(null);
    // Redirect to the login page after logout
    navigate('/login');
  }, [setCurrentUser, navigate]);

  return null; // or you can render a loader or some message while processing logout
};

export default Logout;
