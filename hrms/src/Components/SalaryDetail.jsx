import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SalaryDetail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/detail/" + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center">
        <h3>Salary Information List</h3>
      </div>

      <div className="mt-3">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Employee id</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Bonus</th>
              <th className="px-4 py-2">Overtime</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr key={employee.id}>
              <td className="border px-4 py-2">{employee.id}</td>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{employee.salary}</td>
              <td className="border px-4 py-2">{employee.bonus}</td>
              <td className="border px-4 py-2">{employee.overtime}</td>
              <td className="border px-4 py-2">
                {employee.salary + employee.bonus + employee.overtime}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryDetail;
