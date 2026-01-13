import  { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/AppContext";
import api from "../helper/api.js";
import { useNavigate } from "react-router";
import Footer from "../components/Footer.jsx";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../components/Loader.jsx";
const Auth = ({ onLogin }) => {
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState("login");
  const[name,setName] = useState("")
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [deptList, setDeptList] = useState([])
  const [departmentId, setDepartmentId] = useState("");
   const [semester, setSemester] = useState("");
   const [password, setPassword] = useState("");
  // const [otp, setOtp] = useState("");
  const getDeptList = async ()=>{

    const response = await api.get('/authority/department-list')
    if(response.data.success){
      setDeptList(response.data.departments)
    }else{
      console.log('failed')
    }
  }
  useEffect(()=>{
  getDeptList()
  },[])

  
  const { dispatch } = useContext(AppContext)
              const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (mode) {

      case "login":
        try {
        setLoading(false)
          const response = await api.post('/auth/login', {email, password})
          if(response.data.success){
          dispatch({
            type: "LOGIN",
            payload: response.data.user
          })
            toast.success(`You Are Logged!`);
          navigate('/')
         }else{
         toast.error("Something went wrong!");
         }
        } catch (error) {
          // console.log(error)
          dispatch({type: "LOGOUT"})
        toast.error(error?.response?.data?.message || "Something went wrong!");
        }finally{
          setLoading(false)
        }
         break;


      case "register": 
    try {
      setLoading(true)
      const response = await api.post('/auth/register',{name, email,studentId, departmentId, password})
      if(response.data.success){
      toast.success(`Login Now!`);
        setMode('login')
      }else{
  toast.error("Something went wrong!");
      }
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
        break;

      // case "registerOtp":
      //   console.log("Verify register OTP:", otp);
      //   setMode("registerProfile");
      //   break;

      // case "registerProfile":
      //   console.log({
      //     email,
      //     studentId,
      //     deptId,
      //     batchId,
      //     password,
      //   });
      //   setMode("login");
      //   break;

      // /* ---------- FORGOT FLOW ---------- */
      // case "forgot":
      //   console.log("Send forgot OTP:", email);
      //   setMode("forgotOtp");
      //   break;

      // case "forgotOtp":
      //   console.log("Verify forgot OTP:", otp);
      //   setMode("forgotReset");
      //   break;

      // case "forgotReset":
      //   console.log("New password:", password);
      //   setMode("login");
      //   break;

      default:
        break;
    }
  };

  return (<>

  <div className="min-h-screen flex items-center justify-evenly bg-gray-50 px-4 bg-cover bg-center bg-no-repeat" >
    {loading && <Loader />}
    <div className="max-sm:hidden ">
  <h1 className="sm:text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
    Smart Section Management
  </h1>
  <p className="text-xs text-gray-500 tracking-wide">
   developed by <a className="underline text-blue-400" href="http://facebook.com/banrayndox.7"> Rakib Biswash</a>
  </p>
</div>
 

  <form
    onSubmit={handleSubmit}
    className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm p-6"
  >
    <h2 className="text-xl font-semibold text-center text-indigo-600 mb-5">
      {{
        login: "Login",
        register: "Register",
        registerOtp: "Verify Email",
        registerProfile: "Complete Profile",
        forgot: "Forgot Password",
        forgotOtp: "Verify OTP",
        forgotReset: "Set New Password",
      }[mode]}
    </h2>

    {(mode === "login" || mode === "register" || mode === "forgot") && (
      <div className="mb-3">
        <label className="text-xs font-medium text-gray-600">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
    )}

    {mode === "login" && (
      <div className="mb-3">
        <label className="text-xs font-medium text-gray-600">Password</label>
        <input
          type="password"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    )}

    {mode === "register" && (
      <>
            <div className="mb-3">
          <label className="text-xs font-medium text-gray-600">Full Name</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="text-xs font-medium text-gray-600">Student ID</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-xs font-medium text-gray-600">Department</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          > <option value="" disabled>Choose a department</option>
        {deptList?.map((dept) => (
         <option key={dept._id} value={dept._id}>
          {dept.name}
         </option>
         ))}


          </select>
        </div>


        <div className="mb-3">
          <label className="text-xs font-medium text-gray-600">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </>
    )}

    <button className="w-full mt-4 bg-indigo-900 text-white text-sm py-2 rounded-md hover:bg-gray-800 transition">
      {{
        login: "Login",
        register: "Register",
        registerOtp: "Verify OTP",
        registerProfile: "Create Account",
        forgot: "Send OTP",
        forgotOtp: "Verify OTP",
        forgotReset: "Change Password",
      }[mode]}
    </button>

    {mode === "login" && (
      <div className="text-xs text-center mt-4 text-gray-500">
        No account?{" "}
        <span
          onClick={() => setMode("register")}
          className="text-gray-900 font-semibold cursor-pointer"
        >
          Register
        </span>
      </div>
    )}

    {mode !== "login" && (
      <div className="text-xs text-center mt-4 text-gray-500">
        Back to{" "}
        <span
          onClick={() => setMode("login")}
          className="text-gray-900 font-semibold cursor-pointer"
        >
          Login
        </span>
      </div>
    )}
  </form>
  
</div>
<div className="sm:hidden"><Footer /></div>
</>
  );
};

export default Auth;
