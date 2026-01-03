import React, { useContext, useEffect, useState } from 'react'
import Course from '../Authority/Course'
import { AppContext } from '../../store/AppContext'
import api from '../../helper/api'
const TCourse = () => {
const {state} = useContext(AppContext)
  const [cS, setCS] = useState([])
  const getList = async () => {
    const response = await api.get('/user/assigned-courses')
    if(response.data.success){
      setCS(response.data.assignedCourses)
    }
  }
  useEffect(()=>{
  getList()
  },[])

  return (
  <div className='relative'>

  <div className='flex justify-between px-5 pt-10'>
  <h1 className='font-semibold leading-relaxed text-start'>Assigned Courses</h1>
     
  </div>
    {cS.map((item)=>(
      <Course onDeleted={getList} key={item._id} course={item} />
    ))}
    </div>
  )
}

export default TCourse
