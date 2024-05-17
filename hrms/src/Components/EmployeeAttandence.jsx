import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import IndividualAttendence from "./IndividualAttendence";

function EmployeeAttendance() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/employee/check-in/` + id);
      setMessage("Checked in successfully");
    } catch (error) {
      setMessage("Error checking in");
    }
    setLoading(false);
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/employee/check-out/` + id);
      setMessage("Checked out successfully");
    } catch (error) {
      setMessage("Error checking out");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label
            htmlFor="employeeId"
            className="block text-gray-700 text-xxl font-bold mb-2"
          ></label>
          <p>Employee ID: {id}</p>
        </div>
        <button
          onClick={handleCheckIn}
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Checking In..." : "Check In"}
        </button>
        <button
          onClick={handleCheckOut}
          disabled={loading}
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-4 rounded ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Checking Out..." : "Check Out"}
        </button>
        {message && <p className="mt-4">{message}</p>}
      </div>
      <IndividualAttendence />
    </>
  );
}

export default EmployeeAttendance;
