"use client";
import Image from "next/image";
import Head from "next/head";
import React, { useEffect } from "react";

export default function Login() {

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

        </main>
    );
}