import React, { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const headers = {
        Authorization: 'JWT Mft26100##', // Add your token here
      };
  
      const response = await axios.post('http://localhost:3030/users/login',{ email, password },{ headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input type="email" 
                id="email" required 
                className="w-full px-3 py-2 border rounded text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1">Password</label>
        <input  type="password"  
                id="password"  
                required
                className="w-full px-3 py-2 border rounded text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  
                value={password}  
                onChange={(e) => setPassword(e.target.value)}
            />
      </div>
      <div className="flex justify-center">
        <button className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
            onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
