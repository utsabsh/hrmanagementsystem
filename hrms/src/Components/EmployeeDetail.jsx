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
          <h4 className="text-center font-bold text-xl">Profile</h4>
        </div>
        <div className="flex flex-row ">
          <div className="flex justify-center flex-col items-center mt-3 bg-slate-300 w-2/3 h-[87vh]">
            <img
              src={`http://localhost:3000/Images/${employee.image}`}
              className="m-3 flex h-40 w-40 rounded-lg items-center justify-center bg-blue-600"
            />
            <div className="flex flex-col items-center mt-5">
              <h3>{employee.name}</h3>
            </div>
          </div>

          <div className="flex justify-center text-left flex-col  mt-3  border border-l-black w-1/3 gap-4">
            <h3 className="ml-4 mt-7 flex gap-2 ">
              <>Employee Id: </>
              <p className="capitalize"> {employee.id}</p>
            </h3>
            <hr className="border-gray-800 dark:border-white"></hr>
            <h3 className="ml-4 mt-7 flex gap-2 ">
              <>Employee name: </>
              <p className="capitalize"> {employee.name}</p>
            </h3>
            <hr className="border-gray-800 dark:border-white"></hr>
            <h3 className="ml-4 mt-7">Phone no: {employee.phone}</h3>
            <hr className="border-gray-800 dark:border-white"></hr>
            <h3 className="ml-4 mt-7">Address: {employee.address}</h3>
            <hr className="border-gray-800 dark:border-white"></hr>
            <h3 className="ml-4 mt-7">Salary: {employee.salary}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;
