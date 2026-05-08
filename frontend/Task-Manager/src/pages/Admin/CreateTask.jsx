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
    assignedTo: [],          // FIXED
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

  const clearData = () => {
    setTaskData({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  // CREATE
  const createTask = async () => {
    try {
      setLoading(true)

      const todoList = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }))

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: taskData.dueDate
          ? new Date(taskData.dueDate).toISOString()
          : null,
        todoChecklist: todoList,
      })

      toast.success("Task created successfully")
      clearData()
      navigate('/admin/tasks')

    } catch (error) {
      console.error(error)
      toast.error("Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  // UPDATE
  const updateTask = async () => {
    try {
      setLoading(true)

      const todoList = taskData.todoChecklist.map((item) => {
        const prev = currentTask?.todoChecklist || []
        const match = prev.find((t) => t.text === item)

        return {
          text: item,
          completed: match ? match.completed : false,
        }
      })

      await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: taskData.dueDate
            ? new Date(taskData.dueDate).toISOString()
            : null,
          todoChecklist: todoList,
        }
      )

      toast.success("Task updated successfully")
      navigate('/admin/tasks')

    } catch (error) {
      console.error(error)
      toast.error("Failed to update task")
    } finally {
      setLoading(false)
    }
  }

  // DELETE
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId))
      toast.success("Task deleted successfully")
      setOpenDeleteAlert(false)
      navigate('/admin/tasks')
    } catch (error) {
      console.error(error)
      toast.error("Delete failed")
    }
  }

  // GET BY ID
  const getTaskDetailsById = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      )

      const task = res.data
      setCurrentTask(task)

      setTaskData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate
          ? moment(task.dueDate).format("YYYY-MM-DD")
          : null,
        assignedTo: task.assignedTo?.map((u) => u._id) || [],
        todoChecklist: task.todoChecklist?.map((t) => t.text) || [],
        attachments: task.attachments || [],
      })

    } catch (error) {
      console.error(error)
      toast.error("Failed to load task")
    }
  }

  // SUBMIT
  const handleSubmit = async () => {
    setError('')

    if (!taskData.title.trim()) return setError("Title is required")
    if (!taskData.description.trim()) return setError("Description is required")
    if (!taskData.dueDate) return setError("Due date is required")
    if (!taskData.assignedTo.length) return setError("Assign at least one user")
    if (!taskData.todoChecklist.length) return setError("Add at least one todo")

    if (taskId) updateTask()
    else createTask()
  }

  useEffect(() => {
    if (taskId) getTaskDetailsById()
  }, [taskId])

  return (
    <DashboardLayout activeMenu="Create Task">

      <div className="min-h-screen text-white py-6 space-y-6">

        {/* HEADER */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 flex justify-between items-center">

          <div>
            <h2 className="text-xl font-semibold">
              {taskId ? 'Update Task' : 'Create Task'}
            </h2>
            <p className="text-sm text-gray-400">
              AI powered task management
            </p>
          </div>

          {taskId && (
            <button
              onClick={() => setOpenDeleteAlert(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300"
            >
              <LuTrash2 />
              Delete
            </button>
          )}
        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

          <input
            className="w-full mb-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) => handleValueChange('title', e.target.value)}
          />

          <textarea
            className="w-full mb-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
            placeholder="Description"
            rows={4}
            value={taskData.description}
            onChange={(e) => handleValueChange('description', e.target.value)}
          />

          <div className="grid md:grid-cols-3 gap-4">

            <SelectDropdown
              options={PRIORITY_DATA}
              value={taskData.priority}
              onChange={(v) => handleValueChange('priority', v)}
            />

            <input
              type="date"
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10"
              value={taskData.dueDate || ''}
              onChange={(e) => handleValueChange('dueDate', e.target.value)}
            />

            <SelectUsers
              selectedUsers={taskData.assignedTo}
              setSelectedUsers={(v) => handleValueChange('assignedTo', v)}
            />

          </div>

          <TodoListInput
            todoList={taskData.todoChecklist}
            setTodoList={(v) => handleValueChange('todoChecklist', v)}
          />

          <AddAttachmentsInput
            attachments={taskData.attachments}
            setAttachments={(v) => handleValueChange('attachments', v)}
          />

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

          <div className="flex justify-end mt-5">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-indigo-500/40 border border-indigo-200"
            >
              {taskId ? 'UPDATE TASK' : 'CREATE TASK'}
            </button>
          </div>

        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure?"
          onDelete={deleteTask}
        />
      </Modal>

    </DashboardLayout>
  )
}

export default CreateTask