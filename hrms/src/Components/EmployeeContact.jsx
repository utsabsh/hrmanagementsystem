import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeContact = () => {
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
        <h3>Employee Information List</h3>
      </div>

      <div className="mt-3">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>

              <th className="px-4 py-2">Photos</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
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
                <td className="border px-4 py-2">{e.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeContact;
