
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import { Link } from "react-router-dom";

function Header() {

  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include', 
    }).then(response => {
      response.json().then(userInfo => {
        console.log('Profile data received:', userInfo); // Log userInfo
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username

  return (
    <header className="flex justify-between mt-5 mb-12 items-center">
        
      <Link to="/" className="font-bold text-2xl">MyBlog</Link>
      <nav className="flex gap-6">
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="no-underline">Login</Link>
            <Link to="/register" className="no-underline">Register</Link>
          </>
        )}
        
      </nav>
    </header>
  );
}

export default Header;
