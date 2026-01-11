import { useState } from "react"
import api from "../../helper/api"
import toast from "react-hot-toast"
const AddNewTask = ({isClose, getList}) => {
    const priority = ["high", "medium", "low"]
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [dueDate, setDueDet] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
     const add = async () => {
    const response = await api.post('/common/add-task',{ title, content, dueDate, priority: selectedPriority})
    if(response.data.success){
      toast.success('Task Added')
      isClose()
      getList()
    }else{
          toast.error('Something Went Wrong!')
    }
  }
  return (
    <div>
        
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-122 shadow-xl px-5'>
     <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Add New Task</h1>
    <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Task Title</p>
      <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter task title...' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' />
     <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Description</p>
      <input onChange={(e)=>setContent(e.target.value)} type="text" placeholder='Enter task description...' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-5 rounded-md text-sm mt-1' />
 
    <div className='flex justify-between space-x-2.5 pt-4'>
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Priority</p>
      <select name="priority" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' onChange={(e)=>setSelectedPriority(e.target.value)}>
     <option value="" disabled selected className='text-xs'>Choose a type</option>
      {priority.map((p,i)=>{
      return <option key={i} value={p}>{p}</option>
      })}
      </select>
     <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Due Date</p>
      <input onChange={(e)=>setDueDet(e.target.value)} type="text" placeholder='mm/dd/yyyy' className='text-gray-600 bg-gray-100 w-[99%] px-2 py-3 rounded-md text-sm mt-1' />
      </div>

      <button onClick={add} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-5 "}>Add Task</button>
      <button onClick={isClose} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
    </div>
  )

}

export default AddNewTask
