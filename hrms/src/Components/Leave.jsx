import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Leave() {
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true); // Set loading state before fetching data
    axios
      .get("http://localhost:3000/employee/leave/" + id)
      .then((response) => {
        setLeave(response.data);
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
      <h1 className="text-2xl font-bold mb-4 ml-5">Leave Records</h1>
      <Link
        to={`/employee_dashboard/add_leave/${id}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 ml-5"
      >
        Add Leave
      </Link>
      {loading ? (
        <p>Loading...</p> // Display loading indicator
      ) : leave.length === 0 ? (
        <p>No leave records found.</p> // Display message if no records found
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2"> Employee ID</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leave.map((e) => (
              <tr key={e.id}>
                <td className="border px-4 py-2">{e.employee_id}</td>
                <td className="border px-4 py-2">{e.description}</td>
                <td className="border px-4 py-2">{e.type}</td>
                <td className="border px-4 py-2">
                  {new Date(e.from_date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(e.to_date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leave;
