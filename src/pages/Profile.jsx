import React, { useContext, useEffect, useState } from "react";
import api from "../helper/api";
import { AppContext } from "../store/AppContext";

const Profile = ({userId}) => {
  console.log(userId)
 const {state} = useContext(AppContext)
 const currId = state?.user?._id
  const [tab, setTab] = useState("view");

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const [studentId, setStudentId] = useState(null);
  const [department, setDepartment] = useState(null);
  const [semester,setSemester] = useState(null);
  const [section, setSection] = useState(null);
  const [role, setRole] = useState(null);

  const [teacherId, setTeacherId] = useState(null);
  const [teacherInitial, setTeacherInitial] = useState(null);
  const [roomNo, setRoomNo] = useState(null);

  const getProfile = async() => {
    const response = await api.post('/user/profile',{userId})
    if(response.data.success){
      const user = response.data.user
      console.log(response.data)
    setName(user?.name)
    setEmail(user?.email)
    setSemester(user?.semester)
    setStudentId(user?.studentId)
    setAddress(user?.address)
    setDepartment(user?.departmentId?.name)
    setSection(user?.sectionId?.name)
    setRole(user?.role)
    setTeacherId(user?.teacherId)
    setTeacherInitial(user?.teacherInitial)
    setRoomNo(user?.roomNo)
    }
  }
  useEffect(()=>{
    getProfile()
  },[])


  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
     const response  = await api.delete('/user/delete-profile')
     if(response.data.success){
      console.log('profile deleted')
     }else{
      console.log('failed')
     }

    }
  };

const handleEditProfile = async () =>{
    const response  = await api.post('/user/edit-profile',{address})
     if(response.data.success){
      console.log('profile edited')
     }else{
      console.log('failed')
     }

}
  const handleLeaveSection =  async () => {
    if (window.confirm("Are you sure you want to leave this section?")) {
      const response  = await api.post('/user/exit-section')
      if(response.data.success){
      console.log('profile edited')
     }else{
      console.log('failed')
     }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-2xl font-semibold">
              {profilePic ? "IMG" : 'null'}
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs rounded-full bg-black text-white capitalize">
              {role}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-xs text-gray-400 mt-1">{address}</p>
          </div>
        </div>

      {userId == currId &&
        <div className="flex gap-2 mb-8">
          {["view", "edit"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 text-sm rounded-full transition ${
                tab === t
                  ? "bg-black text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t === "view" ? "Profile" : "Edit Profile"}
            </button>
          ))}
        </div> }

    
        {tab === "view" && (
          <div className="space-y-8 text-sm">
            {/* BASIC INFO */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info label="Name" value={name} />
                <Info label="Email" value={email} />
                <Info label="Address" value={address} />
              </div>
            </div>


            {role === "student" && (
              <Section title="Academic Information">
                <Info label="Student ID" value={studentId} />
                <Info label="Department" value={department} />
                <Info label="semester" value={semester} />
                <Info label="Section" value={section} />
                <Info label="Role" value={role} />
 {userId == currId &&
                <button
                  onClick={handleLeaveSection}
                  className="text-xs text-red-600 underline mt-4"
                >
                  Leave Section
                </button> }
              </Section> 
            )}


            {role === "teacher" && (
              <Section title="Teaching Information">
                <Info label="Teacher ID" value={teacherId} />
                <Info label="Initial" value={teacherInitial} />
                <Info label="Department" value={department} />
                {/* <Info label="Room" value={roomNo} />
                <Info
                  label="Assigned Sections"
                  value={assignedSections.join(", ")}
                />
                <Info
                  label="Assigned Courses"
                  value={assignedCourses.join(", ")}
                /> */}
              </Section>
            )}

   
            {role === "authority" && (
              <p className="text-green-700 font-medium">
                Authority Access Enabled
              </p>
            )}
          </div>
        )}

 
        {userId === currId && tab === "edit" && (
          <div className="space-y-6 text-sm max-w-md">
            {/* <Field label="Name" value={name} setValue={setName} /> */}
            <Field label="Address" value={address} setValue={setAddress} />
{/* 
            <div>
              <label className="block text-gray-600 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                className="text-sm"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div> */}
           
            <button onClick={handleEditProfile} className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-900">
              Save Changes
            </button>

            <button
              onClick={handleDeleteProfile}
              className="block text-xs text-red-600 underline"
            >
              Delete Profile
            </button>
          </div>
        )} 
      </div>
    </div>
  );
};

/* ---------- Small UI Helpers ---------- */

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Field = ({ label, value, setValue }) => (
  <div>
    <label className="block text-gray-600 mb-1">{label}</label>
    <input
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-black"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
);

export default Profile;
