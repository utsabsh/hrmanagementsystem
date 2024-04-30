import React from "react";
import { Link } from "react-router-dom";

const SuccessMessage = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-400 to-purple-600 h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-green-500 text-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Success</h1>
          <p>Your email has been successfully delivered</p>
          <Link to="/employee_login">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 mt-5">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
