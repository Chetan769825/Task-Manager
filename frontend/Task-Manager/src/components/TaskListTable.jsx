import React from 'react'
import moment from 'moment';

const TaskListTable = ({ tableData }) => {

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20';
      case 'Pending':
        return 'bg-purple-500/10 text-purple-300 border border-purple-500/20';
      case 'In Progress':
        return 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20';
      default:
        return 'bg-gray-500/10 text-gray-300 border border-gray-500/20';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-300 border border-red-500/20';
      case 'Medium':
        return 'bg-orange-500/10 text-orange-300 border border-orange-500/20';
      case 'Low':
        return 'bg-green-500/10 text-green-300 border border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-300 border border-gray-500/20';
    }
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

      <table className="min-w-full">

        {/* HEADER */}
        <thead>
          <tr className="text-left border-b border-white/10">

            <th className="py-4 px-5 text-xs font-medium text-gray-300 uppercase tracking-wider">
              Task
            </th>

            <th className="py-4 px-5 text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>

            <th className="py-4 px-5 text-xs font-medium text-gray-300 uppercase tracking-wider">
              Priority
            </th>

            <th className="py-4 px-5 text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
              Created
            </th>

          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {tableData?.map((task, index) => (
            <tr
              key={task._id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >

              {/* TITLE */}
              <td className="py-4 px-5 text-sm text-white max-w-[250px] truncate">
                {task.title}
              </td>

              {/* STATUS */}
              <td className="py-4 px-5">
                <span className={`px-3 py-1 text-xs rounded-full ${getStatusBadgeColor(task.status)}`}>
                  {task.status}
                </span>
              </td>

              {/* PRIORITY */}
              <td className="py-4 px-5">
                <span className={`px-3 py-1 text-xs rounded-full ${getPriorityBadgeColor(task.priority)}`}>
                  {task.priority}
                </span>
              </td>

              {/* DATE */}
              <td className="py-4 px-5 text-sm text-gray-400 hidden md:table-cell">
                {task.createdAt
                  ? moment(task.createdAt).format('DD MMM YYYY')
                  : 'N/A'}
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;