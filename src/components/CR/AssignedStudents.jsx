import { useState } from 'react'
import Student from './Student'

const AssignedStudents = ({student, selectedCourse, enrollmentId, isAssigned, getEnrolled}) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileId, setProfileId] = useState(null);


  return (
    <>

       {student.map((student,i) => <Student key={i} student={student} isAssigned={isAssigned} enrollmentId={enrollmentId} selectedCourse={selectedCourse} getEnrolled={getEnrolled} text="assign" />)}

    </>
  )
}

export default AssignedStudents
