// LeaveRequest.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LeaveRequest = () => {
  const navigate = useNavigate();
  const [leave, setLeave] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/leave")
      .then((result) => {
        if (result.data.Status) {
          setLeave(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((error) =>
        setError("An error occurred while fetching leave requests")
      );
  }, []);

  const updateStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:3000/auth/update_leave/${id}`, {
        status: newStatus,
      })
      .then((result) => {
        if (result.data.status) {
          setLeave(
            leave.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
          );
        } else {
          setError(result.data.error);
        }
      })
      .catch((err) =>
        setError("An error occurred while updating the leave request status")
      );
  };

  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center">
        <h3 className="font-bold text-xl">Leave Requests</h3>
      </div>

      <div className="mt-3">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Employee ID</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {leave.map((e) => (
              <tr key={e.id}>
                <td className="border px-4 py-2 text-center">
                  {e.employee_id}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate("/leaveDescription/" + e.id);
                    }}
                  >
                    Description
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">{e.type}</td>
                <td className="border px-4 py-2 text-center">
                  {new Date(e.from_date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  {new Date(e.to_date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-center">{e.status}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mx-4 rounded"
                    onClick={() => updateStatus(e.id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => updateStatus(e.id, "Declined")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequest;
