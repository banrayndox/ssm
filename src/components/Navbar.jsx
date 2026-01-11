import { useContext, useState } from 'react'
import Notices from '../pages/User/Notices'
import Polls from '../pages/User/Polls'
import Exams from '../pages/User/Exams'
import Tasks from '../pages/CR/Tasks'
import Overview from '../pages/Authority/Overview'
import Users from '../pages/Authority/Users'
import Departments from '../pages/Authority/Departments'
import Courses from '../pages/Authority/Courses'
import Sections from '../pages/Authority/Sections'
import IssueBox from '../pages/IssueBox'
import Students from '../pages/CR/Students'
import { AppContext } from '../store/AppContext'
import { RiNotificationBadgeLine } from "react-icons/ri";
import Lecture from '../components/Lecture'
import Lectures from '../pages/Lectures'
const Navbar = () => {
  const {state} = useContext(AppContext)
  const role = state?.user?.role
  const components = {
    Notices: <Notices />,
    Polls: <Polls />,
    Exams: <Exams />,
    Sections: <Sections />,
    Tasks: <Tasks />,
    Issues : <IssueBox />,
    Overview: <Overview />,
    Users: <Users />,
    Departments: <Departments />,
    Courses: <Courses />,
    Enrollment: <Students />,
    Lectures: <Lectures />
  }
  const roleItems = {
    cr : ["Notices", "Polls", "Exams", "Issues", "Tasks", "Enrollment"],
    authority: ["Overview", "Users", "Departments", "Courses"],
    teacher: ["Lectures", "Notices", "Polls", "Exams", "Issues", "Tasks", "Enrollment"],
    student: ["Lectures", "Notices", "Polls", "Exams", "Issues", "Tasks", "Enrollment"]
  }


 const items = roleItems[role] || []
  const [active, setActive] = useState(items[0] || null)
  
  return (
    <>

<div className="w-full flex justify-center pt-4">
  <div className="flex flex-wrap bg-gray-100 p-1 justify-center gap-1 rounded-full shadow-inner">
    {items.map((item) => (
      <button
        key={item}
        onClick={() => setActive(item)}
        className={`
          px-3 py-1 text-xs rounded-full font-medium transition-all duration-150
          ${
            active === item
              ? "bg-white text-black shadow-sm transform scale-100"
              : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          }
        `}
      >
        {item}
      </button>
    ))}
  </div>
</div>

   {active ? components[active] : null}

    </>
  )
}

export default Navbar
