import React, { useContext, useEffect, useState } from 'react';
import Issue from '../components/User/Issue';
import SubmitIssue from '../components/User/SubmitIssue';
import { MdComment } from "react-icons/md";
import { AppContext } from '../store/AppContext';
import api from '../helper/api';
import Loader from '../components/Loader';
const IssueBox = () => {
  const [loading, setLoading] = useState(false)
  const { state } = useContext(AppContext);
  const role = state?.user?.role;
  const userId = state?.user?._id;

  const [list, setList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  // Courses for student
  const courses = role === "student"  ? state.user.enrolledCourses || []  :  state.user.createdCourses || []

  // Fetch issues
  const getList = async () => {
    try {
      setLoading(true)
      const response = await api.post('/common/get-communication', { type: 'issue' });
      if (response.data.success) setList(response.data.communications);
    } catch (err) {
      console.error(err);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getList();
  }, []);

  // Filter issues by selected course
  const filteredList = selectedCourse === "all"
    ? list
    : list.filter(issue => issue?.enrollmentId?._id === selectedCourse);

  // Can submit button show?
  const canSubmit = () => {
    if (role !== "student") return false;
    if (selectedCourse === "all") return false; // must select a course
    return courses.some(c => c._id === selectedCourse);
  };

  return (
    <div className='relative'>
      {loading && <Loader />}
      {/* Submit Issue Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute">
            <SubmitIssue getList={getList} isClose={() => setIsOpen(false)} enrollmentId={selectedCourse}/>
          </div>
        </div>
      )}

      {/* Header */}
      <div className='pt-10 flex justify-between px-5 items-center'>
        <div className="flex items-center gap-2 text-[#4F46E5]">
          <MdComment />
          <span className="text-xl font-medium">Submit your Issues here</span>
        </div>

        {/* Only student can submit */}
        {canSubmit() && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-sm font-mono border-[1px] rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300"
          >
            Submit
          </button>
        )}
      </div>

      {/* Course Filter Dropdown */}
<div className="px-5 pt-4">
  {courses.length > 0 ? (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Filter by course
      </label>

      {/* Select */}
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
        {role === "student"
          ? "No courses enrolled"
          : "No courses assigned"}
      </span>
    </div>
  )}
</div>


      {/* Render filtered issues */}
      <div className='pt-4 px-5 space-y-2'>
        {filteredList.map(issue => (
          <Issue getList={getList} key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default IssueBox;
