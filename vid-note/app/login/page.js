"use client";
import Image from "next/image";
import Head from "next/head";
import React, { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    // Login Form Submission
    document
      .getElementById("loginForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        var username = document.getElementById("loginUsername").value;
        var password = document.getElementById("loginPassword").value;

        fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data.ok) {
              localStorage.setItem("loginTokenVidNote", data.message)
              window.location.replace("/dashboard")
            } else {
              alert("Login failed: " + data.message);
            }
          })
          .catch(function (error) {
            console.error("Error:", error);
          });
      });
  }, []);

  return (
    <main
      className={
        "w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 background-animate font-sans flex min-h-screen flex-col items-center p-10"
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
      <h1 className="text-3xl md:text-4xl lg:text-3xl mb-8 xl:text-6xl font-bold text-indigo-500 tracking-wide leading-tight text-center">
        Login
      </h1>
      <div className="w-[40%] text-xl bg-violet-200 backdrop-blur rounded-lg p-8">
        {/* Your login form */}
        <form id="loginForm">
          <input
            type="text"
            id="loginUsername"
            placeholder="Username"
            required
            className="px-4 py-2 rounded-md w-full"
          />
          <br />
          <input
            type="password"
            id="loginPassword"
            placeholder="Password"
            className="px-4 py-2 my-3 rounded-md w-full"
            required
          />
          <br />
          <button
            type="submit"
            className="w-full mt-3 hover:cursor-pointer rounded-md bg-indigo-600 p-2 px-4 text-lg font-medium text-white ease-in-out duration-300 hover:bg-indigo-500 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
