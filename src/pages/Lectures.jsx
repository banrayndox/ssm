import React, { useContext, useEffect, useState } from "react";
import Lecture from "../components/Lecture.jsx";
import AddLecture from "../components/AddLecture.jsx";
import { AppContext } from "../store/AppContext.jsx";
import api from "../helper/api";
import { FaChalkboardTeacher } from "react-icons/fa";

const Lectures = () => {
  const { state } = useContext(AppContext);
  const role = state?.user?.role;
  const userId = state?.user?._id;
  const [list, setList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const getList = async () => {
    try {
      const response = await api.post("/common/get-communication", { type: "lecture" });
      if (response.data.success) {
        setList(response.data.communications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const courses = role === "student" ? state.user.enrolledCourses || [] : state.user.createdCourses || [];

  const filteredList =
    selectedCourse === "all" ? list : list.filter((n) => n?.enrollmentId?._id === selectedCourse);

  const canAddLecture = () => {
    if (role === "teacher") return selectedCourse !== "all";

    if (role === "student") {
      if (selectedCourse === "all") return false;
      const courseEnrollment = state.user.enrolledCourses.find(
        (enroll) => enroll._id === selectedCourse
      );
      const crId = courseEnrollment?.crId?._id || courseEnrollment?.crId;
      return crId?.toString() === userId?.toString();
    }

    return false;
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute">
            <AddLecture isClose={() => setIsOpen(false)} enrollmentId={selectedCourse} getList={getList} />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="pt-10 flex justify-between px-5 items-center">
        <div className="flex items-center gap-2 text-[#4F46E5]">
          <FaChalkboardTeacher />
          <span className="text-xl font-medium">Lectures</span>
        </div>

        {canAddLecture() && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-sm font-mono border-[1px] rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300"
          >
            ADD
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="px-5 pt-4">
        {courses.length > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Filter by course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="
                w-full sm:w-auto
                bg-gray-100 text-sm
                px-3 py-2
                rounded-md border
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            >
              <option value="all">All Courses</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.courseId?.code} — {c.courseId?.name} ({c.section})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
            <span>
              {role === "student" ? "No courses enrolled" : "No courses assigned"}
            </span>
          </div>
        )}
      </div>

      {/* Lectures list */}
      <div className="pt-4 px-5 space-y-2">
        {filteredList.length > 0 ? (
          filteredList.map((lecture) => (
            <Lecture   getList={getList} key={lecture._id} lecture={lecture} />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center pt-10">No lectures available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default Lectures;
