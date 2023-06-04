"use client";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import React, { useState } from "react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [showFrame, setShowFrame] = useState(false);
  const [toggle, setToggle] = useState("youtube");
  const [text, setText] = useState();
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  function validateYoutubeFormWithJS() {
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

  async function handleYoutubeSubmit(e) {
    e.preventDefault();
    validateYoutubeFormWithJS();
    const response = await fetch("http://localhost:8000/transcribe", {
      method: "POST",
      body: JSON.stringify({
        video_url: url,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json_response = await response.json();
    setText(json_response.message);
  }

  async function handleUploadSubmit(e) {
    e.preventDefault();
    validateUploadFormWithJS();
    const upload = document.querySelector("#upload").files[0];
    getBase64(upload);
  }

  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  function validateUploadFormWithJS() {
    const upload = document.querySelector("#upload").value;
    if (!upload) {
      alert("Please upload a valid video.");
      return false;
    } else if (upload) {
      const filetype = upload.split(".").pop();
      console.log(filetype);
      if (!filetype === "mov" && !filetype === "mp4") {
        alert("Your file type should be MOV or MP4");
        return false;
      }
    }
    setShowFrame(true);
  }

  return (
    <main
      className={
        toggle === "upload"
          ? "w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 background-animate font-sans flex min-h-screen flex-col items-center p-10"
          : "w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 via-pink-100 to-rose-100 background-animate font-sans flex min-h-screen flex-col items-center p-10"
      }
    >
      <Head>
        <title>Vid Note</title>
      </Head>
      <nav className="z-20 absolute w-screen px-40 py-4 top-0 left-0 flex justify-between items-center">
        <a
          href="/"
          className={
            toggle === "upload"
              ? "hover:bg-indigo-50 p-2 rounded-md ease-in-out duration-300"
              : "hover:bg-rose-50 p-2 rounded-md ease-in-out duration-300"
          }
        >
          <p
            className={
              toggle === "upload"
                ? "text-3xl font-medium text-indigo-500"
                : "text-3xl font-medium text-rose-500"
            }
          >
            VidNote
          </p>
        </a>
        <ul className="list-none flex text-xl items-center">
          <a href="/login">
            <li
              className={
                toggle == "upload"
                  ? "mx-4 text-white font-medium transition-colors duration-300 hover:text-indigo-500"
                  : "mx-4 text-black font-medium transition-colors duration-300 hover:text-rose-500"
              }
            >
              Login
            </li>
          </a>
          <a href="/signup">
            <li
              className={
                toggle === "upload"
                  ? "hover:cursor-pointer rounded-md bg-indigo-600 p-2 px-4 text-lg font-medium text-white ease-in-out duration-300 hover:bg-indigo-500 transform hover:scale-105"
                  : "hover:cursor-pointer rounded-md bg-rose-500 p-2 px-4 text-lg font-medium text-white ease-in-out duration-300 hover:bg-rose-400 transform hover:scale-105"
              }
            >
              Sign Up
            </li>
          </a>
        </ul>
      </nav>
      <div className="z-10 mt-10 w-full max-w-5xl font-sans text-sm flex">
        <div className="flex flex-col items-center justify-center w-full p-6 rounded-lg shadow-[35px_35px_35pxpx_35px_rgba(0,0,0,0.3)] shadow-indigo-700">
          {/* <button className="rounded-md bg-indigo-600 p-2 px-4 text-lg font-bold text-white">
            Login
          </button> */}
          <h1
            className={
              toggle === "upload"
                ? "text-3xl md:text-4xl lg:text-3xl xl:text-6xl font-bold text-indigo-500 tracking-wide leading-tight text-center"
                : "text-3xl md:text-4xl lg:text-3xl xl:text-6xl font-bold text-rose-500 tracking-wide leading-tight text-center"
            }
          >
            Notes Transcripter
          </h1>
          <p className="mt-3 text-gray-500 text-2xl">
            Signup to{" "}
            <span
              className={
                toggle === "upload"
                  ? "text-indigo-500 font-medium"
                  : "text-rose-500 font-medium"
              }
            >
              save
            </span>{" "}
            your transcriptions for{" "}
            <span
              className={
                toggle === "upload"
                  ? "text-indigo-500 font-medium"
                  : "text-rose-500 font-medium"
              }
            >
              FREE
            </span>
            .
          </p>
          {/* <button className="rounded-md bg-indigo-600 p-2 px-4 text-lg font-bold text-white">
            Sign Up
          </button> */}
        </div>
      </div>
      <div className="w-full max-w-5xl items-center justify-between font-sans text-sm pt-7 lg:flex">
        <div
          className={
            toggle === "upload"
              ? "flex w-full bg-violet-200 backdrop-blur p-6 rounded-lg flex items-center justify-center"
              : "flex w-full bg-rose-200 backdrop-blur p-6 rounded-lg flex items-center justify-center"
          }
        >
          <form method="post" className="w-full">
            {/* <div class="flex items-center justify-center w-full mb-4">
              <label for="toggleB" class="flex items-center cursor-pointer">
                <div class="relative">
                  <input
                    type="checkbox"
                    id="toggleB"
                    class="sr-only"
                    onChange={(e) => {
                      if (e.target.checked == false) {
                        setToggle("youtube");
                        setUrl();
                        setShowFrame(false);
                      } else {
                        setToggle("upload");
                        setUrl();
                        setShowFrame(false);
                      }
                    }}
                  />
                  <div
                    class={
                      toggle === "youtube"
                        ? "block bg-rose-300 w-14 h-8 rounded-full"
                        : "block bg-indigo-300 w-14 h-8 rounded-full"
                    }
                  ></div>
                  <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
                <div class="ml-3 text-gray-700 font-medium">
                  Switch to {toggle === "youtube" ? "Upload" : "Youtube"}
                </div>
              </label>
            </div> */}
            {/* <input
              onChange={(e) => {
                if (e.target.checked == true) {
                  setToggle("youtube");
                } else {
                  setToggle("upload");
                }
              }}
              type="checkbox"
              class=" absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
            />
            <span class="w-16 h-10 flex items-center flex-shrink-0 mb-4 p-1 bg-indigo-500 rounded-full duration-300 ease-in-out peer-checked:bg-rose-500 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span> */}
            {toggle === "youtube" && (
              <>
                <label
                  htmlFor="youtube"
                  className="text-rose-500 text-xl font-medium"
                >
                  Enter Video Link
                </label>
                <div className="flex bg-rose-300 p-3 rounded-lg mb-2">
                  <input
                    onChange={(e) => {
                      setShowFrame(false);
                      setUrl(e.target.value);
                    }}
                    type="text"
                    id="youtube"
                    className="block bg-rose-50 w-full rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mr-2 text-2xl font-medium"
                    placeholder="Enter Video Link"
                  />
                  <button
                    onClick={handleYoutubeSubmit}
                    id="buttonSubmit"
                    className="rounded-md bg-rose-500 p-2 px-4 text-lg font-medium text-white ease-in-out duration-300 hover:bg-rose-400 transform hover:scale-105"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
            {toggle === "upload" && (
              <>
                <label
                  htmlFor="youtube"
                  className="text-indigo-500 text-xl font-medium mb-6"
                >
                  Upload
                </label>
                <div className="flex bg-indigo-300 p-3 rounded-lg mb-2">
                  <input
                    id="upload"
                    type="file"
                    class="block w-full text-lg text-indigo-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-lg file:font-semibold
                    file:bg-indigo-500 file:text-white
                    hover:file:bg-indigo-400
                  "
                  />
                  <button
                    onClick={handleUploadSubmit}
                    id="buttonSubmit"
                    className="rounded-md bg-indigo-500 p-2 px-4 text-lg font-medium text-white ease-in-out duration-300 hover:bg-indigo-400 transform hover:scale-105"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
            {showFrame && (
              <>
                <label
                  htmlFor="youtube"
                  className={
                    toggle === "upload"
                      ? "text-indigo-500 text-xl font-medium"
                      : "text-red-500 text-xl font-medium"
                  }
                >
                  Video
                </label>
                <div
                  className={
                    toggle === "upload"
                      ? "flex w-full bg-violet-300 p-3 rounded-lg"
                      : "flex w-full bg-rose-300 p-3 rounded-lg"
                  }
                >
                  <iframe
                    width="100%"
                    height="490"
                    src={url.replace("watch?v=", "embed/")}
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </>
            )}
            {text && (
              <>
                <label
                  htmlFor="youtube"
                  className={
                    toggle === "upload"
                      ? "text-indigo-500 text-xl font-medium"
                      : "text-red-500 text-xl font-medium"
                  }
                >
                  Text
                </label>
                <div
                  className={
                    toggle === "upload"
                      ? "flex w-full bg-violet-300 p-3 rounded-lg"
                      : "flex w-full bg-rose-300 p-3 rounded-lg"
                  }
                >
                  <p className="text-lg font-medium">{text}</p>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <div className="py-10">
        <p className="mt-4 font-medium text-xl text-center">
          Made with ❤️ by VidNote Devs
        </p>
      </div>
    </main>
  );
}
