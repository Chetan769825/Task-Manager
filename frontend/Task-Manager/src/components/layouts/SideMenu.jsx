import React, { useContext, useEffect, useState } from 'react'
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext)
  const [sideMenuData, setSideMenuData] = useState([])

  const navigate = useNavigate()

  const handelClick = (route) => {
    if (route === 'logout') {
      handelLogout()
      return
    }

    navigate(route)
  }

  const handelLogout = () => {
    localStorage.clear()
    clearUser()
    navigate('/login')
  }

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role === 'admin'
          ? SIDE_MENU_DATA
          : SIDE_MENU_USER_DATA
      )
    }
  }, [user])

  return (
    <div className="w-72 h-[calc(100vh-70px)] bg-white/5 border-r border-purple-500/10 backdrop-blur-2xl sticky top-[70px] z-20 px-4 py-6">

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center mb-10">

        <div className="relative">
          <img
            src={
              user?.profileImageUrl ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          />
        </div>

        {user?.role === 'admin' && (
          <div className="text-[11px] font-semibold text-white bg-gradient-to-r from-purple-500 to-violet-500 px-4 py-1 rounded-full mt-3 shadow-lg">
            ADMIN
          </div>
        )}

        <h5 className="text-white font-semibold text-lg mt-4">
          {user?.name || 'User'}
        </h5>

        <p className="text-sm text-gray-400 mt-1 break-all text-center">
          {user?.email || ''}
        </p>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">

        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handelClick(item.path)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer group
              
              ${
                activeMenu === item.label
                  ? 'bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)]'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            <item.icon className="text-xl group-hover:scale-110 transition-transform duration-300" />

            <span className="font-medium text-[15px]">
              {item.label}
            </span>
          </button>
        ))}

      </div>
    </div>
  )
}

export default SideMenu