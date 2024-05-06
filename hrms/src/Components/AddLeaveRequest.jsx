import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddLeaveRequest = () => {
  const [LeaveRequest, setLeaveRequest] = useState({
    employee_id: "",
    description: "",
    type: "sick",
    from_date: "",
    to_date: "",
    status: "pending",
  });
  const { id: employee_id } = useParams(); // Get employee_id from URL params
  const navigate = useNavigate();

  useEffect(() => {
    setLeaveRequest((prev) => ({ ...prev, employee_id }));
  }, [employee_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employee_id", employee_id); // Use employee_id from URL params
    formData.append("description", LeaveRequest.description);
    formData.append("type", LeaveRequest.type);
    formData.append("from_date", LeaveRequest.from_date);
    formData.append("to_date", LeaveRequest.to_date);
    formData.append("status", LeaveRequest.status);
    console.log(LeaveRequest);

    axios
      .post(`http://localhost:3000/auth/add_leave/${employee_id}`, formData)
      .then((result) => {
        console.log("Response:", result.data); // Log the response
        if (result.data.status) {
          navigate(`/employee_dashboard/leave/${employee_id}`);
        } else {
          alert(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => {
        console.log("Error:", err); // Log any errors
      });
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <div className="p-3 rounded w-96 border">
        <h3 className="text-center">Add Leave Request</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <label htmlFor="inputEmployeeId" className="block">
            Employee ID
          </label>
          <input
            type="text"
            id="inputEmployeeId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={LeaveRequest.employee_id}
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
            value={LeaveRequest.description}
            onChange={(e) =>
              setLeaveRequest({
                ...LeaveRequest,
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
                ...LeaveRequest,
                type: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Sick">Sick</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Un-paid</option>
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
                ...LeaveRequest,
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
                ...LeaveRequest,
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
