import api from "../../helper/api";
import { MdDelete } from "react-icons/md";

const Department = ({ dept, onDeleted }) => {
  const deleteDepartment = async () => {
    try {
      const response = await api.delete("/authority/delete-dept", {
        data: { departmentId: dept._id },
      });
      if (response.data.success) {
        onDeleted();
      }
    } catch (err) {
      console.error("Failed to delete department", err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 m-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition">
      
      {/* Department Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-gray-900 text-base">{dept?.name}</h1>
          <p className="text-xs text-green-600 mt-1">Department Code: {dept?.code}</p>
        </div>
      </div>

      {/* Delete Button */}
      <div className="mt-4 sm:mt-0">
        <button
          onClick={deleteDepartment}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 text-xs font-semibold rounded-lg hover:bg-red-600 transition"
        >
          <MdDelete className="text-lg" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Department;
