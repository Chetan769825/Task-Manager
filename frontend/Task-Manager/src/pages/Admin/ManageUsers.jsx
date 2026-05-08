import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../components/Cards/UserCard';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.REPORTS.EXPORT_USERS_REPORT,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users_report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashboardLayout activeMenu={"Team Members"}>

      <div className="min-h-screen text-white py-6 space-y-6">

        {/* HEADER */}
        <div className="
          flex items-center justify-between
          p-5 rounded-2xl
          bg-white/5 border border-white/10
          backdrop-blur-xl
        ">

          <div>
            <h1 className="text-xl font-semibold">
              Team Intelligence
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage and analyze your team members
            </p>
          </div>

          <button
            onClick={handleDownloadReport}
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              bg-indigo-500/20 border border-indigo-400/20
              text-indigo-200 hover:bg-indigo-500/30 transition
            "
          >
            <LuFileSpreadsheet className="text-lg" />
            Export Data
          </button>

        </div>

        {/* STATS STRIP (UI ONLY VISUAL BOOST) */}
        <div className="
          grid grid-cols-1 md:grid-cols-3 gap-4
        ">

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-xs text-gray-400">Total Members</p>
            <h2 className="text-2xl font-semibold mt-1">{allUsers.length}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-xs text-gray-400">Active Teams</p>
            <h2 className="text-2xl font-semibold mt-1">
              {Math.max(1, Math.floor(allUsers.length / 3))}
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-xs text-gray-400">Collaboration Score</p>
            <h2 className="text-2xl font-semibold mt-1 text-indigo-300">
              87%
            </h2>
          </div>

        </div>

        {/* USERS GRID */}
        <div className="
          grid grid-cols-1 md:grid-cols-3 gap-5
        ">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>

      </div>

    </DashboardLayout>
  );
};

export default ManageUsers;