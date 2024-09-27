import React, { useState } from 'react';
import logo from '../../../public/olx-logo.png';
import {signup} from '../../Firebase/firebase'
import { Link, useNavigate } from 'react-router-dom';
import { useLoading } from '../../Context/loadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Signup: React.FC = () => {

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();
  const loading = useLoading();

  //signup new user
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    loading?.setLoading(true)
    e.preventDefault();
    try {
      const res = await signup(username,email,password,Number(phone))
      if(res){
        navigate('/login')
        loading?.setLoading(false)
      }
    } catch (error) {
      console.log(error)
      navigate('/signup');
    }
  }

  return (
    loading?.loading ? <LoadingSpinner /> :
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mt-5 pt-0 bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img width="200px" height="200px" src={logo} alt="OLX Logo" />
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="username"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-[#002f34] text-white font-bold py-2 rounded hover:bg-white hover:text-[#002f34] hover:border-2 hover:border-[#002f34] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Signup
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/login" className="text-[#002f34] hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
