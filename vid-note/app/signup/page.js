"use client";
import Image from "next/image";
import Head from "next/head";
import React, { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    // Signup Form Submission
    document
      .getElementById("signupForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        var username = document.getElementById("signupUsername").value;
        var password = document.getElementById("signupPassword").value;

        fetch("http://localhost:8000/register", {
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
              alert("Registration successful! Please log in.");
              window.location.href = "/login";
            } else {
              alert("Registration failed: " + data.message);
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
        <a href="/" className="hover:bg-indigo-50 p-2 rounded-md ease-in-out duration-300">
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
      <h1 className="text-3xl md:text-4xl lg:text-3xl mb-3 xl:text-6xl font-bold text-indigo-500 mb-8 tracking-wide leading-tight text-center">
        Sign Up
      </h1>
      <div className="w-[40%] text-xl bg-violet-200 backdrop-blur rounded-lg p-8">
        {/* Your signup form */}
        <form id="signupForm">
          <input
            type="text"
            id="signupUsername"
            placeholder="Username"
            required
            className="px-4 py-2 rounded-md w-full bg-indigo-50"
          />
          <br />
          <input
            type="password"
            id="signupPassword"
            placeholder="Password"
            className="px-4 py-2 my-3 rounded-md w-full bg-indigo-50"
            required
          />
          <br />
          <button
            type="submit"
            className="w-full mt-3 hover:cursor-pointer rounded-md bg-indigo-600 p-2 px-4 text-lg font-medium text-white ease-in-out duration-300 hover:bg-indigo-500 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
