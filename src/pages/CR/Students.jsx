import React, { useContext, useEffect, useState } from 'react'
import AssignedStudents from '../../components/CR/AssignedStudents'
import UnAssignedStudents from '../../components/CR/UnAssignedStudents'
import { AppContext } from '../../store/AppContext'
import api from '../../helper/api'
import { IoPeopleSharp } from "react-icons/io5";

const Students = () => {
  const { state } = useContext(AppContext)
  const role = state?.user?.role

  const [assignedStudents, setAssignedStudents] = useState([])
  const [unAssignedStudents, setUnAssignedStudents] = useState([])

  // Fetch assigned students
  const getA = async () => {
    try {
      const response = await api.get('/user/get-assigned')
      if (response.data.success) setAssignedStudents(response.data.students)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch unassigned students
  const getB = async () => {
    try {
      const response = await api.get('/user/get-unassigned')
      if (response.data.success) setUnAssignedStudents(response.data.students)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getA()
    getB()
  }, [])

  return (
    <div className="px-3 sm:px-5 md:px-6 py-4">
      {/* Page Header */}
      <div className="flex items-center gap-2 text-[#4F46E5] mb-4">
        <IoPeopleSharp className="text-xl sm:text-2xl" />
        <span className="text-lg sm:text-xl font-medium">Students Management</span>
      </div> 

      {/* Two-column layout on large screens */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Assigned Students */}
        <div className="flex-1">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <span className="text-indigo-500">&#128218;</span> Assigned Students
          </h2>
          {assignedStudents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              <AssignedStudents student={assignedStudents} />
            </div>
          ) : (
            <p className="text-gray-500 text-xs">No assigned students yet.</p>
          )}
        </div>

        {/* Right: Unassigned Students (CR only) */}
        {role === "cr" && (
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-amber-500">&#128100;</span> Unassigned Students
            </h2>
            {unAssignedStudents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                <UnAssignedStudents student={unAssignedStudents} />
              </div>
            ) : (
              <p className="text-gray-500 text-xs">No unassigned students.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Students
