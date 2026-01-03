import React, { useContext, useEffect, useState } from 'react'
import Task from '../../components/CR/Task'
import AddNewTask from '../../components/CR/AddNewTask'
import { AppContext } from '../../store/AppContext'
import { FaTasks } from "react-icons/fa";
import api from '../../helper/api'
const Tasks = () => {
  const {state} = useContext(AppContext)
  const role = state?.user?.role

 const [list, setList] = useState([])
   const getList = async () => {
    const response = await api.post('/user/get-communication',{type:'task'})
    if(response.data.success){
      setList(response.data.communications)
    }
  }
  useEffect(()=>{
    getList()
  },[])

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      {isOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <AddNewTask isClose={()=> setIsOpen(false)} />
       </div>
       </div>
      ) } 
   <div className='pt-10 flex justify-between px-5'> <div className="flex items-center gap-2 cursor-pointer  text-[#4F46E5] ">
   <FaTasks />
        <span className="text-xl font-medium">My TO-DO Table</span>
      </div>        
   { (role == "cr")  &&
    (<button onClick={()=>setIsOpen(true)} className={"text-sm font-mono border-[1px]  rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 "}>Add New Task</button>
    )
  }
    </div> 
     {list.map(task => (
        <Task key={task._id} task={task} />
      ))}     
    </div>
  )
}

export default Tasks
