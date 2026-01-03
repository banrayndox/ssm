import api from "../../helper/api";
import { MdDelete, MdPerson, MdSchool } from "react-icons/md";

const Section = ({ section, onDeleted }) => {
  const deleteSection = async () => {
    try {
      const response = await api.delete("/authority/delete-section", {
        data: { sectionId: section._id },
      });
      if (response.data.success) {
        onDeleted();
      }
    } catch (err) {
      console.error("Failed to delete section", err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 m-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-lg transition">

      {/* Section Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          {/* Department + Semester + Section Name */}
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-semibold text-gray-900 text-base">
              {section?.departmentId?.name}{" "}
              <span className="text-xs font-medium text-gray-600 ml-1">
                Semester {section.semester}
              </span>
            </h1>
            <p className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-200">
              {section?.name}
            </p>
          </div>

          {/* Students & CR Info */}
          <div className="flex gap-4 mt-2 text-xs text-gray-500 flex-wrap items-center">
            <span className="flex items-center gap-1">
              <MdPerson className="text-gray-400" />
              {section?.studentsEnrolled || 0} Students
            </span>
            <span className="flex items-center gap-1">
              <MdSchool className="text-gray-400" />
              CR: {section?.cr ? section.cr.name : "Not assigned"}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div className="mt-4 sm:mt-0">
        <button
          onClick={deleteSection}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 text-xs font-semibold rounded-lg hover:bg-red-600 transition"
        >
          <MdDelete className="text-lg" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Section;
