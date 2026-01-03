import React, { useState } from 'react'
import Student from './Student'
import Profile from '../../pages/Profile';

const AssignedStudents = ({student}) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileId, setProfileId] = useState(null);


  return (
    <>

       {student.map(student => <Student student={student} text="assign" />)}

    </>
  )
}

export default AssignedStudents
