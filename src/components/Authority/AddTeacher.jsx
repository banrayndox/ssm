import React, { useEffect, useState } from 'react'
import Deptarment from './Deptarment'
import api from '../../helper/api'
import toast from 'react-hot-toast'
const AddTeacher = ({isClose, added}) => {
  const [departments, setDepartments] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [initialId, setInitialId] = useState('')
  const [teacherCode, setTeacherCode] = useState('')
  const [room, setRoom] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const getList = async () => {
    const response = await api.get('/authority/department-list')
    if(response.data.success){
      setDepartments(response.data.departments)
    }
  }
  useEffect(()=>{
  getList()
  },[])
  const add = async() =>{
    const response = await api.post('/authority/add-teacher',{name, email, teacherInitial: initialId, teacherId: teacherCode, roomNo: room, role:'teacher', departmentId})
    if(response.data.success){
      toast.success("New Teacher Added");
      added()
      isClose()
    }else{
      toast.error("Something Went Wrong!");
    }
  }
  return (
  
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-160 px-5'>


      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Assign New Teacher</h1>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Teacher Name</p>
      <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='ex: 01' className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' />
      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Teacher's Email</p>
      <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='ex: 01' className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' />
      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Teacher's Initial</p>
      <input onChange={(e)=>setInitialId(e.target.value)} type="text" placeholder='ex: 01' className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' />
      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Teacher's ID</p>
      <input onChange={(e)=>setTeacherCode(e.target.value)} type="text" placeholder='ex: 01' className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' />
      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Room No</p>
      <input onChange={(e)=>setRoom(e.target.value)} type="text" placeholder='ex: AB4' className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' />

       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Choose Department</p>

      <select name="department" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=> setDepartmentId(e.target.value)} >
    <option value="" disabled selected className='text-xs'>Choose a department</option>
      {departments.map((dept)=>{
      return <option key={dept._id} value={dept._id}>{dept.name}</option>
      })}
      </select>

 
             
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>ADD Teacher</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
  )
}

export default AddTeacher
