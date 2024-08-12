import React from 'react'
import {useState} from "react";

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev){
    ev.preventDefault();
    console.log('Register function triggered'); // Add this line
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
    })
    console.log('Response status:', response.status); // Add this line
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }

  return (
<form className="register mx-auto max-w-sm" onSubmit={register}>
  <h1 className="text-center text-4xl font-bold">Register</h1>

  <input 
  type="text" 
  className="block mb-1 w-full p-2 border-2 border-gray-300 rounded bg-white mt-6" 
  placeholder="Username"
  value={username}
  onChange={ev => setUsername(ev.target.value)} />
  
  <input 
  type="password" 
  className="block mb-1 w-full p-2 border-2 border-gray-300 rounded bg-white" 
  placeholder="Password" 
  value={password}
  onChange={ev => setPassword(ev.target.value)}/>

  <button className="cursor-pointer w-full block bg-gray-700 border-0 text-white rounded p-2">Register</button>
</form>

  )
}

export default RegisterPage