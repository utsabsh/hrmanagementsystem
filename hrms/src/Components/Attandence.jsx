import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Attandence = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/attendance")
      .then((response) => {
        setAttendanceRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance records:", error);
      });
  }, []);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Employee ID</th>
            <th className="px-4 py-2">Check In</th>
            <th className="px-4 py-2">Check Out</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td className="border px-4 py-2">{record.employee_id}</td>
              <td className="border px-4 py-2">{record.check_in}</td>
              <td className="border px-4 py-2">
                {record.check_out || "Not checked out"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attandence;
