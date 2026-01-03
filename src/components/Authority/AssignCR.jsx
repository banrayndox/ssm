import React, { useEffect, useState } from 'react'
import api from '../../helper/api'
const AssignCR = ({isClose}) => {
 const [students, setStudents] = useState([])
 const [sections, setSections] = useState([])
 const [selectedCR, setSelectedCR] = useState('')
 const [selectedSection, setSelectedSection] = useState('')

    const getStudents = async () => {
    const response = await api.get('/authority/users-list')
    if(response.data.success){
      setStudents(response.data.users)
    }
  }
    const getSections = async () => {
    const response = await api.get('/authority/section-list')
    if(response.data.success){
      setSections(response.data.sections)
    }
  } 
 
  useEffect(()=>{
  getStudents()
  getSections()
  },[])

  const add = async() =>{
    const response = await api.post('/authority/assign-cr',{userId: selectedCR, sectionId: selectedSection})

    if(response.data.success){

      
      isClose()
    }
  }
  return (
  
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-125 shadow-xl px-5'>


      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Assign CR</h1>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Choose Section</p>
     <select name="section" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=> setSelectedSection(e.target.value)}>
     <option value="" disabled selected  className='text-xs'>Choose a section</option>
      {sections.map((sec)=>{
      return <option key={sec._id} value={sec._id}>{sec.name}</option>
      })}
      </select>
     <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Choose CR</p>
     <select name="cr" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=> setSelectedCR(e.target.value)}>
     <option value="" disabled selected  className='text-xs'>Choose a CR</option>
      {students.map((s,i)=>{
      return <option key={s._id} value={s._id}>{s.name}</option>
      })}
      </select>      
             
      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>Assign CR</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
  )
}

export default AssignCR
