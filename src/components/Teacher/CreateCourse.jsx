import React, { useState } from 'react'
import api from '../../helper/api'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { AppContext } from '../../store/AppContext'
const CreateCourse =({onClose, onAdded}) => {
  const { state } = useContext(AppContext)
  const user = state?.user
    const [courses,setCourses] = useState([])
  const [passkey, setPasskey] = useState('')
  const [section, setSection] = useState('')
  const type = ['retake', 'regular']
  const [selectedType, setSelectedType ] = useState('')
  const [courseId, setCourseId] = useState('')
    const add = async () => {
      if(courseId=='' || selectedType=='' || passkey=='' || section=='') return toast.error('All fields required.')
    if(passkey=='' ) return toast.error('Blank PassKey not allowed!!')
        if(passkey.length < 12 ) return toast.error('PassKey should more than 11 characters')  
try {
    const response = await api.post('/teacher/create-course',{courseId,passKey: passkey, section, type: selectedType})
   if(response.data.success) {
     onClose()
     onAdded()
     toast.success('Course Offered Successfully')
   }else{
 toast.error(err.response?.data?.message || 'Something went wrong');
   }
} catch (error) {
   toast.error(error.response?.data?.message || 'Something went wrong');
}
  }
    const getList = async () => {
    const response = await api.get('/authority/course-list')
    if(response.data?.success){
const userDepartmentId = user?.departmentId?._id
const filteredCourses = response.data?.courses?.filter(
  course => course?.departmentId?._id === userDepartmentId
);
setCourses(filteredCourses);
    }
  }
  useEffect(()=>{
  getList()
  },[])

  return (
    <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-full h-120 shadow-xl px-10'>
      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Enroll a course</h1>
      

    <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Courses</p>
    <select name="department" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1'  onChange={(e) => setCourseId(e.target.value)}>
    <option value="" disabled selected className='text-xs'>Choose a Course</option>
      {courses.map((c)=>{
      return <option key={c._id} value={c._id}>{c.code} - {c.name}</option>
      })}
      </select>
      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Section</p>
      <input type="text" placeholder='e.g., 68_A' onChange={(e)=>setSection(e.target.value)} className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-xs mt-1' />
          <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Type</p>
    <select name="department" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1'  onChange={(e) => setSelectedType(e.target.value)}>
    <option value="" disabled selected className='text-xs'>Choose type</option>
      {type.map((t,i)=>{
      return <option key={i} value={t}>{t}</option>
      })}
      </select>
      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Enter PassKey</p>
      <input type="text" placeholder='e.g., cse101secaregularrayndox7' onChange={(e)=>setPasskey(e.target.value)} className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-xs mt-1' />
     
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>Enroll</button>
      <button onClick={onClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>
    </div>
  )
}

export default CreateCourse
