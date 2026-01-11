import React, { useContext } from 'react'
import { AppContext } from '../../store/AppContext'
import { RiAlarmWarningLine } from "react-icons/ri"
import { BsFlag } from "react-icons/bs"
import api from '../../helper/api'
import toast from 'react-hot-toast'
const Task = ({ task, getList }) => {
  const { state } = useContext(AppContext)
  const role = state?.user?.role
   const deleteC = async() =>{
     const response = await api.delete('/common/delete-task',{ data: {taskId: task._id}})
     if(response.data.success){
       toast.success('Task Deleted')
       getList()
     }else{
    toast.error('Something Went Wrong!')
     }
   }
  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all m-4 p-4 space-y-3 bg-white">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-900">{task?.title}</h1>
        <div className="flex items-center gap-2">
          <BsFlag className="text-amber-600" />
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-100 text-amber-700">
            {task?.priority || "Normal"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-xs text-gray-700 leading-relaxed py-2">
          {task?.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-600 pt-2">
        <div className="flex items-center gap-1">
          <RiAlarmWarningLine className="text-gray-500" />
          <p>Due: {task?.dueDate || "N/A"}</p>
        </div>

        <p className={`text-xs font-medium ${
          task?.isOverdue ? "text-red-600" : "text-gray-700"
        }`}>
          {task?.isOverdue ? `${task.overdueDays || 0} days overdue` : "On track"}
        </p>

  
          <button onClick={deleteC} className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition flex items-center gap-1">
            DELETE
          </button>
  
      </div>
    </div>
  )
}

export default Task
