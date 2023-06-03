"use client";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import YouTube from "react-youtube";
import React, { useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showFrame, setShowFrame] = useState(false);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  function validateFormWithJS() {
    const youtube = document.querySelector("#youtube").value;
    if (!youtube) {
      alert("Please enter a valid link.");
      return false;
    } else if (youtube) {
      if (!youtube.includes("youtube.com") && !youtube.includes("youtu.be")) {
        alert("Please enter a valid youtube link.");
        return false;
      }
    }
    setShowFrame(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    validateFormWithJS();
    // const response = await fetch("http://localhost:8000/convert", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     video_url: youtubeUrl,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // });
    // const json_response = await response.json();
    // console.log(json_response)
  }

  return (
    <main className="flex items-center justify-center bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 background-animate font-sans flex min-h-screen flex-col items-center p-10">
      <Head>
        <title>Vid Node</title>
      </Head>
      <nav className="z-20 absolute w-screen px-40 py-4 top-0 left-0 flex justify-between items-center">
        <p className="text-3xl font-medium text-indigo-500">VidNote</p>
        <ul className="list-none flex text-xl items-center">
          <li className="mx-4 text-white font-medium">Login</li>
          <li className="rounded-md bg-indigo-600 ease-in-out duration-300 hover:bg-indigo-500 py-2 px-4 text-lg font-medium text-white mx-4">
            Sign Up
          </li>
        </ul>
      </nav>
      <div className="z-10 mt-10 w-full max-w-5xl font-sans text-sm flex">
        <div className="flex flex-col items-center justify-center w-full p-6 rounded-lg shadow-[35px_35px_35pxpx_35px_rgba(0,0,0,0.3)] shadow-indigo-700">
          {/* <button className="rounded-md bg-indigo-600 p-2 px-4 text-lg font-bold text-white">
            Login
          </button> */}
          <h1 className="text-3xl md:text-4xl lg:text-3xl xl:text-6xl font-bold text-indigo-500 tracking-wide leading-tight text-center">
            Notes Transcripter
          </h1>
          <p className="mt-3 text-gray-500 text-2xl">Login to <span className="text-indigo-500 font-medium">save</span> your transcriptions for <span className="text-indigo-500 font-medium">FREE</span>.</p>
          {/* <button className="rounded-md bg-indigo-600 p-2 px-4 text-lg font-bold text-white">
            Sign Up
          </button> */}
        </div>
      </div>
      <div className="w-full max-w-5xl items-center justify-between font-sans text-sm pt-7 lg:flex">
        <div className="flex w-full bg-violet-200 p-6 rounded-lg">
          <form method="post" className="w-full">
            <label
              htmlFor="youtube"
              className="text-indigo-500 text-xl font-medium"
            >
              Enter Video Link
            </label>
            <div className="flex bg-violet-300 p-3 rounded-lg mb-6">
              <input
                onChange={(e) => setYoutubeUrl(e.target.value)}
                type="text"
                id="youtube"
                className="block bg-violet-50 w-full rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mr-2 text-2xl font-medium"
                placeholder="Enter Video Link"
              />
              <button
                onClick={handleSubmit}
                id="buttonSubmit"
                className="rounded-md bg-indigo-600 p-2 px-4 text-lg font-medium text-white ease-in-out duration-300 hover:bg-indigo-500"
              >
                Submit
              </button>
            </div>
            <label
              htmlFor="youtube"
              className="text-indigo-500 text-xl font-medium"
            >
              Youtube Video
            </label>
            <div className="flex w-full bg-violet-300 p-3 rounded-lg">
              {showFrame && (
                <iframe
                  width="100%"
                  height="490"
                  src={youtubeUrl.replace("watch?v=", "embed/")}
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              )}
            </div>
          </form>
        </div>        
      </div>
      <div className="py-10">
        <p className="mt-4 text-white font-medium text-xl text-center">Made with ❤️ by VidNote Devs</p>
      </div>

    </main>
  );
}
// const buttons = document.getElementById("buttonSubmit");
