"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import React from 'react'

export default function profile() {
  const [user, setUser] = useState({});

  let router = useRouter();

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      let response = await axios.get("/api/users/logout");
      console.log(response.data.message);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };


  React.useEffect(()=>{
    const handleGetDetails = async () => {
        let response = await axios.get("/api/users/me");
        setUser(response.data.user);
      };
      handleGetDetails();
  },[]);
  return (
    <>
      <div className="div-main-profile-container flex flex-col justify-center items-center gap-y-10">
        <h1>Profile</h1>
        <hr />
        <p>this is a logout section</p>
        <button
          className="text-black bg-orange-500 font-semibold text-xl p-5 rounded"
          onClick={handleLogout}
        >
          Logout User
        </button>
      </div>

      <div className="div-visit mt-10">
        <Link href={`/profile/${user._id}`}>
          <button className="text-black bg-orange-500 font-semibold text-xl p-5 rounded">
            Visit the profile
          </button>
        </Link>
      </div>
    </>
  );
}
