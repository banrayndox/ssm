import React, { useContext, useEffect, useState } from 'react'
import Exam from '../../components/User/Exam'
import AddExam from '../../components/Teacher/AddExam'
import { AppContext } from '../../store/AppContext'
import { RiCalendarScheduleLine } from "react-icons/ri";
import api from '../../helper/api'
import Loader from '../../components/Loader';
const Exams = () => {
 const [loading, setLoading] = useState(false)

  const {state} = useContext(AppContext)
  const role = state?.user?.role
  const userId = state?.user?._id

  const [list, setList] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [isOpen, setIsOpen] = useState(false)

  const getList = async () => {
    try {
      setLoading(true)
      const response = await api.post('/common/get-communication',{type:'exam'})
      if(response.data.success){
        setList(response.data.communications)
      }
    } catch (err) {
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getList()
  },[])

  const courses =
    role === "student"
      ? state.user.enrolledCourses || []
      : 
       state.user.createdCourses || []
 
  const filteredList =
    selectedCourse === "all"
      ? list
      : list.filter((n) => n?.enrollmentId?._id === selectedCourse)

  const canAddExam = () => {
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
  }

  return (
    <div className='relative'>
      {loading && <Loader />}
      {isOpen && (
        <div className="flex fixed inset-0 z-50 items-center justify-center">
          <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
          <div className="absolute">
            <AddExam getList={getList} isClose={()=> setIsOpen(false)} courses={courses} selectedCourse={selectedCourse}/>
          </div>
        </div>
      )}

      <div className='pt-10 flex justify-between px-5 items-center'>
        <div className="flex items-center gap-2 cursor-pointer text-[#4F46E5]">
          <RiCalendarScheduleLine />
          <span className="text-xl font-medium">Upcoming Exams</span>
        </div>
        {canAddExam() && (
          <button onClick={()=>setIsOpen(true)} className="text-sm font-mono border-[1px] rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300">
            ADD
          </button>
        )}
      </div>

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

      {/* Render exams */}
      <div className='pt-4 px-5 space-y-2'>
        {filteredList.map(exam => (
          <Exam getList={getList} key={exam._id} exam={exam} />
        ))}
      </div>
    </div>
  )
}

export default Exams
