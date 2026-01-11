import React, { useState } from 'react'
import api from '../../helper/api'
import toast from 'react-hot-toast'
const AddNewDepartment = ({onClose, onAdded}) => {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
    const add = async () => {
    if(name=='' || code=='') return
  const response = await api.post('/authority/add-dept',{name, code})
   if(response.data.success) {
     onClose()
     onAdded()
     toast.success("Department Added");
   }else{
    toast.error("Something went wrong");
   }
  }

  return (
    <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-full h-85 shadow-xl px-10'>
      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Add New Department</h1>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Department Name</p>
      <input type="text" placeholder='Computer Science' onChange={(e)=>setName(e.target.value)} className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' />
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Department Code</p>
      <input type="text" placeholder='CSE' onChange={(e)=>setCode(e.target.value)} className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' />
             
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>ADD Department</button>
      <button onClick={onClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>
    </div>
  )
}

export default AddNewDepartment
