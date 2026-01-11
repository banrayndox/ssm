import React, { useContext } from 'react'
import { AppContext } from '../../store/AppContext'
import { RiCalendarLine } from 'react-icons/ri'
import { FaBook } from 'react-icons/fa'
import api from '../../helper/api'
import toast from 'react-hot-toast'
const Exam = ({ exam, getList }) => {
  const { state } = useContext(AppContext)
  const role = state?.user?.role
  const deleteC = async() =>{
    const response = await api.delete('/common/delete-communication',{ data: {communicationId: exam._id}})
    if(response.data.success){
          toast.success('Exam Deleted')
          getList()
    }else{
     toast.error('Something Went Wrong!')
    }
  }
  return (
    <div className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all m-4 p-4 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <RiCalendarLine className="text-gray-500" /> {exam?.enrollmentId?.courseId?.name}
          </h1>
 
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-700">
          {exam.category}
        </span>
      </div>

      {/* Time info */}
      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <RiCalendarLine className="text-gray-400" /> 
          <span>{exam.date || "2025-12-24"}</span>
        </div>
        <div className="flex items-center gap-1">
          <RiCalendarLine className="text-gray-400" /> 
          <span>{exam.time || "11:00 AM"} • {exam.duration || "30 minutes"}</span>
        </div>
      </div>

      {/* Syllabus box */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-start gap-2">
        <FaBook className="text-gray-400 mt-1" />
        <div>
          <h2 className="text-xs font-semibold text-gray-700 mb-1">Syllabus</h2>
          <p className="text-xs text-gray-600 leading-relaxed">{exam.syllabus}</p>
        </div>
      </div>

      {/* Action */}
      {(role === "teacher" )&& (
        <div className="flex justify-end pt-1">
          <button onClick={deleteC} className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition flex items-center gap-1">
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Exam
