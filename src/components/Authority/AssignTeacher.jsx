import React, { useEffect, useState } from 'react'
import api from '../../helper/api'
const AssignTeacher = ({isClose}) => {

  const [sections, setSections] = useState([])
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])

  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
    const getTeachers = async () => {
    const response = await api.get('/authority/users-list')
    if(response.data.success){
      const teacherList = response.data.users.filter(user => user.role === 'teacher')
      setTeachers(teacherList)
    }
  }
    const getSections = async () => {
    const response = await api.get('/authority/section-list')
    if(response.data.success){
      setSections(response.data.sections)
    }
  } 
    const getCourses = async () => {
    const response = await api.get('/authority/course-list')
    if(response.data.success){
      setCourses(response.data.courses)
    }
  }   
  useEffect(()=>{
  getTeachers()
  getSections()
  getCourses()
  },[])

  const add = async() =>{
    const response = await api.post('/authority/assign-teacher-course-section',{userId: selectedTeacher, sectionId: selectedSection, courseId: selectedCourse})
    if(response.data.success){
      isClose()
    }
  }
  return (
    <div>
        
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-122 shadow-xl px-5'>

 

    <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Assign Teacher to Course</h1>
    <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Select Teacher</p>
    <select name="teacher" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=>setSelectedTeacher(e.target.value)} >
    <option value="" disabled selected className='text-xs'>Choose a teacher...</option>
      {teachers.map((teacher)=>{
      return <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
      })}
      </select>
    <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Select Course</p>
      <select name="course" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=>setSelectedCourse(e.target.value)}>
    <option value="" disabled selected className='text-xs'>Choose a course...</option>
      {courses.map((course)=>{
      return <option key={course._id} value={course._id}>{course.name}</option>
      })}
      </select>
  
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Select a Section</p>
      <select name="section" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e) => setSelectedSection(e.target.value)} >
     <option value="" disabled selected className='text-xs'>Choose</option>
      {sections.map((section)=>{
      return <option key={section._id} value={section._id}>{section.name}</option>
      })}
      </select>

  


      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>Assign Teacher</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
    </div>
  )
}

export default AssignTeacher
