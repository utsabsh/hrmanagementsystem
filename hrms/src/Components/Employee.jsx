import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center">
        <h3>Employee List</h3>
      </div>
      <Link
        to="/dashboard/add_employee"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td className="border px-4 py-2">{e.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:3000/Images/${e.image}`}
                    alt={e.name}
                    className="w-15 h-10"
                  />
                </td>
                <td className="border px-4 py-2">{e.email}</td>
                <td className="border px-4 py-2">{e.address}</td>
                <td className="border px-4 py-2">{e.phone}</td>
                <td className="border px-4 py-2">{e.salary}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/dashboard/edit_employee/${e.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
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

export default Employee;
