import React, { useContext, useEffect, useState } from 'react'
import Poll from '../../components/User/Poll'
import CreateNewPoll from '../../components/CR/CreateNewPoll'
import { AppContext } from '../../store/AppContext'
import { FaPoll } from "react-icons/fa";
import api from '../../helper/api'
import Loader from '../../components/Loader';
const Polls = () => {
  const [loading, setLoading] = useState(false)
  const {state} = useContext(AppContext)
  const role = state?.user?.role
  const userId = state?.user?._id

  const [list, setList] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [isOpen, setIsOpen] = useState(false)

  // Fetch polls
  const getList = async () => {
    try {
      setLoading(true)
      const response = await api.post('/common/get-communication',{type:'poll'})
      if(response.data.success){
        setList(response.data.communications)
      } else {
      
      }
    } catch (err) {

    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getList()
  },[])

  // Courses based on role
  const courses =
    role === "student"
      ? state.user.enrolledCourses || []
      : 
       state.user.createdCourses || []
 

  // Filtered polls by selected course
  const filteredList =
    selectedCourse === "all"
      ? list
      : list.filter((n) => n?.enrollmentId?._id === selectedCourse)

  // Determine Add button visibility

const canAddPoll = () => {
  if (role === "teacher") {
    return selectedCourse !== "all";
  }

  if (role === "student") {
    if (selectedCourse === "all") return false;

    const courseEnrollment = state.user.enrolledCourses.find(
      (enroll) => enroll._id === selectedCourse
    );
    const crId = courseEnrollment?.crId?._id || courseEnrollment?.crId;
    return crId?.toString() === userId?.toString();
  }

  return false;
};


  return (
    <div className='relative'>
            {loading && <Loader />}
      {/* Add poll modal */}
      {isOpen && (
        <div className="flex fixed inset-0 z-50 items-center justify-center">
          <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
          <div className="absolute">
            <CreateNewPoll  getList={getList} isClose={()=> setIsOpen(false)} courses={courses} enrollmentId={selectedCourse}/>
          </div>
        </div>
      )}

      {/* Header */}
      <div className='pt-10 flex justify-between px-5 items-center'>
        <div className="flex items-center gap-2 text-[#4F46E5]">
          <FaPoll />
          <span className="text-xl font-medium">Section Polls</span>
        </div>

        {canAddPoll() && (
          <button onClick={()=>setIsOpen(true)} className="text-sm font-mono border-[1px] rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300">
            ADD
          </button>
        )}
      </div>

      {/* Course filter dropdown */}
<div className="px-5 pt-4">
  {courses.length > 0 ? (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Filter by course
      </label>

      {/* Select */}
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="
          w-full sm:w-auto
          bg-gray-100 text-sm
          px-3 py-2
          rounded-md border
          outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      >
        <option value="all">All Courses</option>

        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.courseId?.code} — {c.courseId?.name} ({c.section})
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
      <span>
        {role === "student"
          ? "No courses enrolled"
          : "No courses assigned"}
      </span>
    </div>
  )}
</div>


      {/* Render filtered polls */}
      <div className='pt-4 px-5 space-y-2'>
        {filteredList.map(poll => (
          <Poll getList={getList} key={poll._id} poll={poll} />
        ))}
      </div>
    </div>
  )
}

export default Polls
