import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import EmployeeDashboard from "./EmployeeDashboard";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  // const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/detail/" + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div>
        <div className="p-2 flex justify-center shadow">
          <h4 className="text-center">Employee Management System</h4>
        </div>
        <div className="flex justify-center flex-col items-center mt-3">
          <img
            src={`http://localhost:3000/Images/${employee.image}`}
            className="m-3 flex h-400 w-600 items-center justify-center rounded-full bg-blue-600"
          />
          <div className="flex flex-col items-center mt-5">
            <h3>Name: {employee.name}</h3>
            <h3>Email: {employee.email}</h3>
            <h3>Salary: ${employee.salary}</h3>
          </div>

          <Link to={`/employee_attendence/` + id}>Attendence</Link>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;
