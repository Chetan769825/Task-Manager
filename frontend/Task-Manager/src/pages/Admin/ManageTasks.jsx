import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';
import { toast } from 'react-hot-toast';

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      const statusSummary = response.data?.statusSummary || {};

      setTabs([
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ]);

    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-tasks`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS_REPORT, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "tasks_report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading report: ", error);
      toast.error("Failed to download report.");
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">

      <div className="min-h-screen text-white space-y-6 py-6">

        {/* HEADER */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          <div>
            <h2 className="text-xl md:text-2xl font-semibold">
              My Tasks
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage and track all your tasks in one place
            </p>
          </div>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-400/20 text-indigo-200 hover:bg-indigo-500/30 transition"
          >
            <LuFileSpreadsheet />
            Download Report
          </button>

        </div>

        {/* TABS */}
        {tabs?.length > 0 && (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        )}

        {/* TASK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {allTasks?.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl hover:scale-[1.01] transition cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <TaskCard
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((i) => i.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || []}
              />
            </div>
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default ManageTasks;