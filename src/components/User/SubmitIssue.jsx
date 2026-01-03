import React, { useState } from 'react'
import api from '../../helper/api'
const SubmitIssue = ({isClose}) => {
    const category = ["Classroom", "Facilities", "Academic", "Other" ]
    const [selectedCategory, setSelectedCategory] = useState('')
    const [content, setContent] = useState('')
    const add = async () => {
    const response = await api.post('/user/add-issue',{category:selectedCategory, content, status: 'pending'})
    if(response.data.success){
      // isClose()
      console.log('Success')
    }else{
      console.log('failed')
    }
    }
  return (
    <div>
        
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-92 shadow-xl px-5'>

 

      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Submit Anonymous Issue</h1>
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Category</p>

      <select name="category" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=>setSelectedCategory(e.target.value)}>
    <option value="" disabled selected className='text-xs'>Choose a Category</option>
      {category.map((cat,i)=>{
      return <option key={i} value={cat}>{cat}</option>
      })}
      </select>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Issue Description</p>
      <input onChange={(e)=>setContent(e.target.value)} type="text" placeholder='Describe the issue anonymousely..' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-5 rounded-md text-sm mt-1' />
             
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>Submit Issue</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
    </div>
  )
}

export default SubmitIssue
