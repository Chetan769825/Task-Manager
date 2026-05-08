import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between gap-5 px-7 py-4 
      sticky top-0 z-30 
      bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 
      border-b border-white/10 
      backdrop-blur-xl shadow-lg">

      {/* Left section */}
      <div className="flex items-center gap-4">

        <button
          className="lg:hidden text-white hover:text-purple-200 transition"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2">

          {/* Logo container (important fix for visibility) */}
          <div className="bg-white/10 p-1 rounded-md backdrop-blur-md border border-white/20">
            <img
              src="https://www.ethara.ai/logo_white_text.png"
              alt="Ethara Logo"
              className="h-6 w-auto object-contain"
            />
          </div>

          <span className="text-lg font-semibold tracking-tight text-white">
            Task Manager
          </span>

        </div>
      </div>

      {/* Right badge */}
      <div className="hidden md:flex items-center gap-2">
        <div className="px-3 py-1 text-xs rounded-full 
          bg-white/10 text-white border border-white/20 backdrop-blur-md">
          Smart Work Assistant
        </div>
      </div>

      {/* Side menu */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-64 
          bg-white/10 backdrop-blur-xl 
          border-r border-white/10 
          shadow-lg text-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;