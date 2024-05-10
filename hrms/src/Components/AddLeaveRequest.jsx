import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddLeaveRequest = () => {
  const [leaveRequest, setLeaveRequest] = useState({
    employee_id: "",
    description: "",
    type: "paid",
    from_date: "",
    to_date: "",
    status: "pending",
  });
  const { id: employee_id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:3000/auth/add_leave/${employee_id}`,
        leaveRequest
      );
      if (result.data.status) {
        navigate(`/employee_dashboard/leave/${employee_id}`);
      } else {
        alert("Failed to add leave request");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add leave request");
    }
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <div className="p-3 rounded w-96 border">
        <h3 className="text-center font-bold text-xl">Add Leave Request</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <label htmlFor="inputEmployeeId" className="block">
            Employee ID
          </label>
          <input
            type="text"
            id="inputEmployeeId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={employee_id}
            readOnly
          />

          <label htmlFor="inputDescription" className="block">
            Description
          </label>
          <input
            type="text"
            id="inputDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Description"
            value={leaveRequest.description}
            onChange={(e) =>
              setLeaveRequest({
                ...leaveRequest,
                description: e.target.value,
              })
            }
            required
          />

          <label htmlFor="type" className="block">
            Type
          </label>
          <select
            name="type"
            id="type"
            onChange={(e) =>
              setLeaveRequest({
                ...leaveRequest,
                type: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>

          <label htmlFor="from" className="block">
            From
          </label>
          <input
            type="date"
            name="from"
            id="from"
            placeholder="From"
            onChange={(e) =>
              setLeaveRequest({
                ...leaveRequest,
                from_date: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="to" className="block">
            To
          </label>
          <input
            type="date"
            name="to"
            id="to"
            placeholder="To"
            onChange={(e) =>
              setLeaveRequest({
                ...leaveRequest,
                to_date: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveRequest;
