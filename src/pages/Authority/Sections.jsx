import React, { useContext, useEffect, useState } from 'react'
import Section from '../../components/Authority/Section'
import AddNewSection from '../../components/Authority/AddNewSection'
import api from '../../helper/api'
import { AppContext } from '../../store/AppContext'
const Sections = () => {
  const {state} = useContext(AppContext)
  const user = state?.user
  const [sections, setSections] = useState([])
 
     const getList = async () => {
    const response = await api.get('/authority/section-list')
    if(response.data.success){
      setSections(response.data.sections)
    }
  }

  useEffect(()=>{

getList()
  },[])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='relative'>
      {isOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <AddNewSection onAdded={getList} isClose={()=> setIsOpen(false)} />
       </div>
       </div>
      ) } 

      
            <div className='flex  pl-5 pt-6 gap-5'>
        <div className='w-45'>
            <input  className='bg-gray-100 rounded-lg h-8 text-center text-sm outline-gray-300 text-gray-600 '  placeholder='Search sections...'></input>
        </div>
        <div>
       
            <button onClick={()=>setIsOpen(true)} className={"text-sm font-mono border-[1px]  rounded-lg px-6 py-1 transition bg-black text-white border-[1px] hover:bg-gray-200 hover:border-gray-300  hover:text-gray-900"}>ADD Section</button>

        </div>
        </div>  
{sections.map((section)=>{
  return  <Section key={section._id} onDeleted={getList} section={section}/>
})}
    </div>
  )
}

export default Sections
