import { useState, useContext } from "react";
import { AppContext } from "../store/AppContext.jsx";
import { useNavigate } from "react-router";
import api from "../helper/api.js";
import toast from "react-hot-toast";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Profile from "../pages/Profile.jsx";

import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  const user = state?.user;
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await api.get("/auth/logout");
      dispatch({ type: "LOGOUT" });
           toast.success(`You Are Logged Out!`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setProfileOpen(false)}
          ></div>
          <div className="relative z-50">
            <Profile userId={state?.user?._id} isClose={() => setProfileOpen(false)}  />
          </div>
        </div>
      )}


      <header className="fixed top-0 left-0 w-full h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-40">

        <h1 className="text-sm sm:text-base font-semibold text-indigo-600 tracking-wide">
          Smart Section Management
        </h1>


        <div className="flex items-center gap-4">

          <div
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition"
          >
            <FaUserCircle className="text-xl text-gray-600" />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user?.name}
            </span>
          </div>

    
          <button
            onClick={logoutHandler}
            className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-700 active:scale-95 transition"
          >
            Logout
          </button>
        </div>
      </header>


      <div className="h-14"></div>
      {/* <JoinCourse /> */}
      {/* <CreateCourse /> */}
     <Navbar />
      <Footer />
    </>
  );
};

export default Header;
