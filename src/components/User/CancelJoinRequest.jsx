import React, { useContext, useState } from "react"
import { HiOutlineXCircle } from "react-icons/hi"
import api from "../../helper/api"
import { AppContext } from "../../store/AppContext"
import { Navigate } from "react-router"

const CancelJoinRequest = () => {
  const { state } = useContext(AppContext)
  const user = state?.user
  const [loading, setLoading] = useState(false)


  const handleCancel = async () => {
    try {
      setLoading(true)
      const res = await api.post("/user/canceljoinsection")

      if (res.data.success) {
     // here get user data function
      }

    } catch (err) {
      setMessage({ type: "error", text: "Failed to cancel request" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-16 p-5 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-700">
        <HiOutlineXCircle className="text-red-500" />
        Join Request Pending
      </h2>

      <p className="text-xs text-gray-600 mb-4">
        You have sent a request to join:
      </p>

      <div className="bg-gray-100 p-3 rounded-md text-xs text-gray-800 mb-4">
        <strong>Section:</strong>{" "}
        {user?.reqToJoinSectionId?.name || "Selected Section"}
      </div>



      <button
        onClick={handleCancel}
        disabled={loading}
        className={`w-full bg-red-500 text-white py-2 text-xs rounded-md hover:bg-red-600 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Cancelling..." : "Cancel Join Request"}
      </button>
    </div>
  )
}

export default CancelJoinRequest
