import React from 'react'
import UI_IMG from "../../assets/Images/saufBg.png"

const AuthLayout = ({ children }) => {
  return (
    <div className="flex relative bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">

      {/* Left Content */}
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-10 pb-12 z-10 text-white'>

        {/* Header */}
        <h2 className='text-2xl md:text-3xl font-semibold tracking-tight mb-40'>
          <span className="text-indigo-400">Ethara.AI</span> Task Manager
        </h2>

        {/* Auth Card */}
        <div className="bg-white border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
          {children}
        </div>

      </div>

      {/* Right Image Section */}
      <div className="hidden md:block fixed top-0 right-0 w-[40vw] h-screen">

        <div className="relative w-full h-full">

          <img
            src={UI_IMG}
            className='w-full h-full object-cover'
            alt="UI Background"
          />

          {/* Soft gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-purple-900/40 to-slate-900/60" />

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;