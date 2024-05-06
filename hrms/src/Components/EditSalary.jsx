import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditSalary = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    salary: "",
    bonus: "",
    overtime: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          salary: result.data.Result[0].salary,
          bonus: result.data.Result[0].bonus,
          overtime: result.data.Result[0].overtime,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_salary/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/salary");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <div className="p-3 rounded border w-1/2">
        <h3 className="text-center">Edit Salary</h3>
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inputName" className="block">
              Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="inputSalary" className="block">
              Salary
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputSalary"
              placeholder="Enter Salary"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="inputBonus" className="block">
              Bonus
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputBonus"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.bonus}
              onChange={(e) =>
                setEmployee({ ...employee, bonus: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="inputBonus" className="block">
              Overtime
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputOvertime"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.overtime}
              onChange={(e) =>
                setEmployee({ ...employee, overtime: e.target.value })
              }
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded"
            >
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSalary;
