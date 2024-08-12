import React, { useState, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      const userInfo = await response.json(); // Parse the JSON data
      console.log('Login successful:', userInfo); // Log userInfo instead of result
      setUserInfo(userInfo);
      setRedirect(true);
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    console.log("Redirecting...");
    return <Navigate to={'/'} />
  }

  return (
    <form className="login mx-auto max-w-sm" onSubmit={login}>
      <h1 className="text-center text-4xl font-bold">Login</h1>
      <input
        type="text"
        className="block mb-1 w-full p-2 border-2 border-gray-300 rounded bg-white mt-6"
        placeholder="Username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />
      <input
        type="password"
        className="block mb-1 w-full p-2 border-2 border-gray-300 rounded bg-white"
        placeholder="Password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button className="cursor-pointer w-full block bg-gray-700 border-0 text-white rounded p-2">
        Login
      </button>
    </form>
  );
}
