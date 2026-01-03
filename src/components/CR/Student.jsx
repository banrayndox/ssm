import React, { useContext, useState } from "react";
import { AppContext } from "../../store/AppContext";
import api from "../../helper/api";
import { MdDelete, MdPerson } from "react-icons/md";
import Profile from "../../pages/Profile";

const Student = ({ student, text, onDeleted }) => {
  const { state } = useContext(AppContext);
  const role = state?.user?.role;
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Accept / Remove / Reject
  const accept = async () => {
    try {
      const res = await api.post("/user/accept-student", { studentId: student._id });
      if (res.data.success) console.log("Accepted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async () => {
    try {
      const res = await api.post("/user/remove-student", { studentId: student._id });
      if (res.data.success) console.log("Removed successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async () => {
    try {
      const res = await api.post("/user/reject-student", { studentId: student._id });
      if (res.data.success) console.log("Rejected successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete (authority)
  const deleteStudent = async () => {
    setLoading(true);
    try {
      const res = await api.delete("/authority/delete-user", { data: { userId: student._id } });
      if (res.data.success && onDeleted) onDeleted(student._id);
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
          ></div>
          <div className="relative z-50 max-w-md w-full">
            <Profile userId={student._id} isClose={() => setProfileOpen(false)} />
          </div>
        </div>
      )}

      {/* Student Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 m-2 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition">
        
        {/* Left: Profile + Info */}
        <div className="flex items-center w-full sm:w-auto gap-4">
          <div
            onClick={() => setProfileOpen(true)}
            className="flex items-center justify-center bg-cyan-100 text-cyan-700 h-14 w-14 rounded-full cursor-pointer text-xl font-bold hover:bg-cyan-200 transition"
          >
            <MdPerson />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-semibold text-gray-900 text-sm sm:text-base">{student?.name}</h1>
            <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-500">
              <span>ID: {student?.studentId}</span>
              <span>Semester: {student?.sectionId?.semester || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className={`mt-3 sm:mt-0 sm:ml-4 flex w-full sm:w-auto ${role==="cr" && text==="unassign" ? "justify-between gap-2" : "flex-col sm:flex-row gap-2"}`}>
          {/* Authority Delete */}
          {role === "authority" && (
            <button
              onClick={deleteStudent}
              disabled={loading}
              className="flex items-center justify-center px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition font-semibold text-xs"
            >
              <MdDelete className="text-base mr-1" /> Delete
            </button>
          )}

          {/* CR Assign */}
          {role === "cr" && text === "assign" && (
            <button
              onClick={remove}
              disabled={loading}
              className="px-2 py-1 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-md hover:bg-yellow-200 transition font-semibold text-xs"
            >
              Remove
            </button>
          )}

          {/* CR Unassign */}
          {role === "cr" && text === "unassign" && (
            <>
              <button
                onClick={accept}
                disabled={loading}
                className="flex-1 px-2 py-1 bg-green-100 text-green-800 border border-green-300 rounded-md hover:bg-green-200 transition font-semibold text-xs"
              >
                Accept
              </button>
              <button
                onClick={reject}
                disabled={loading}
                className="flex-1 px-2 py-1 bg-red-100 text-red-800 border border-red-300 rounded-md hover:bg-red-200 transition font-semibold text-xs"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Student;
