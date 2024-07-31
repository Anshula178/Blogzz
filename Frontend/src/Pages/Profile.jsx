import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const userId = currentUser?.userId;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    const getUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUser();
  }, [token, userId]);

  const changeAvatarHandle = async () => {
    if (!avatar) return;

    try {
      const postData = new FormData();
      postData.append('avatar', avatar);

      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 200) {
        setAvatar(res.data.avatar);
      } else {
        throw new Error('Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error changing avatar:', error);
      setError('Failed to update avatar');
    }
  };

  const updateDetails = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      // First, change the avatar if needed
      if (avatar) {
        await changeAvatarHandle();
      }

      // Then update other details
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currentPassword', currentPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);

      const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        navigate('/logout');
      }
    } catch (error) {
      console.error('Error updating user details:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };
  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        alert('Account deleted successfully');
        navigate('/logout'); // Redirect to logout or home page after account deletion
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Error deleting account');
    }
  };

  return (
    <section className="p-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <Link to={`/myposts/${userId}`} className="text-slate-600 hover:underline">
              My Posts
            </Link>
            <button 
              onClick={deleteAccount} 
              className="text-red-600   px-2 py-2 rounded hover:bg-red-700 hover:text-white transition duration-200"
            >
              Delete  Account
            </button>
          </div>
          <div className="profile_details mt-6">
            <div className="avatar_wrapper flex flex-col items-center">
              <div className="profile_avatar w-24 h-24 mb-4">
                <img
                  src={avatar ? `${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}` : 'default-avatar.png'}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="relative mb-4">
                <input
                  type="file"
                  name="avatar"
                  className="hidden"
                  id="avatar"
                  onChange={e => setAvatar(e.target.files[0])}
                />
                <label htmlFor="avatar" className="cursor-pointer text-slate-900 hover:underline">
                  <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                  Change Avatar
                </label>
              </div>

              <form className="w-full flex flex-col items-center" onSubmit={updateDetails}>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4 w-full">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4 w-full">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4 w-full">
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current Password"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4 w-full">
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4 w-full">
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition duration-200">
                  Update my details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
