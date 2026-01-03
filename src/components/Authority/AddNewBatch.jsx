import React from 'react'

const AddNewBatch = () => {
    const dept = ["Computer Science", "BBA", "English"]
  return (
  
      <div className='flex justify-center'>
    <div className='bg-white border-[1px] border-gray-200 w-[80%] h-85 shadow-xl px-5'>

 

      <h1 className=' text-gray-900 font-semibold text-xl text-center pt-5'>Add New Batch</h1>
       <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Choose Department</p>

      <select name="id" className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' id="department">
    <option value="" disabled selected className='text-xs'>Choose a department</option>
      {dept.map((dep,i)=>{
      return <option key={i} value={dep}>{dep}</option>
      })}
      </select>

      <p className='text-xs font-medium text-gray-800 leading-relaxed pt-4'>Batch Code</p>
      <input type="text" placeholder='ex: 01' className='text-gray-600 bg-gray-100 w-[99%] p-2 rounded-md text-sm mt-1' />
             
      <button onClick={()=>setActive(item)} className={"text-sm font-mono border-[1px]  rounded-lg py-2 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-7 "}>ADD Batch</button>
      <button onClick={()=>setActive(item)} className={"text-sm font-mono border-[1px] border-gray-200 rounded-lg py-2 transition scale-x-95 bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 w-[100%] mt-2 "}>Cancel</button>
      </div>

    </div>
  )
}

export default AddNewBatch
