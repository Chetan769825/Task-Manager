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

const Dashboard = () => {
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
        const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
        if (response.data) {
          setDashboardData(response.data);
          prepareChartData(response.data.charts);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getDashboardData();
  }, []);

  const prepareChartData = (charts) => {
    const taskDustrubution = charts?.taskDustrubution || null;
    const taskPriorityLevels = charts?.taskPriorityLevels || null;

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
    navigate("/admin/tasks");
  };

  return (
    <DashboardLayout activeMenu="Dashboard">

      <div className="min-h-screen text-white space-y-6 py-6">

        {/* HEADER */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent" />

          <div className="relative">
            <h2 className="text-xl md:text-2xl font-semibold">
              Good Morning, <span className="text-indigo-300">{user?.name}</span>
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              {moment().format("dddd Do MMMM YYYY")}
            </p>
          </div>

        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(dashboardData.charts?.taskDustrubution?.All || 0)}
            color="bg-indigo-500"
          />

          <InfoCard
            label="Pending"
            value={addThousandsSeparator(dashboardData.charts?.taskDustrubution?.Pending || 0)}
            color="bg-purple-500"
          />

          <InfoCard
            label="In Progress"
            value={addThousandsSeparator(dashboardData.charts?.taskDustrubution?.InProgress || 0)}
            color="bg-cyan-500"
          />

          <InfoCard
            label="Completed"
            value={addThousandsSeparator(dashboardData.charts?.taskDustrubution?.Completed || 0)}
            color="bg-emerald-500"
          />

        </div>

        {/* AI ANALYTICS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PIE / AI INSIGHT */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_60%)]" />

            <div className="relative">

              <div className="flex items-center justify-between mb-4">
                <h5 className="text-white font-medium">
                   Task Intelligence
                </h5>

                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                  Live
                </span>
              </div>

              <div className="text-xs text-gray-300 mb-4 space-y-1">
                <p>• Workload distribution analyzed</p>
                <p>• Focus area: <span className="text-cyan-300">In Progress</span></p>
                <p>• System status: <span className="text-emerald-300">Optimal</span></p>
              </div>

              <CustomPieChart data={pieChartData} colors={COLORS} />

            </div>
          </div>

          {/* BAR CHART */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
            <h5 className="text-white font-medium mb-4">
              Priority Analysis
            </h5>

            <CustomBarChart data={barChartData} />
          </div>

        </div>

        {/* RECENT TASKS */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-medium">Recent Tasks</h5>

            <button
              className="flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200 transition"
              onClick={onSeeMore}
            >
              See All <LuArrowRight />
            </button>
          </div>

          <TaskListTable tableData={dashboardData.recentTasks} />

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;