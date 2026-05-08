import React from 'react'

const UserCard = ({ userInfo }) => {
  return (
    <div className="
      p-4 rounded-2xl
      bg-white/5 border border-white/10
      backdrop-blur-xl
      hover:border-indigo-400/20 transition
      space-y-4
    ">

      {/* USER HEADER */}
      <div className="flex items-center gap-3">

        <img
          src={userInfo?.profileImageUrl}
          alt="Avatar"
          className="w-12 h-12 rounded-full border border-white/20"
        />

        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {userInfo?.name}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {userInfo?.email}
          </p>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="h-px bg-white/10" />

      {/* STATS GRID */}
      <div className="grid grid-cols-3 gap-2">

        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />

        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />

        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />

      </div>

    </div>
  )
}

export default UserCard


const StatCard = ({ label, count, status }) => {

  const getStatusStyle = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-300 bg-cyan-500/10 border-cyan-400/20"
      case "Pending":
        return "text-indigo-300 bg-indigo-500/10 border-indigo-400/20"
      default:
        return "text-emerald-300 bg-emerald-500/10 border-emerald-400/20"
    }
  }

  return (
    <div className={`
      flex flex-col items-center justify-center
      rounded-xl border px-2 py-2
      text-center
      ${getStatusStyle()}
    `}>

      <span className="text-sm font-semibold">
        {count}
      </span>

      <span className="text-[10px] opacity-80">
        {label}
      </span>

    </div>
  )
}