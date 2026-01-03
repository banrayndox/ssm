import React, { use, useEffect, useState } from 'react'
import api from '../../helper/api'
const AddCourse = ({isClose, onAdded}) => {

  const semester = ["1", "2", "3","4","5","6","7","8","9","10","11","12"]
  const [departments, setDepartments] = useState([])
  const getList = async () => {
    const response = await api.get('/authority/department-list')
    if(response.data.success){
      setDepartments(response.data.departments)
    }
  }
  useEffect(()=>{
  getList()
  },[])
  const [departmentId, setDepartmentId] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  
    const add = async () => {
    if(!selectedSemester || !departmentId || name=='' || code=='') return
  const response = await api.post('/authority/add-course',{name, code, departmentId, semester: selectedSemester})
   if(response.data.success) {
     isClose()
     onAdded()
   }
  }
  return (
    <div>
        
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-122 shadow-xl px-5'>

 

    <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Assign Course</h1>
    <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Department</p>
    <select name="department" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1'  onChange={(e) => setDepartmentId(e.target.value)}>
    <option value="" disabled selected className='text-xs'>Choose a department</option>
      {departments.map((dept)=>{
      return <option key={dept._id} value={dept._id}>{dept.name}</option>
      })}
      </select>
    <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Semester</p>
      <select name="semester" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e) => setSelectedSemester(e.target.value)}>
    <option value="" disabled selected className='text-xs'>Choose a Semester</option>
      {semester.map((sem,i)=>{
      return <option key={i} value={sem}>{sem}</option>
      })}
      </select>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Course Name</p>
      <input type="text" placeholder='e.g., Data Structure' className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=>setName(e.target.value)}/>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Course Code</p>
      <input type="text" placeholder='e.g., CSE101' className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=>setCode(e.target.value)}/>


     
             
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>Assign Course</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
    </div>
  )
}

export default AddCourse
