import React, { useEffect, useState } from 'react'
import api from '../../helper/api'
import toast from 'react-hot-toast'
const AddExam = ({isClose, selectedCourse, getList}) => {
    const type = ["Quiz", "Assignment", "Presentation", "Project Showcase" ]
    const [selectedType, setSelectedType] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [syllabus, setSyllabus] = useState('')

    const add = async () => {
     const response = await api.post('/common/add-communication',{enrollmentId: selectedCourse, time, duration, syllabus, date, type:'exam', category:selectedType})
     if(response.data.success){
      isClose()
      getList()
      toast.success('Exam Added')
     }else{
      toast.error('Something Went Wrong!')
     }
    }
  return (
    <div>
        
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-122 shadow-xl px-5'>
     <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Add Exam/Assignment</h1>
 
    <div className='flex justify-between space-x-2.5 pt-4'>
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Type</p>
      <select name="type" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=>setSelectedType(e.target.value)}>
     <option value="" disabled selected className='text-xs'>Choose a type</option>
      {type.map((t,i)=>{
      return <option key={t} value={t}>{t}</option>
      })}
      </select>
     <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Date</p>
      <input onChange={(e)=>setDate(e.target.value)} type="text" placeholder='Describe the issue anonymousely..' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' />
      </div>

    <div className='flex justify-between space-x-2.5 pt-4'>
    <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Time</p>
    <input onChange={(e)=>setTime(e.target.value)} type="text" placeholder='e.g., 10:00 AM' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' />
     <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Duration</p>
    <input onChange={(e)=>setDuration(e.target.value)} type="text" placeholder='e.g., 2 hours' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' />
    </div>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Syllabus</p>
      <input onChange={(e)=>setSyllabus(e.target.value)} type="text" placeholder='Enter syllabus details' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-5 rounded-md text-sm mt-1' />
             
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-5 "}>Submit Exam</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
    </div>
  )

}

export default AddExam
