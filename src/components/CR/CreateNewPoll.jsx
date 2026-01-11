import React, { useContext, useState } from 'react'
import api from '../../helper/api'
import toast from 'react-hot-toast'
const CreateNewPoll = ({isClose, enrollmentId, getList}) => {

  const [content, setContent] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
     const add = async () => {
    const response = await api.post('/common/add-communication',{enrollmentId, type:'poll',  content, option1, option2})
    if(response.data.success){
      getList()
      isClose()
      toast.success('Poll Added')
    }else{
          toast.error('Something Went Wrong!')
    }
  }
  return (
    <div>
        
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-125 shadow-xl px-5'>

 

      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Create New Poll</h1>
       
     {/* <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Poll Question</p>
      <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter poll question' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' /> */}
      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Description</p>
      <input onChange={(e)=>setContent(e.target.value)} type="text" placeholder='Enter poll description' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-5 rounded-md text-sm mt-1' />
       
     <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Options</p>
      <input onChange={(e)=>setOption1(e.target.value)} type="text" placeholder='Option 1' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' />
      <input onChange={(e)=>setOption2(e.target.value)} type="text" placeholder='Option 2' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' />
 

      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>Create Poll</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
    </div>
  )
}

export default CreateNewPoll
