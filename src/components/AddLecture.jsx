import React, { useState } from 'react'
import api from '../helper/api'
import toast from 'react-hot-toast'
import Tasks from '../pages/CR/Tasks'
const AddLecture = ({ isClose, enrollmentId, getList }) => {
  const resourceTypes = ["video", "article", "pdf", "slide", "other"]

  const [lectureNumber, setLectureNumber] = useState('')
  const [title, setTitle] = useState('')
  const [topics, setTopics] = useState('') // comma separated
  const [resourceTitle, setResourceTitle] = useState('')
  const [resourceUrl, setResourceUrl] = useState('')
  const [resourceType, setResourceType] = useState('video')
  const [lectureDate, setLectureDate] = useState('')

  const addLecture = async () => {
    const lecture = {
      lectureNumber,
      topics: topics.split(',').map(t => t.trim()),
      resources: [
        {
          title: resourceTitle,
          url: resourceUrl,
          type: resourceType
        }
      ],
      title,
      lectureDate
    }

    const response = await api.post('/common/add-communication', {
      enrollmentId,
      type: 'lecture',
      title,
      content: '', // optional
      lecture,
    })

    if (response.data.success) {
      toast.success('Lecture added successfully')
      isClose()
      getList()
    }else{
     toast.error('Something Went Wrong!')
    }
  }

  return (
<div className="flex justify-center">
  <div className="bg-white border border-gray-200 w-full max-w-3xl shadow-xl px-6 py-6 rounded-lg space-y-4">

    <h1 className="text-gray-900 font-semibold text-xl text-center">Add New Lecture</h1>

    {/* Lecture Number + Title in one row */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-800">Lecture Number</p>
        <input
          type="number"
          placeholder="Enter Lecture Number"
          className="text-gray-600 bg-gray-100 w-full px-2 py-3 rounded-md text-sm mt-1"
          onChange={(e) => setLectureNumber(e.target.value)}
        />
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium text-gray-800">Lecture Title</p>
        <input
          type="text"
          placeholder="Enter Lecture Title"
          className="text-gray-600 bg-gray-100 w-full px-2 py-3 rounded-md text-sm mt-1"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>

    {/* Topics */}
    <div>
      <p className="text-xs font-medium text-gray-800">Topics (comma separated)</p>
      <input
        type="text"
        placeholder="e.g., Variables, Loops, Functions"
        className="text-gray-600 bg-gray-100 w-full px-2 py-3 rounded-md text-sm mt-1"
        onChange={(e) => setTopics(e.target.value)}
      />
    </div>

    {/* Resources: Title + URL + Type in one row */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-800">Resource Title</p>
        <input
          type="text"
          placeholder="Enter Resource Title"
          className="text-gray-600 bg-gray-100 w-full px-2 py-3 rounded-md text-sm mt-1"
          onChange={(e) => setResourceTitle(e.target.value)}
        />
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium text-gray-800">Resource URL</p>
        <input
          type="text"
          placeholder="Enter Resource URL"
          className="text-gray-600 bg-gray-100 w-full px-2 py-3 rounded-md text-sm mt-1"
          onChange={(e) => setResourceUrl(e.target.value)}
        />
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium text-gray-800">Resource Type</p>
        <select
          className="text-gray-600 bg-gray-100 w-full p-2 rounded-md text-sm mt-1"
          onChange={(e) => setResourceType(e.target.value)}
        >
          {resourceTypes.map((type, i) => (
            <option key={i} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Lecture Date */}
    <div>
      <p className="text-xs font-medium text-gray-800">Lecture Date</p>
      <input
        type="date"
        className="text-gray-600 bg-gray-100 w-full px-2 py-3 rounded-md text-sm mt-1"
        onChange={(e) => setLectureDate(e.target.value)}
      />
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <button
        onClick={addLecture}
        className="flex-1 text-sm font-mono border rounded-lg py-2 transition bg-black text-white hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300"
      >
        Add Lecture
      </button>
      <button
        onClick={isClose}
        className="flex-1 text-sm font-mono border border-gray-200 rounded-lg py-2 transition bg-white text-black hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300"
      >
        Cancel
      </button>
    </div>
  </div>
</div>

  )
}

export default AddLecture
