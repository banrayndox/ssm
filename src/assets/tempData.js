export const tempData = {
  // Users: students, CRs, teachers
  students: [
    {
      id: "u_99",
      studentId: "251-15-445",
      name: "Rakib Biswash",
      email: "251-15-445@diu.edu.bd",
      role: "authority",
      departmentId: "dept_cse",
      sectionId: "sec_cse_3a",
      reqToJoinSection: null,
      semester: 3,
      assignedCourses: [
        { courseId: "c_dbms", sectionId: "sec_cse_3a" },
        { courseId: "c_algo", sectionId: "sec_cse_3a" }
      ]
    },
    {
      id: "u_101",
      name: "Sujal Mahfuz",
      email: "251-15-909@diu.edu.bd",
      role: "cr",
      departmentId: "dept_cse",
      sectionId: "sec_cse_3a",
      reqToJoinSection: null,
      semester: 3
    },
    {
      id: "u_102",
      name: "Parvej Rahim",
      email: "251-15-894@diu.edu.bd",
      role: "student",
      departmentId: "dept_cse",
      sectionId: null,
      reqToJoinSection: "sec_cse_3a",
      semester: 3,
      assignedCourses: [
        { courseId: "c_dbms", sectionId: "sec_cse_3a" },
        { courseId: "c_algo", sectionId: "sec_cse_3a" }
      ]
    },
    {
      id: "u_103",
      name: "Anas",
      email: "251-15-342@diu.edu.bd",
      role: "student",
      departmentId: "dept_cse",
      sectionId: "sec_cse_3a",
      reqToJoinSection: null,
      semester: 3
    }
  ],

  // Departments
  departments: [
    { id: "dept_cse", name: "Computer Science", code: "CSE" },
    { id: "dept_eee", name: "Electrical Engineering", code: "EEE" }
  ],

  // Sections
  sections: [
    { id: "sec_cse_3a", name: "Section A", semester: 3, deptId: "dept_cse" },
    { id: "sec_cse_3b", name: "Section B", semester: 3, deptId: "dept_cse" }
  ],

  // Courses
  courses: [
    { id: "c_dbms", title: "Database Management System", code: "CSE-301", deptId: "dept_cse", semester: 3 },
    { id: "c_algo", title: "Algorithms", code: "CSE-302", deptId: "dept_cse", semester: 3 },
    { id: "c_math", title: "Discrete Mathematics", code: "MAT-305", deptId: "dept_cse", semester: 3 }
  ],

  // Communications
  communications: [
    {
      id: "feed_0",
      type: "task",
      priority: "high",
      title: "Submission Assignment",
      content: "Database class rescheduled to 2:00 PM. Submit assignment before then.",
      userId: "u_99",
      createdAt: "2025-12-28T09:00:00Z"
    },
    {
      id: "feed_1",
      type: "notice",
      title: "Class Reschedule",
      content: "Database class rescheduled to 2:00 PM.",
      sectionId: "sec_cse_3a",
      authorName: "Dr. Abu Jafar",
      isCR: false,
      createdAt: "2025-12-28T09:00:00Z"
    },
    {
      id: "feed_2",
      type: "poll",
      title: "Project Showcase Timing",
      content: "When should we host the project showcase?",
      sectionId: "sec_cse_3a",
      authorName: "Sabbir Ahmed",
      isCR: true,
      options: [
        { id: "opt_1", text: "Monday morning", votes: 15 },
        { id: "opt_2", text: "Tuesday evening", votes: 22 }
      ],
      createdAt: "2025-12-28T11:30:00Z"
    },
    {
      id: "feed_3",
      type: "issue",
      content: "Lab computers don't have Node.js installed.",
      sectionId: "sec_cse_3a",
      isAnonymous: true,
      authorName: "Anonymous",
      status: "open",
      createdAt: "2025-12-29T08:15:00Z"
    }
  ],

  // Exams/Assignments
  exams: [
    {
      id: "ex_1",
      title: "Quiz on SQL Joins",
      category: "Quiz",
      courseId: "c_dbms",
      sectionId: "sec_cse_3a",
      date: "2026-01-05",
      totalMarks: 20,
      teacherName: "Dr. Abu Jafar"
    },
    {
      id: "ex_2",
      title: "Algorithm Project Submission",
      category: "Project",
      courseId: "c_algo",
      sectionId: "sec_cse_3a",
      deadline: "2026-01-15",
      totalMarks: 50,
      teacherName: "Prof. Salma"
    },
    {
      id: "ex_3",
      title: "Math Presentation",
      category: "Presentation",
      courseId: "c_math",
      sectionId: "sec_cse_3a",
      date: "2026-01-10",
      totalMarks: 10,
      teacherName: "Mr. Rakib"
    }
  ]
};
