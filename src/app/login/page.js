"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    // Add login logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="flex flex-col justify-center items-center w-[90%] max-w-md p-10 bg-gray-800 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 tracking-wide text-gray-100">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Please login to your account. Don’t have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500 underline hover:text-blue-400">
              Sign up here
            </span>
          </Link>
        </p>
        <form
          onSubmit={onLogin}
          className="w-full flex flex-col gap-y-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              required
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              required
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-gray-100 font-medium text-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-8 text-sm text-gray-500">
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
}
