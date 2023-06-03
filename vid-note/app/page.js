import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  return (
    <main className="bg-violet-50 flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Vid Node</title>
      </Head>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className = "w-full bg-violet-200 p-6 rounded-lg shadow-[35px_35px_35pxpx_35px_rgba(0,0,0,0.3)] shadow-indigo-700">
          <h1 className="text-3xl md:text-4xl lg:text-3xl xl:text-6xl font-bold text-indigo-500 tracking-wide leading-tight text-center">VidNote</h1>
        </div>
      </div>
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className = "flex w-full bg-violet-200 p-6 rounded-lg">
          <form action = "/send-data-here" method = "post">
          <label htmlFor="youtube" className = "text-pink-500">Youtube Video Link: </label>
          <input type="text" id = "youtube" className="rounded" placeholder="Enter Video Link"/>
          <button className="rounded-full bg-indigo-600 p-2 px-4 text-lg font-bold text-slate-50" >Submit</button>
          </form>
        </div>
      </div>
      
    </main>
  )
}