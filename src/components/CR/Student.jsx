import React, { useContext, useState } from "react";
import { AppContext } from "../../store/AppContext";
import api from "../../helper/api";
import { MdDelete } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Profile from "../../pages/Profile";
import toast from "react-hot-toast";
const Student = ({ student, text, onDeleted, enrollmentId, isAssigned, getEnrolled }) => {
  const { state } = useContext(AppContext);
  const role = state?.user?.role;

  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Remove from course
  const remove = async () => {
    try {
      const res = await api.post("/teacher/delete-from-course", {
        studentId: student._id,
        enrollmentId,
      });
      if (res.data.success) {
        onDeleted && onDeleted();
        getEnrolled()
             toast.success('Student Removed From Course')
      }else{
            toast.error('Something Went Wrong!')
      }
    } catch (err) {
      toast.error('Something Went Wrong!')
    }
  };
  // assign cr
  const assignCR = async () => {
    const res = await api.post('/teacher/assign-cr', {
      studentId: student?._id,
      enrollmentId
    })
    if(res.data.success){
      getEnrolled()
      toast.success('CR Assigned')
    }else{
    toast.error('Something Went Wrong!')
      
    }
  }

  // Authority delete user
  const deleteStudent = async () => {
    setLoading(true);
    try {
      const res = await api.delete("/authority/delete-user", {
        data: { userId: student?._id },
      });

      if (res.data.success) {
        toast.success('User Deleted')
        onDeleted();
      }else{
        toast.error('Something went wrong!')
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setProfileOpen(false)}
          />
          <div className="relative z-50 w-full max-w-md">
            <Profile userId={student._id} isClose={() => setProfileOpen(false)} />
          </div>
        </div>
      )}

      {/* Student Card */}
      <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-sm transition">
        
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setProfileOpen(true)}
            className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-900">
              {student?.name}
            </p>
            <p className="text-xs text-gray-500">
              ID: {student?.studentId || student?.teacherId}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 justify-end">
          {/* Authority Delete */}
          {role === "authority" && (
            <button
              onClick={deleteStudent}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-60"
            >
              <MdDelete className="text-sm" />
              Delete
            </button>
          )}

<div className="flex justify-between gap-x-5">
            {/* Teacher Remove */}
          {role === "teacher" && text === "assign" && (
            <button
              onClick={remove}
              disabled={loading}
              className="px-4 py-2 text-xs font-mono rounded-lg bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md hover:from-red-500 hover:to-red-600 transition"
            >
              Remove
            </button>
          )} 
          {/* cr assign */}
     {role === "teacher" && isAssigned && text === "assign" && (
            <button
              onClick={assignCR}
              disabled={loading}
              className="px-4 py-2 text-xs font-mono rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md hover:from-green-500 hover:to-green-600 transition">
              Assign as CR
            </button>
          )}
</div>
        </div>
      </div>
    </>
  );
};

export default Student;
