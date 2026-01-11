import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../store/AppContext'
import { FaVoteYea, FaCalendarAlt, FaTrash } from 'react-icons/fa'
import api from '../../helper/api'
import toast from 'react-hot-toast'

const Poll = ({ poll,getList }) => {
  const { state } = useContext(AppContext)
  const role = state?.user?.role
  const userId = state?.user?._id
  const [votes1, setVotes1] = useState(0)
  const [votes2, setVotes2] = useState(0)
  const [votedOption, setVotedOption] = useState(null)
const getResult = async () => {
    try {
      const response = await api.post('/common/vote-result', { pollId: poll._id })
      if (response.data.success) {
        const result = response.data.result
        setVotes1(result.option1Votes?.length || 0)
        setVotes2(result.option2Votes?.length || 0)
        if (result.option1Votes?.some(u => u.toString() === userId)) setVotedOption('option1')
        else if (result.option2Votes?.some(u => u.toString() === userId)) setVotedOption('option2')
        else setVotedOption(null)
      }
    } catch (err) {
      console.error('Error getting poll result:', err)
    }
  }
useEffect(()=>{
 getResult()
},[])
  const handleVote = async (option) => {
    if (!option) return
    try {
      const response = await api.post('/common/vote', {
        pollId: poll._id,
        selectedOption: option
      })
      if (response.data.success) {
    toast.success('Voted!')
        getResult()
      }else{
    toast.error('Something Went Wrong!')
      }
    } catch (err) {
      console.error('Voting error:', err)
    }
  }


  const deleteC = async () => {
    try {
      const response = await api.delete('/common/delete-communication', { data: { communicationId: poll._id } })
      if (response.data.success) {
      toast.success('Poll Deleted')
      getList()
      }else{
            toast.error('Something Went Wrong!')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all m-4 p-4 space-y-4">

      {/* Poll Content */}
      <div className="text-center">
        <p className="text-xs text-gray-800 leading-relaxed">{poll?.content}</p>
      </div>

 
      <div className={`space-y-2 `}>
      
        <button 
          onClick={() => handleVote('option1')}
          disabled={!!votedOption }
          className={`flex items-center justify-between w-full py-2 px-3 text-xs font-semibold border rounded-md transition ${role==="cr"? "cursor-not-allowed" : ""}
            ${votedOption === 'option1' ? 'bg-purple-100 text-purple-700 border-purple-300' : 'bg-white border-gray-300 hover:bg-purple-50 hover:text-purple-700'}
            ${votedOption && votedOption !== 'option1' ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <span>{poll.option1 || "Option 1"}</span>
          <div className="flex items-center gap-1">
            <FaVoteYea className="text-purple-500" /> {votes1}
          </div>
        </button>

        <button 
          onClick={() => handleVote('option2')}
         disabled={!!votedOption }
          className={` flex items-center justify-between w-full py-2 px-3 text-xs font-semibold border rounded-md transition ${role==="cr"? "cursor-not-allowed" : ""}
            ${votedOption === 'option2' ? 'bg-purple-100 text-purple-700 border-purple-300' : 'bg-white border-gray-300 hover:bg-purple-50 hover:text-purple-700'}
            ${votedOption && votedOption !== 'option2' ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <span>{poll.option2 || "Option 2"}</span>
          <div className="flex items-center gap-1">
            <FaVoteYea className="text-purple-500" /> {votes2}
          </div>
        </button>
      </div> 

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500 mt-3 px-1">
          
        <p className="flex items-center gap-1">
          <FaCalendarAlt /> By: {poll?.createdBy?.name }
        </p>
        <p className="flex items-center gap-1">
          <FaCalendarAlt /> Ends: {poll?.endDate || "2025-12-23"}
        </p>
        {role === "teacher" && (
          <button 
            onClick={deleteC} 
            className="flex items-center gap-1 bg-white text-gray-900 border border-gray-300 rounded-md text-xs hover:bg-red-50 hover:text-red-600 transition font-semibold px-2 py-1"
          >
            <FaTrash /> DELETE
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500"> {poll?.enrollmentId?.courseId?.name}</p>
    </div>
  )
}

export default Poll
