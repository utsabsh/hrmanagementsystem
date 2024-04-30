import React, { useState, useEffect } from "react";

function App() {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/api/salaries`);
      const data = await response.json();
      setSalaries(data);
    } catch (error) {
      console.error("Error fetching salaries:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Salary List</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Employee ID</th>
            <th className="px-4 py-2">Salary</th>
            <th className="px-4 py-2">Bonus</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.id}>
              <td className="border px-4 py-2">{salary.id}</td>
              <td className="border px-4 py-2">{salary.employee_id}</td>
              <td className="border px-4 py-2">{salary.salary}</td>
              <td className="border px-4 py-2">{salary.bonus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
