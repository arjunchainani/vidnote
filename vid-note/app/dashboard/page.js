"use client";
import Image from "next/image";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState();
  useEffect(() => {
    const token = localStorage.getItem("loginTokenVidNote");
    if (!token) return window.location.replace("/login");
    fetch("http://localhost:8000/get/notes", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        jwt_token: token,
      },
    }).then((response) => {
      response.json().then((data) => {
        setNotes(data.message)
      })
    });
  });
  return (
    <main
      className={
        "w-full min-h-screen flex items-center bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 background-animate font-sans flex min-h-screen flex-col items-center p-10"
      }
    >
      <nav className="z-20 absolute w-screen px-40 py-4 top-0 left-0 flex justify-between items-center">
        <a href="/">
          <p className="text-3xl font-medium text-indigo-500">VidNote</p>
        </a>
        <ul className="list-none flex text-xl items-center">
          <a href="/login">
            <li className="mx-4 text-white font-medium">Login</li>
          </a>
          <a href="/signup">
            <li className="hover:cursor-pointer rounded-md bg-indigo-600 p-2 px-4 text-lg font-medium text-white ease-in-out duration-300 hover:bg-indigo-500 transform hover:scale-105">
              Sign Up
            </li>
          </a>
        </ul>
      </nav>
      <div className="w-full px-40 mt-12">
        <h1 className="text-4xl font-medium">Notes</h1>
        <div className="w-full"></div>
      </div>
    </main>
  );
}
