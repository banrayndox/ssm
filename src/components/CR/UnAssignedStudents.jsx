import React from 'react'
import Student from './Student'

const UnAssignedStudents = ({student}) => {
  return (
<>
       {student.map(s=> <Student key={s.Id} student={s} text="unassign" />)}
</>
  )
}

export default UnAssignedStudents
