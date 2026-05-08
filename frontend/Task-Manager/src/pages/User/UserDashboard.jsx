import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    charts: {
      taskDustrubution: null,
      taskPriorityLevels: null,
    },
    recentTasks: [],
  });

  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
        if (response.data) {
          setDashboardData(response.data);
          prepareChartData(response.data.charts);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    getDashboardData();
  }, []);

  const prepareChartData = (charts) => {
    const taskDustrubution = charts?.taskDustrubution || {};
    const taskPriorityLevels = charts?.taskPriorityLevels || {};

    setPieChartData([
      { status: "Pending", count: taskDustrubution?.Pending || 0 },
      { status: "In Progress", count: taskDustrubution?.InProgress || 0 },
      { status: "Completed", count: taskDustrubution?.Completed || 0 },
    ]);

    setBarChartData([
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ]);
  };

  const onSeeMore = () => {
    navigate("/user/tasks");
  };

  return (
    <DashboardLayout activeMenu="Dashboard">

      <div className="min-h-screen text-white space-y-6">

        {/* HEADER */}
        <div className="
          p-5 rounded-2xl
          bg-white/5 border border-white/10
          backdrop-blur-xl
          flex flex-col md:flex-row md:items-center justify-between
        ">

          <div>
            <h1 className="text-xl font-semibold">
              Welcome back, {user?.name}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {moment().format("dddd Do MMMM YYYY")}
            </p>
          </div>

        </div>

        {/* STATS */}
        <div className="
          grid grid-cols-2 md:grid-cols-4 gap-4
        ">

          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(dashboardData.charts?.taskDustrubution?.All || 0)}
            color="bg-blue-600"
          />

          <InfoCard
            label="Pending"
            value={addThousandsSeparator(dashboardData.charts?.taskDustrubution?.Pending || 0)}
            color="bg-violet-500"
          />

          <InfoCard
            label="In Progress"
            value={addThousandsSeparator(dashboardData.charts?.taskDustrubution?.InProgress || 0)}
            color="bg-cyan-500"
          />

          <InfoCard
            label="Completed"
            value={addThousandsSeparator(dashboardData.charts?.taskDustrubution?.Completed || 0)}
            color="bg-lime-500"
          />

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="
            p-5 rounded-2xl
            bg-white/5 border border-white/10
            backdrop-blur-xl
          ">
            <h5 className="text-sm text-gray-300 mb-3">
              Task Intelligence Overview
            </h5>
            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>

          <div className="
            p-5 rounded-2xl
            bg-white/5 border border-white/10
            backdrop-blur-xl
          ">
            <h5 className="text-sm text-gray-300 mb-3">
              Priority Distribution
            </h5>
            <CustomBarChart data={barChartData} />
          </div>

        </div>

        {/* RECENT TASKS */}
        <div className="
          p-5 rounded-2xl
          bg-white/5 border border-white/10
          backdrop-blur-xl
        ">

          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-medium">
              Recent Activity
            </h5>

            <button className="card-btn" onClick={onSeeMore}>
              View All <LuArrowRight className="text-base" />
            </button>
          </div>

          <TaskListTable tableData={dashboardData.recentTasks} />

        </div>

      </div>

    </DashboardLayout>
  );
};

export default UserDashboard;