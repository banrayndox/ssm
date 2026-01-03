import React, { useContext, useEffect, useState } from 'react'
import Notice from '../../components/User/Notice'
import PostNewNotice from '../../components/CR/PostNewNotice'
import { AppContext } from '../../store/AppContext'
import api from '../../helper/api'
import { FaPaperPlane } from "react-icons/fa6";
const Notices = () => {
  const {state} = useContext(AppContext)
  const role = state?.user?.role
  const [list, setList] = useState([])
   const getList = async () => {
    const response = await api.post('/user/get-communication',{type:'notice'})
    if(response.data.success){
      setList(response.data.communications)
    }
  }

  useEffect(()=>{  
getList()
  },[])

  const dept = ["CSE", "EEE", "CIS"]
  const batch = ["251","252"]
  const section = ["A","C","Z"]
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='relative'>
       {isOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <PostNewNotice isClose={()=> setIsOpen(false)} />
       </div>
       </div>
      ) } 
       
     { (role=="teacher") && (  <div className='flex justify-between px-4'>
       <div className='flex justify-between space-x-2.5 pt-4'>
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Dept</p>
      <select name="id" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' id="department">
     <option value="" disabled selected className='text-xs'>Choose</option>
      {dept.map((cat,i)=>{
      return <option key={i} value={cat}>{cat}</option>
      })}
      </select>
      </div>   
             <div className='flex justify-between space-x-2.5 pt-4'>
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Batch</p>
      <select name="id" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' id="department">
     <option value="" disabled selected className='text-xs'>Choose</option>
      {batch.map((cat,i)=>{
      return <option key={i} value={cat}>{cat}</option>
      })}
      </select>
      </div>   
             <div className='flex justify-between space-x-2.5 pt-4'>
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Sec</p>
      <select name="id" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' id="department">
     <option value="" disabled selected className='text-xs'>Choose</option>
      {section.map((cat,i)=>{
      return <option key={i} value={cat}>{cat}</option>
      })}
      </select>
      </div>   
      </div>
     ) }
   <div className='pt-10 flex justify-between px-5'> <div className="flex items-center gap-2 cursor-pointer  text-[#4F46E5] ">
  <FaPaperPlane />
  <span className="text-xl font-medium">Section Notices</span>
</div>
 
   { (role == "teacher" || role == "cr")  &&
    (<button onClick={()=>setIsOpen(true)} className={"text-sm font-mono border-[1px]  rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 "}>ADD</button>
    )
  }
    </div> 
    {list.map(l=>(
      <Notice key={l._id} notice={l} />
    ))}

    </div>
  )
}

export default Notices
