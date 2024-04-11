import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function IndividualAttendence() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true); // Set loading state before fetching data
    axios
      .get("http://localhost:3000/employee/attendance/" + id)
      .then((response) => {
        setAttendanceRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance records:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading state after fetching data
      });
  }, [id]); // Re-fetch data when id changes

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
      {loading ? (
        <p>Loading...</p> // Display loading indicator
      ) : attendanceRecords.length === 0 ? (
        <p>No attendance records found.</p> // Display message if no records found
      ) : (
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
      )}
    </div>
  );
}

export default IndividualAttendence;
