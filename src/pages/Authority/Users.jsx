import React, { useEffect, useState } from 'react'
import User from '../../components/Authority/User'
import { tempData } from '../../assets/tempData'
import Student from '../../components/CR/Student'
import api from '../../helper/api'
const Users = () => {
  const [students, setStudents] = useState([])
  const item = ["ALL","STUDENTS", "TEACHER","CR"]
  const [active,setActive] = useState("ALL")
  const getList = async () => {
    const response = await api.get('/authority/users-list')
    if(response.data.success){
      setStudents(response.data.users)
    }
  }
  useEffect(()=>{
  getList()
  },[])
    const filteredStudents = students.filter(student => {
    if (active === "ALL") return true
    if (active === "STUDENTS") return student.role === "student"
    if (active === "CR") return student.role === "cr"
    if (active === "TEACHER") return student.role === "teacher"
    return true
  })


  return (
    <div>
        <div className='flex  pl-5 pt-6 gap-5'>
        <div className='w-45'>
            <input  className='bg-gray-100 rounded-lg h-8 text-center text-sm outline-gray-300 text-gray-600 '  placeholder='Search users...'></input>
        </div>
        <div>
           {item.map((item)=>(
            <button onClick={()=>setActive(item)} className={`text-sm font-mono border-[1px]  rounded-lg px-2 mt-1 mr-1 transition ${active == item ? "bg-black text-white border-[1px]" : "bg-white-300 hover:bg-gray-200 border-gray-300 text-gray-800"}`}>{item}</button>
           ))}
        </div>
        </div>
      {filteredStudents.map((student) => (<Student onDeleted={getList} key={student._id} student={student} text="remove" />))}        

    </div>
  )
}

export default Users
