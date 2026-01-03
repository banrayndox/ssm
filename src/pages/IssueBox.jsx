import React, { useContext, useEffect, useState } from 'react'
import Issue from '../components/User/Issue'
import SubmitIssue from '../components/User/SubmitIssue'
import { MdComment } from "react-icons/md";
import { AppContext } from '../store/AppContext'
import api from '../helper/api'
const IssueBox = () => {
    const [isOpen, setIsOpen] = useState(false)
     const {state} = useContext(AppContext)
     const role = state?.user?.role

 const [list, setList] = useState([])
   const getList = async () => {
    const response = await api.post('/user/get-communication',{type:'issue'})
    if(response.data.success){
      setList(response.data.communications)
    }
  }
  useEffect(()=>{
    getList()
  },[])
  return (
    <div className='relative'>
       {isOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <SubmitIssue isClose={()=> setIsOpen(false)} />
       </div>
       </div>
      ) } 
   <div className='pt-10 flex justify-between px-5'><div className="flex items-center gap-2 cursor-pointer  text-[#4F46E5] ">
    <MdComment />

        <span className="text-xl font-medium">Submit your Issues here</span>
      </div>        
   { (role == "student")  &&
    (<button onClick={()=>setIsOpen(true)} className={"text-sm font-mono border-[1px]  rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 "}>Submit</button>
    )
  }
    </div> 
    {list.map(issue=>(
      <Issue key={issue._id} issue={issue} />
    ))}

    </div>
  )
}

export default IssueBox
