import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Componenets/Layout';
import ErrorPage from './Pages/ErrorPage';
import Home from './Pages/Home'
import PostDetail from './Pages/PostDetail';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import CreateBlog from './Pages/CreateBlog';
import { FaCreativeCommonsNd } from 'react-icons/fa6';
import Authors from './Pages/Authors';
import EditPost from './Pages/EditPost';
import Dashboard from './Pages/Dashboard';
import Logout from './Pages/Logout';
import CategoryPost from './Pages/CategoryPost';
import AuhtorsPost from './Pages/AuthorsPosts';
import DeletePost from './Pages/DeletePost';
import UserProvider from './context/userContext';
 const router = createBrowserRouter([
  {
    path:"/",
    element:<UserProvider><Layout/></UserProvider>,
    errorElement:<ErrorPage/>,
    children:[
    {index:true,element:<Home/>},
    {path:"posts/:id",element:<PostDetail/>},
    {path:"register",element:<Register/>},
    {path:"login",element:<Login/>},
    {path:"profile/:id",element:<Profile/>},
    {path:"createblog",element:<CreateBlog/>},
    {path:"posts/:id/edit",element:<EditPost/>},
    {path:"posts/users/:id",element:<AuhtorsPost/>},
    {path:"authors",element:<Authors/>},
    {path:"myposts/:id",element:<Dashboard/>},
    {path:"logout",element:<Logout/>},
    {path:"posts/categories/:category",element:<CategoryPost/>},
    {path:"posts/:id/delete",element:<DeletePost/>},
    ]
  }
 ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

