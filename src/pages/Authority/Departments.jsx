import React, { useEffect, useState } from 'react'
import Deptarment from '../../components/Authority/Deptarment'
import AddNewDepartment from '../../components/Authority/AddNewDepartment';

import api from '../../helper/api.js'
const Departments = () => {
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
  const [isOpen,setIsOpen] = useState(false)
  return (
    <div className='relative'>
    {isOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <AddNewDepartment onAdded={getList} onClose={()=> setIsOpen(false)} />
       </div>
       </div>
      ) } 

        <div className='flex  pl-5 pt-6 gap-5'>
        <div className='w-45'>
            <input  className='bg-gray-100 rounded-lg h-8 text-center text-sm outline-gray-300 text-gray-600 '  placeholder='Search departments...'></input>
        </div>
        <div>
       
            <button onClick={()=>setIsOpen(true)} className={"text-sm font-mono border-[1px]  rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 "}>ADD Department</button>

        </div>
        </div>  
 {departments.map(dept => (
   <Deptarment  onDeleted={getList} key={dept._id} dept={dept} />
  ))}
  </div> 
  )
}

export default Departments
