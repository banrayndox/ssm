import React, { useState, useEffect, useContext } from "react";
import { HiOutlineAcademicCap, HiOutlineArrowRight } from "react-icons/hi";
import api from "../../helper/api";
import { AppContext } from "../../store/AppContext";
import CancelJoinRequest from "./CancelJoinRequest";

const RequestJoinSection = () => {
  const {state} = useContext(AppContext)
  const user = state?.user
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await api.get("/authority/section-list");
       if(res.data.success){
      const filtered = res.data.sections.filter(s =>
      String(s.departmentId?._id || s.departmentId) ===
       String(user?.departmentId?._id || user?.departmentId) &&
      Number(s.semester) === Number(user?.semester)
      )
        setSections(filtered)
       }
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load sections." });
      }
    };
    fetchSections();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSection) {
      setMessage({ type: "error", text: "Please select a section first." });
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post("/user/reqtojoin", {
        sectionId: selectedSection,
      });
      console.log(res)
      setMessage({
        type: res.data.success ? "success" : "error",
        text: res.data.message,
      });
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 p-5 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-700">
        <HiOutlineAcademicCap className="text-indigo-500" /> Request to Join Section
      </h2>

      {message && (
        <div
          className={`mb-4 px-3 py-2 rounded text-xs ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a section</option>
            {sections.map((sec) => (
              <option key={sec._id} value={sec._id}>
                {sec.name} 
              </option>
            ))}
          </select>
          <HiOutlineArrowRight className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 text-xs rounded-md hover:bg-indigo-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : <>
            Request
            <HiOutlineArrowRight className="text-white" />
          </>}
        </button>
      </form>
    </div>
  );
};

export default RequestJoinSection;
