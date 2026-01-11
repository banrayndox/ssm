import React, { useState } from 'react'
import api from '../../helper/api'
import toast from 'react-hot-toast'
const JoinCourse =({onClose, onAdded}) => {
  const [passkey, setPasskey] = useState('')
    const add = async () => {
    if(passkey=='' ) return
  const response = await api.post('/student/join-course',{passKey: passkey})
   if(response.data.success) {
     onClose()
     onAdded()
 toast.success('Course Enrolled Successfully')
   }else{
    toast.error('Something went wrong')
   }
  }

  return (
    <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-full h-85 shadow-xl px-10'>
      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Enroll a course</h1>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Enter PassKey</p>
      <input type="text" placeholder='paste your teacher given passkey' onChange={(e)=>setPasskey(e.target.value)} className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-xs mt-1' />
      
             
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>Enroll</button>
      <button onClick={onClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>
    </div>
  )
}

export default JoinCourse
