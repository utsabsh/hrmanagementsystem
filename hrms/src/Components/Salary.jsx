import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Salary = () => {
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

  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center">
        <h3>Salary List</h3>
      </div>

      <div className="mt-3">
        <table className="table-auto w-full text-center capitalize">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Bonus</th>
              <th className="px-4 py-2">Overtime</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td className="border px-4 py-2">{e.id}</td>
                <td className="border px-4 py-2">{e.name}</td>
                <td className="border px-4 py-2">{e.salary}</td>
                <td className="border px-4 py-2">{e.bonus}</td>
                <td className="border px-4 py-2">{e.overtime}</td>
                <td className="border px-4 py-2">
                  {e.salary + e.bonus + e.overtime}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/dashboard/edit_salary/${e.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salary;
