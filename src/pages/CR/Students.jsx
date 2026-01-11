import React, { useContext, useEffect, useState } from 'react';
import AssignedStudents from '../../components/CR/AssignedStudents';
import { AppContext } from '../../store/AppContext';
import api from '../../helper/api';
import { IoPeopleSharp } from "react-icons/io5";
import CreateCourse from '../../components/Teacher/CreateCourse';
import JoinCourse from '../../components/User/JoinCourse'
import ChangePassKey from '../../components/Teacher/ChangePassKey';
import toast from 'react-hot-toast';
const Students = () => {
  const { state } = useContext(AppContext);
  const role = state?.user?.role;
  const userId = state?.user?._id;

  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [courses, setCourses] = useState([]);

    const removeCR = async () => {
    const res = await api.post('/teacher/remove-cr', {
      enrollmentId: selectedCourse
    })
    if(res.data.success){
     toast.success('CR Removed')
    }else{
      toast.error('Something went wrong')
    }
  }
  // Fetch students
  const getEnrolled = async () => {
    try {
      const response = await api.post('/common/get-enrolled', {enrollmentId : selectedCourse});
      if (response?.data?.success) {
      setStudents(response.data?.students);
      setTeacher(response.data?.teacher || null);
      setCr(response.data?.cr || null);
     if(role=='teacher') setPasskey(response?.data?.passkey)

      }
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(()=>{
 if(selectedCourse!='all'){
  getEnrolled()
 }
  },[selectedCourse])

  // Fetch courses from profile for filter dropdown
  useEffect(() => {
    if (role === "student" ) {
      setCourses(state.user.enrolledCourses || []);
    } else if (role === "teacher") {
      setCourses(state.user.createdCourses || []);
    } 
  }, []);

const [teacher, setTeacher] = useState(null);
const [cr, setCr] = useState(null);
  const [passkey, setPasskey] = useState(null)

 const [isOpen, setIsOpen] = useState(false)
 const [isSOpen, setIsSOpen] = useState(false)
 const [isCOpen, setIsCOpen] = useState(false)
  return (
    <div className="px-3 sm:px-5 md:px-6 py-4 relative w-full">
         {isOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <CreateCourse onAdded={()=>setSelectedCourse(selectedCourse)} onClose={()=> setIsOpen(false)} />
       </div>
       </div>
      ) } 
        {isSOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <JoinCourse onAdded={()=>setSelectedCourse(selectedCourse)} onClose={()=> setIsSOpen(false)} />
       </div>
       </div>
      ) } 
       {isCOpen && (
      <div className="flex fixed inset-0 z-50 items-center justify-center">
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={()=> setIsOpen(false)}></div>
      <div className="absolute">
       <ChangePassKey enrollmentId={selectedCourse} onAdded={()=>setSelectedCourse(selectedCourse)} onClose={()=> setIsSOpen(false)} />
       </div>
       </div>
      ) } 
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <div className="flex items-center gap-2 text-[#4F46E5]">
          <IoPeopleSharp className="text-xl sm:text-2xl" />
          <span className="text-lg sm:text-xl font-medium">Enrolled Students</span>
        </div>

        <div className="flex items-center gap-3">

          {/* Always show button */}
          {role === 'teacher' && selectedCourse=='all' && (
            <button onClick={()=>setIsOpen(true)} className="text-sm font-mono border-[1px] rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300">
              Create a course
            </button>
          )}
          {role === 'teacher' && selectedCourse!='all' && (
            <button onClick={()=>setIsCOpen(true)} className="text-sm font-mono border-[1px] rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300">
              Change passkey
            </button>
          )}
          {role === 'student' && selectedCourse=='all' && (
            <button onClick={()=>setIsSOpen(true)} className="text-sm font-mono border-[1px] rounded-lg px-6 py-1 transition scale-x-95 bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300">
              Enroll a course
            </button>
          )}
        </div>
        
      </div>
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

      

{courses.length == 0 && <p> No Courses Available</p>}
      {/* Students list */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">

        <div className="pt-10 flex flex-col items-center">
  {selectedCourse === "all" ? (
    <p className="text-xs text-gray-600 text-center">
      Select a course first
    </p>
  ) : (
    <>
  <div className=" flex flex-col items-center w-full">
     {/* Teacher & CR Info */}
{selectedCourse !== "all" && (
  <div className="w-full mb-6 rounded-xl border bg-white shadow-sm px-5 py-4">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      {/* Teacher */}
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Course Teacher
        </p>
        <p className="text-sm font-medium text-gray-800">
          {teacher?.name || "Not assigned"}
        </p>
        {teacher?.email && (
          <p className="text-xs text-gray-500">{teacher.email}</p>
        )}
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-10 bg-gray-200" />

      {/* CR */}
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Class Representative
        </p>
        <p className="text-sm font-medium text-gray-800">
          {cr ? cr.name : "Not assigned"}
        </p>
        {cr?.email && (
          <p className="text-xs text-gray-500">{cr.email}</p>
        )}
      </div>
    </div>
    {role=='teacher' && (<div className='flex justify-between'>

<span>
  <span className="font-medium">Pass key</span>
<span
  onClick={() => navigator.clipboard.writeText(passkey)}
  className="cursor-pointer px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md font-mono text-xs hover:bg-indigo-200 transition"
  title="Click to copy"
>
    {passkey}
  </span>
  </span>
  {cr!=null &&
<span
  onClick={removeCR}
  className="px-4 py-2 text-xs font-mono rounded-lg bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md hover:from-red-500 hover:to-red-600 transition">
  Remove CR
  </span> }
   </div>)} 

  </div>
)}

  {selectedCourse === "all" ? (
    <p className="text-xs text-gray-600 text-center">
      Select a course first
    </p>
  ) : students.length === 0 ? (
    <p className="text-xs text-gray-500 text-center">
      No students have joined this course yet.
    </p>
  ) : (
   
    <>
      <AssignedStudents isAssigned={cr==null ? true : false}
        student={students}
        selectedCourse={selectedCourse}
        enrollmentId={selectedCourse}
      />
    </>
  )}
</div>


    </>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
