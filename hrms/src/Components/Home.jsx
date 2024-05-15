import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setemployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get("http://localhost:3000/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };
  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };
  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee);
      }
    });
  };
  const salaryCount = () => {
    axios.get("http://localhost:3000/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp);
      } else {
        alert(result.data.Error);
      }
    });
  };
  return (
    <div>
      <div className="flex justify-around mt-5">
        <div className="p-3 border shadow-sm w-1/4 bg-green-300">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="flex justify-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="p-3 border shadow-sm w-1/4  bg-yellow-300">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="flex justify-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="p-3 border shadow-sm w-1/4  bg-red-300">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="flex justify-between">
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3 className="font-bold">List of Admins</h3>

        {admins.map((a) => (
          <tr key={a.id}>
            <td className="p-3">{a.email}</td>
            <td className="p-3">{a.password}</td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default Home;
