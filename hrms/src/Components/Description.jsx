import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Description = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/leavedetail/${id}`)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray-200 p-8 rounded shadow-md w-1/2">
        <h1 className="text-2xl font-bold mb-4">Employee ID: {employee.id}</h1>
        <h2 className="text-xl mb-2">Description:</h2>
        <p className="px-4 py-2 bg-gray-100 rounded">{employee.description}</p>
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;
