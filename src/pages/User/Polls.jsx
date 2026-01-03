import React, { useContext, useEffect, useState } from 'react'
import Poll from '../../components/User/Poll'
import CreateNewPoll from '../../components/CR/CreateNewPoll'
import { AppContext } from '../../store/AppContext'
import { FaPoll } from "react-icons/fa";
import api from '../../helper/api'
const Polls = () => {
  const {state} = useContext(AppContext)
  const role = state?.user?.role
console.log('rendering')
 const [list, setList] = useState([])
   const getList = async () => {
    const response = await api.post('/user/get-communication',{type:'poll'})
    if(response.data.success){
      console.log(response.data)
      setList(response.data.communications)
    }else{
      console.log('failed')
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
       <CreateNewPoll isClose={()=> setIsOpen(false)} />
       </div>
       </div>
      ) } 
<div className='pt-10 flex justify-between px-5'> <div className="flex items-center gap-2 cursor-pointer  text-[#4F46E5] ">
<FaPoll />
  <span className="text-xl font-medium">Section Polls</span>
</div>
   { (role == "cr")  &&
    (<button onClick={()=>setIsOpen(true)} className={"text-sm font-mono border-[1px]  rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 "}>ADD</button>
    )
  }
    </div> 
     {list.map(poll => (
        <Poll key={poll._id} poll={poll} />
      ))}
    </div>
  )
}

export default Polls
