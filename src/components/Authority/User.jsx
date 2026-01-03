import React from 'react'
import api from '../../helper/api'
const User = ({onDeleted}) => {
      const deleteUser = async () => {
    const response = await api.delete('/authority/delete-course', { data:  {courseId: course._id} })
    if(response.data.success){
      onDeleted()
    }
  }
  return (
     <div className='bg-white border-[1px] rounded-xl border-gray-200 py-4 px-2 m-4 flex'>
      <div className='flex '>
        <p className='flex bg-cyan-100 h-14 w-14 rounded-full items-center justify-center text-gray-700'>img</p>
        <div className='ml-4'>
            <div className='flex space-x-2'>
                <h1 className='font-semibold text-sm text-gray-900'>RAKIB BISWASH</h1>
                <p className='text-xs bg-green-100 rounded-xl px-1 border-[1px] border-green-300'>STUDENT</p>
            </div>
            <div className='flex space-x-4 mt-5'>
                <p className='text-xs'>banrayndox@gmail.com</p>
                <p className='text-xs'>Computer Science</p>
            </div>
        </div>
      </div>
      <div className='flex space-x-1'>
         <button className='bg-white text-gray-900 w-[80%] py-2 border-[1px] border-gray-300 rounded-md text-xs hover:bg-gray-200 transition font-semibold text-start mb-4'><p className='px-2'>ED</p></button>
         <button className='bg-white text-gray-900 w-[80%] py-2 border-[1px] border-gray-300 rounded-md text-xs hover:bg-gray-200 transition font-semibold text-start mb-4'><p className='px-2'>DE</p></button>
      </div>
    </div>
  )
}

export default User
