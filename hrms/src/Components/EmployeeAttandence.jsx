import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import IndividualAttendence from "./IndividualAttendence";

function EmployeeAttendance() {
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const handleCheckIn = async () => {
    try {
      await axios.post(`http://localhost:3000/employee/check-in/` + id);
      setMessage("Checked in successfully");
    } catch (error) {
      setMessage("Error checking in");
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.post(`http://localhost:3000/employee/check-out/` + id);
      setMessage("Checked out successfully");
      console.log(id)
    } catch (error) {
      setMessage("Error checking out");
      console.log(id)
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label
            htmlFor="employeeId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Employee ID:
          </label>
          <p>Employee ID: {id}</p>
        </div>
        <button
          onClick={handleCheckIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-4 rounded"
        >
          Check Out
        </button>
        {message && <p className="mt-4">{message}</p>}
      </div>
      <IndividualAttendence />
    </>
  );
}

export default EmployeeAttendance;
