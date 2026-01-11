import React, { useContext } from "react";
import api from "../../helper/api";
import { AppContext } from "../../store/AppContext";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
const Course = ({ course, onDeleted }) => {
  const { state } = useContext(AppContext);
  const role = state?.user?.role;

  const deleteCourse = async () => {
    try {
      const response = await api.delete("/authority/delete-course", {
        data: { courseId: course._id },
      });
      if (response.data.success) {
        toast.success("Course Deleted");
        onDeleted();
      }
    } catch (err) {
  toast.error('Something went wrong!')
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 m-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition">
      
      {/* Course Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-gray-900 text-base">{course?.name}</h1>
            <p className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-200">
              {course?.code}
            </p>
          </div>

          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <p>Department: Computer Science</p>
            <p>Semester: {course?.semester}</p>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      {role === "authority" && (
        <div className="mt-4 sm:mt-0">
          <button
            onClick={deleteCourse}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 text-xs font-semibold rounded-lg hover:bg-red-600 transition"
          >
            <MdDelete className="text-lg" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Course;
