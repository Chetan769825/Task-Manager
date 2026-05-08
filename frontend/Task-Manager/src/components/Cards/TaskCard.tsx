import React from 'react'
import Progress from '../Progress';
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from 'react-icons/lu';
import moment from "moment";

interface TaskCardProps {
  title: string;
  description: string;
  priority: string;
  status: string;
  progress: number;
  createdAt: string;
  dueDate: string;
  assignedTo: any[];
  attachmentCount: number;
  completedTodoCount: number;
  todoChecklist: any[];
  onClick: () => void;
}

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}: TaskCardProps) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-300 bg-cyan-500/10 border border-cyan-400/20";
      case "Completed":
        return "text-emerald-300 bg-emerald-500/10 border border-emerald-400/20";
      default:
        return "text-purple-300 bg-purple-500/10 border border-purple-400/20";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-300 bg-emerald-500/10 border border-emerald-400/20";
      case "Medium":
        return "text-amber-300 bg-amber-500/10 border border-amber-400/20";
      default:
        return "text-red-300 bg-red-500/10 border border-red-400/20";
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition cursor-pointer relative overflow-hidden"
    >

      {/* glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent" />

      <div className="relative">

        {/* STATUS + PRIORITY */}
        <div className="flex items-center gap-2 mb-3">

          <div className={`text-[11px] font-medium px-3 py-1 rounded-full ${getStatusTagColor()}`}>
            {status}
          </div>

          <div className={`text-[11px] font-medium px-3 py-1 rounded-full ${getPriorityTagColor()}`}>
            {priority}
          </div>

        </div>

        {/* TITLE */}
        <p className="font-semibold text-white text-base line-clamp-1">
          {title}
        </p>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {description}
        </p>

        {/* TASK PROGRESS */}
        <p className="text-xs text-gray-300 mt-3">
          Task Done:
          <span className="text-white font-medium ml-1">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>

        <div className="mt-2">
          <Progress progress={progress} status={status} />
        </div>

        {/* DATES */}
        <div className="flex items-center justify-between mt-4">

          <div>
            <label className="text-[10px] text-gray-500">Start</label>
            <p className="text-xs text-gray-300">
              {moment(createdAt).format("DD MMM YYYY")}
            </p>
          </div>

          <div>
            <label className="text-[10px] text-gray-500">Due</label>
            <p className="text-xs text-gray-300">
              {moment(dueDate).format("DD MMM YYYY")}
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-4">

          <AvatarGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">
              <LuPaperclip className="text-indigo-300" />
              <span className="text-xs text-gray-300">
                {attachmentCount}
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default TaskCard;