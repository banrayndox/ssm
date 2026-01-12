import React, { useContext } from "react";
import { AppContext } from "../store/AppContext";
import { RiVideoLine, RiFileTextLine, RiCalendarLine } from "react-icons/ri";
import { FaUserAlt, FaClipboardList } from "react-icons/fa";
import api from "../helper/api";
import toast from "react-hot-toast";
const Lecture = ({ lecture,  getList }) => {
  const { state } = useContext(AppContext);
  const userId = state?.user?._id;
  const role = state?.user?.role;

  const deleteLecture = async () => {
    try {
      const response = await api.delete("/common/delete-communication", {
        data: { communicationId: lecture?._id },
      });
      if (response.data.success) {
        toast.success("Lecture deleted successfully");
          getList()
      }else{
            toast.error('Something Went Wrong!')
      }
    } catch (err) {
      console.error(err);
    }
  };

  const lectureInfo = lecture?.lecture || {};

  const creatorId = lecture?.createdBy?._id || lecture?.createdBy;

  return (
    <div className="border border-gray-200/70 rounded-2xl shadow-sm hover:shadow-md transition-all m-4 p-4 space-y-4 bg-white">
      
      {/* Header: Lecture Number + Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <FaClipboardList className="text-gray-400" />
          Lecture {lectureInfo.lectureNumber || "-"}{" "}
          {lecture?.title && `- ${lecture.title}`}
        </h1>
         <div className="flex items-center gap-1 text-xs ">
           <RiCalendarLine className="text-gray-400" />
           <span className="text-gray-500 text-xs">Date: {lecture.date || '2025-12-20'}</span>
         </div>
      </div>

      {/* Topics */}
      {lectureInfo.topics?.length > 0 && (
        <div className="flex flex-col gap-1 text-xs text-gray-700">
          <h2 className="font-medium text-gray-800 flex items-center gap-1">
            <RiFileTextLine /> Topics
          </h2>
          <ul className="list-disc list-inside">
            {lectureInfo.topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Resources */}
      {lectureInfo.resources?.length > 0 && (
        <div className="flex flex-col gap-1 text-xs text-gray-700">
          {/* <h2 className="font-medium text-gray-800 flex items-center gap-1">
            <RiVideoLine /> Resources
          </h2> */}
          <ul className=" list-inside">
            {lectureInfo.resources.map((res, idx) => (
           <li key={idx}>
             {res?.title ?  
                <a
                 href={res.url.startsWith('http') ? res.url : 'https://' + res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {res.title} ({res.type})
                </a>
                : null }
              </li> 
            ))}
          </ul>
        </div>
      )}

      {/* Footer: Created By + Duration + Delete */}
      <div className="flex justify-between items-center text-xs text-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <FaUserAlt className="text-gray-400" />
          <span>{lecture?.createdBy?.name || "Anonymous"} |  {lecture?.enrollmentId?.courseId?.name}</span>
        </div>

        {(role === "teacher" ) && (
          <button
            onClick={deleteLecture}
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition flex items-center gap-1"
          >
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Lecture;