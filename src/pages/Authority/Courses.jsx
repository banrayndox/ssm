import React, { useContext, useEffect, useState } from 'react'
import Course from '../../components/Authority/Course'
import AddCourse from '../../components/Authority/AddCourse'
import { AppContext } from '../../store/AppContext'
import api from '../../helper/api'
import TCourse from '../../components/Teacher/TCourse'
const Courses = () => {
  const {state} = useContext(AppContext)
  const role = state?.user?.role
  if(role=='teacher') return <TCourse />
  const [courses, setCourses] = useState([])
  const getList = async () => {
    const response = await api.get('/authority/course-list')
    if(response.data.success){
      setCourses(response?.data?.courses)
    }
  }
  useEffect(()=>{
  getList()
  },[])
  const [isOpen, setIsOpen] = useState(false)
  return (
  <div className='relative'>
        {isOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <AddCourse onAdded={getList} isClose={()=> setIsOpen(false)} />
       </div>
       </div>
      ) } 
  <div className='flex justify-between px-5 pt-10'>
  <h1 className='font-semibold leading-relaxed text-start'>Assigned Courses</h1>
     { (role == "authority")  &&
    (<button onClick={()=>setIsOpen(true)} className={"text-sm font-mono border-[1px]  rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 "}>Add Course</button>
    )
  }
  </div>
    {courses.map((course)=>(
      <Course onDeleted={getList} key={course?._id} course={course} />
    ))}
    </div>
  )
}

export default Courses
