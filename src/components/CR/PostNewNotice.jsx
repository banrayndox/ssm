import React, { useState } from 'react'
import api from '../../helper/api'
const PostNewNotice = ({isClose}) => {
 const category = ["Class", "Exam", "Emergency"]
 const [title, setTitle] = useState('')
 const [content, setContent] = useState('')
 const [selectedCategory, setSelectedCategory] = useState('')
 const add = async () => {
   const response = await api.post('/user/add-communication',{title, content, category:selectedCategory, type:'notice'})
   if(response.data.success) {
    isClose()
    console.log('success')
   }
 }
  return (
    <div>
        
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-120 shadow-xl px-5'>

 

      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Post New Notice</h1>
       
    <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Notice Title</p>
      <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter Notice Title' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' />
   

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Content</p>
      <input onChange={(e)=>setContent(e.target.value)} type="text" placeholder='Enter Notice Content..' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-5 rounded-md text-sm mt-1' />
     <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Category</p>

      <select name="category" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=>setSelectedCategory(e.target.value)} >
    <option value="" disabled selected className='text-xs'>Choose a Category</option>
      {category.map((cat,i)=>{
      return <option key={i} value={cat}>{cat}</option>
      })}
      </select>
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>Post Notice</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
    </div>
  )
}

export default PostNewNotice
