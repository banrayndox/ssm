import React, { useContext, useState } from 'react'
import { AppContext } from '../../store/AppContext'
import { FaThumbsUp, FaClock, FaCheckCircle } from 'react-icons/fa'
import { MdReport } from 'react-icons/md'
import api from '../../helper/api'

const Issue = ({ issue }) => {
  const { state } = useContext(AppContext)
  const role = state?.user?.role
  const [upvotes, setUpvotes] = useState(issue.upvotes?.length || 0)
  const [status, setStatus] = useState(issue.status)

  const handleUpvote = async () => {
    try {
      const response = await api.post('/user/upvote', { id: issue?._id })
      if (response.data.success) {
        setUpvotes(response.data.upvotes?.length || 0)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const done = async () => {
    try {
      const response = await api.post('/user/resolve', { issueId: issue._id })
      if (response.data.success) {
        setStatus('resolved')
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Format date safely
  const formatDate = (date) => date ? new Date(date).toLocaleString() : 'N/A'

  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all m-4 p-4 space-y-3 bg-white">
       
        <div>
          <h2 className="text-xs font-semibold text-gray-900">
            Reported by: <span className="font-normal">{issue.userId?.name || "Anonymous"}</span>
          </h2>
        </div>
      {/* Badges */}
      <div className="flex space-x-2">
        {issue.category && (
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-100 text-amber-700">
            {issue.category.toUpperCase()}
          </span>
        )}
        {status && (
          <span className={`text-xs font-mono px-3 py-1 rounded-full ${
            status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
          }`}>
            {status.toUpperCase()}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="text-xs text-gray-700 leading-relaxed py-2">
        {issue.content}
      </div>

      {/* Dates */}
      <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 gap-1">
        <div className="flex items-center gap-1">
          <MdReport className="text-gray-400" /> Reported: {formatDate(issue.reportedAt)}
        </div>
        {status === 'resolved' && (
          <div className="flex items-center gap-1">
            <FaCheckCircle className="text-green-400" /> Resolved: {formatDate(issue.resolvedAt)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-gray-600 text-xs">
          <FaThumbsUp className="text-gray-500" /> {upvotes} Upvotes
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {role === 'student' && status !== 'resolved' && (
            <button
              onClick={handleUpvote}
              className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition flex items-center gap-1"
            >
              Upvote
            </button>
          )}

          {role === 'cr' && status === 'pending' && (
            <button
              onClick={done}
              className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition flex items-center gap-1"
            >
              <FaCheckCircle /> Done
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Issue
