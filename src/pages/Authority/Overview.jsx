import React, { useEffect, useState } from "react"
import AssignCR from "../../components/Authority/AssignCR"
import AddNewSection from "../../components/Authority/AddNewSection"
import AssignTeacher from "../../components/Authority/AssignTeacher"
import AddTeacher from "../../components/Authority/AddTeacher"
import api from "../../helper/api"
import {
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineOfficeBuilding,
  HiOutlineBookOpen,
  HiOutlineUserAdd,
  HiOutlineRefresh
} from "react-icons/hi"

const Overview = () => {
  const [isCrOpen, setIsCrOpen] = useState(false)
  const [isSectionOpen, setIsSectionOpen] = useState(false)
  const [isTeacherOpen, setIsTeacherOpen] = useState(false)
  const [isAssignTeacherOpen, setIsAssignTeacherOpen] = useState(false)
  const [dashboard, setDashboard] = useState({})

  const getCount = async () => {
    try {
      const response = await api.get("/authority/dashboard")
      if (response.data.success) {
        setDashboard(response.data.data)
      }
    } catch (err) {
      console.log("Failed to load dashboard data", err)
    }
  }

  useEffect(() => {
    getCount()
  }, [])

  const items = [
    { label: "Users", value: dashboard.users || 0, icon: HiOutlineUsers },
    { label: "Sections", value: dashboard.sections || 0, icon: HiOutlineAcademicCap },
    { label: "Departments", value: dashboard.departments || 0, icon: HiOutlineOfficeBuilding },
    { label: "Courses", value: dashboard.courses || 0, icon: HiOutlineBookOpen },
  ]

  const quickActions = [
    { label: "Assign CR to Section", action: () => setIsCrOpen(true), icon: HiOutlineAcademicCap },
    { label: "Assign Teacher to Course", action: () => setIsTeacherOpen(true), icon: HiOutlineUserAdd },
    { label: "Assign New Teacher", action: () => setIsAssignTeacherOpen(true), icon: HiOutlineUserAdd },
    { label: "Reset All", action: () => console.log("Reset Action"), icon: HiOutlineRefresh },
  ]

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* ================= MODALS ================= */}
      {isCrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCrOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-4">
            <AssignCR isClose={() => setIsCrOpen(false)} />
          </div>
        </div>
      )}

      {isTeacherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsTeacherOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-4">
            <AssignTeacher isClose={() => setIsTeacherOpen(false)} />
          </div>
        </div>
      )}

      {isAssignTeacherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAssignTeacherOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-4">
            <AddTeacher added={getCount} isClose={() => setIsAssignTeacherOpen(false)} />
          </div>
        </div>
      )}

      {isSectionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSectionOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-4">
            <AddNewSection isClose={() => setIsSectionOpen(false)} />
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <h1 className="pt-8 px-5 text-xl md:text-2xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mt-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-3"
          >
            <item.icon className="text-indigo-500 text-3xl" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm m-4 p-5 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>

        <div className="flex flex-col gap-3">
          {quickActions.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="flex items-center gap-2">
                <item.icon className="text-indigo-500 text-lg" />
                {item.label}
              </span>
              <span className="text-gray-400">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Overview
