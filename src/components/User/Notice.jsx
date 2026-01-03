import React, { useContext } from 'react'
import { AppContext } from '../../store/AppContext'
import { RiNotificationLine, RiCalendarLine } from 'react-icons/ri'
import { FaUserAlt } from 'react-icons/fa'
import api from '../../helper/api'

const Notice = ({ notice }) => {
  const { state } = useContext(AppContext)
  const role = state?.user?.role
  const deleteC = async() =>{
    const response = await api.delete('/user/delete-communication',{ data: {communicationId: notice._id}})
    if(response.data.success){
      console.log('deleted')
    }else{
      console.log('failed')
    }
  }
  return (
    <div className="border border-gray-200/70 rounded-2xl shadow-sm hover:shadow-md transition-all m-4 p-4 space-y-4 bg-white">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <RiNotificationLine className="text-gray-400" />
          {notice?.title}
        </h1>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-100 text-amber-700">
          {notice?.category || 'EXAM'}
        </span>
      </div>

      {/* Content */}
      <p className="text-xs text-gray-700 leading-relaxed">
        {notice?.content}
      </p>

      {/* Footer: author, date, delete */}
      <div className="flex justify-between items-center text-xs text-gray-600 pt-2">
        <div className="flex items-center gap-1">
          <FaUserAlt className="text-gray-400" />
          <span>{notice?.userId?.name || 'Anonymous'}</span>
        </div>
        <div className="flex items-center gap-1">
          <RiCalendarLine className="text-gray-400" />
          <span>Posted: {notice.date || '2025-12-20'}</span>
        </div>
        {(role === "cr" || role === "teacher") && (
          <button onClick={deleteC} className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition flex items-center gap-1">
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default Notice
