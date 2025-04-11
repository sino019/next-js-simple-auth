"use client"
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'

const login = () => {

    const [email,setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const resData = await signIn("credentials",{
            redirect:false,
            email,
            password,
        });
        console.log(resData);
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Login Page</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input type="text" id="email" name="email"  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={email} onChange={({ target }) => setEmail(target.value)} />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <input type="password" id="password" name="password"  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
        </form>

    </div>

  )
}

export default login
