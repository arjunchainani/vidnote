import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import YouTube from 'react-youtube';

// YouTubeVideo component
class YouTubeVideo extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };

    return (
      <div>
        <h3>GeeksforGeeks - Youtube</h3>
        <YouTube videoId="sTnm5jvjgjM" opts={opts} onReady={this._onReady} />
      </div>
    );
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}

// Home component
export default function Home() {
  return (
    <main className="bg-violet-50 font-sans flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Vid Node</title>
      </Head>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-sans text-sm lg:flex">
        <div className="w-full bg-violet-200 p-6 rounded-lg shadow-[35px_35px_35pxpx_35px_rgba(0,0,0,0.3)] shadow-indigo-700">
          <h1 className="text-3xl md:text-4xl lg:text-3xl xl:text-6xl font-bold text-indigo-500 tracking-wide leading-tight text-center">VidNote</h1>
        </div>
      </div>
      <div className="w-full max-w-5xl items-center justify-between font-sans text-sm lg:flex">
        <div className="flex w-full bg-violet-200 p-6 rounded-lg">
          <form action="/send-data-here" method="post">
            <label htmlFor="youtube" className="text-indigo-500 text-xl font-bold">Enter Video Link</label>
            <div className="flex w-full bg-violet-300 p-3 rounded-lg">
              <input type="text" id="youtube" className="block bg-white w-full border border-slate-300 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mr-2 text-lg font-bold" placeholder="Enter Video Link" />
              <button className="rounded-md bg-indigo-600 p-2 px-4 text-lg font-bold text-white">Submit</button>
            </div>
          </form>
          <div>
            <YouTubeVideo /> {/* Render the YouTubeVideo component */}
          </div>
        </div>
      </div>
    </main>
  );
}
