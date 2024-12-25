"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { RiLoader2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    userName: "",
    email: "",
    password: "",
  });

  const [Loading, setLoading] = React.useState(false);

  const onSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

   try {
    setLoading(true);
    let response = await axios.post('/api/users/signup',user);
    console.log('Signup Response : ',response.data);
    setLoading(false);
    router.push('/login');
    
   } catch (error) {
    console.log(error.message);
    setLoading(false);
   }
   finally{
    setLoading(false);
   }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = React.useState("show");

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => (prev === "show" ? "hide" : "show"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="flex flex-col justify-center items-center w-[90%] max-w-lg p-10 bg-gray-800 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 tracking-wide text-gray-100">
          Create an Account
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Join us and enjoy exclusive features. Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 underline hover:text-blue-400">
              Login here
            </span>
          </Link>
        </p>
        <form onSubmit={onSignup} className="w-full flex flex-col gap-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="userName"
              className="text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={user.userName}
              required
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
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
              type={showPassword === "show" ? "password" : "text"}
              name="password"
              id="password"
              value={user.password}
              required
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              onClick={handleShowPassword}
              className="p-2 bg-yellow-400 mt-2 rounded-xl text-black"
            >
              {showPassword}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-gray-100 font-medium text-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all flex justify-center items-center"
          >
            {Loading ? <RiLoader2Line className="animate-spin" /> : "Sign Up"}
          </button>
        </form>
        <p className="mt-8 text-sm text-gray-500">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy/policy" className="text-blue-400 hover:text-blue-300 underline">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
}
