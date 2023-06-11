import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Subscribe = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['auth']);
  const [Err,SetErr]=useState('');
  const handleSubscribe = async () => {
    try {
      const headers = {
        Authorization: 'JWT Mft26100##', // Add your token here
      };
      const response = await axios.post('http://localhost:3030/users/sub',
      { fullName,  role: '643a921fb216b77828e9cd39',  email,  password},{ headers })
      .then((user)=>{
        console.log(user.data.accessToken)
        setCookie("auth",user.data.accessToken)
        navigate("/")
      })
    } catch (error) {
      console.error(error);
      SetErr('Subscribe Incorrect');
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Subscribe</h1>
      <div className="mb-4">
        <label htmlFor="fullName" className="block font-medium mb-1">
          Full Name {fullName=="" && <span className="text-red-600">*</span>}
        </label>
        <input
          type="text"
          id="fullName"
          className="w-full px-3 py-2 border rounded text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">
          Email {email=="" && <span className="text-red-600">*</span>}
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1 ">
          Password {password=="" && <span className="text-red-600">*</span>}
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
      {Err && <div className="text-slate-50 bg-red-600 text-center my-2 py-3 rounded-lg">{Err}</div>}
    </div>
  );
};
export default Subscribe;
