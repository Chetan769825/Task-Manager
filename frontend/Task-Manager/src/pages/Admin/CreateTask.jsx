import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { LuTrash2 } from 'react-icons/lu'
import SelectDropdown from '../../components/Inputs/SelectDropdown'
import SelectUsers from '../../components/Inputs/SelectUsers'
import TodoListInput from '../../components/Inputs/TodoListInput'
import AddAttachmentsInput from '../../components/Inputs/AddAttachmentsInput'
import DeleteAlert from '../../components/DeleteAlert'
import Modal from '../../components/Modal'

const CreateTask = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const { taskId } = location.state || {}

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: null,
    assignedTo: '',
    todoChecklist: [],
    attachments: [],
  })

  const [currentTask, setCurrentTask] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => { /* unchanged */ }
  const createTask = async () => { /* unchanged */ }
  const updateTask = async () => { /* unchanged */ }
  const deleteTask = async () => { /* unchanged */ }
  const getTaskDetailsById = async () => { /* unchanged */ }

  useEffect(() => {
    if (taskId) getTaskDetailsById(taskId)
  }, [taskId])

  return (
    <DashboardLayout activeMenu="Create Task">

      <div className="min-h-screen text-white py-6 space-y-6">

        {/* HEADER */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              {taskId ? 'Update Task' : 'Create Task'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Build and manage your task workflow
            </p>
          </div>

          {taskId && (
            <button
              onClick={() => setOpenDeleteAlert(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl
              bg-red-500/10 border border-red-400/20 text-red-300 hover:bg-red-500/20 transition"
            >
              <LuTrash2 />
              Delete
            </button>
          )}

        </div>

        {/* FORM GRID */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

          {/* TITLE */}
          <div className="mb-4">
            <label className="text-xs text-gray-200">Task Title</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-400"
              placeholder="Create App UI"
              name="title"
              value={taskData.title}
              onChange={({ target }) => handleValueChange(target.name, target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="text-xs text-gray-200">Description</label>
            <textarea
              rows={4}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-400"
              placeholder="Describe task"
              value={taskData.description}
              onChange={({ target }) => handleValueChange('description', target.value)}
            />
          </div>

          {/* FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="text-xs text-gray-200">Priority</label>
              <SelectDropdown
                options={PRIORITY_DATA}
                value={taskData.priority}
                onChange={(value) => handleValueChange('priority', value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-200">Due Date</label>
              <input
                type="date"
                className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                value={
                  taskData.dueDate
                    ? moment(taskData.dueDate).format('YYYY-MM-DD')
                    : ''
                }
                onChange={({ target }) => handleValueChange('dueDate', target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-200">Assign To</label>
              <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(value) => handleValueChange('assignedTo', value)}
              />
            </div>

          </div>

          {/* TODO */}
          <div className="mt-5">
            <label className="text-xs text-gray-200">TODO Checklist</label>
            <div className="mt-1">
              <TodoListInput
                todoList={taskData.todoChecklist || []}
                setTodoList={(value) => handleValueChange('todoChecklist', value)}
              />
            </div>
          </div>

          {/* ATTACHMENTS */}
          <div className="mt-5">
            <label className="text-xs text-gray-200">Attachments</label>
            <AddAttachmentsInput
              attachments={taskData.attachments}
              setAttachments={(value) => handleValueChange('attachments', value)}
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-400 mt-4">{error}</p>
          )}

          {/* ACTION */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-indigo-500/40 border border-indigo-200 text-indigo-100 hover:bg-indigo-500 transition"
            >
              {taskId ? 'UPDATE TASK' : 'CREATE TASK'}
            </button>
          </div>

        </div>

      </div>

      {/* MODAL */}
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure want to delete this task?"
          onDelete={deleteTask}
        />
      </Modal>

    </DashboardLayout>
  )
}

export default CreateTask