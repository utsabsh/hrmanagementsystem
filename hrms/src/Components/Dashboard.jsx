import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import { BsSpeedometer2 } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoPeople } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } h-screen p-5  pt-8 relative duration-300 bg-purple-700`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle Button"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt="Logo"
            onClick={() => setOpen(!open)}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Innovate Nepal
          </h1>
        </div>
        <div>
          <div className="mt-4">
            <Link
              to="/dashboard"
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
            >
              <BsSpeedometer2 color="white" size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </span>
            </Link>
            <Link
              to="/dashboard/employee"
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
            >
              <IoPeople color="white" size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Manage employee
              </span>
            </Link>
            <Link
              to="/dashboard/category"
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
            >
              <BiCategoryAlt color="white" size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Category
              </span>
            </Link>
            <Link
              to="/dashboard/attandence"
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
            >
              <CiCalendarDate color="white" size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Attendance
              </span>
            </Link>

            <li
              onClick={handleLogout}
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
            >
              <CiLogout color="white" size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </li>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="p-2 w-[100%] flex justify-center shadow">
          <h4 className="text-xl">Employee Management System</h4>
        </div>

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
