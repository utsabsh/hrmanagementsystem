import "./App.css";

import Loginpage from "./Components/Loginpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Attandence from "./Components/Attandence";
import Category from "./Components/Category";
import Profile from "./Components/Profile";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import EmployeeAttandence from "./Components/EmployeeAttandence";
import Start from "./Components/Start";
import EmployeeLogin from "./Components/EmployeeLogin";
import EmployeeDetail from "./Components/EmployeeDetail";
import PrivateRoute from "./Components/PrivateRoute";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import EmployeeHome from "./Components/EmployeeHome";
import EmployeeContact from "./Components/EmployeeContact";
import IndividualAttendence from "./Components/IndividualAttendence";
import ForgetPassword from "./Components/ForgetPassword";
import SuccessMessage from "./Components/SuccessMessage";
import Salary from "./Components/Salary";
import EditSalary from "./Components/EditSalary";
import SalaryDetail from "./Components/SalaryDetail";
import Leave from "./Components/Leave";
import AddLeaveRequest from "./Components/AddLeaveRequest";
import LeaveRequest from "./Components/LeaveRequest";
import Description from "./Components/Description";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Loginpage />}></Route>
        <Route path="/employee_login" element={<EmployeeLogin />}></Route>
        <Route path="/forgot-password" element={<ForgetPassword />}></Route>
        <Route path="/successMessage" element={<SuccessMessage />}></Route>
        <Route path="leaveDescription/:id" element={<Description />} />
        <Route path="/employee_dashboard" element={<EmployeeDashboard />}>
          <Route
            path="/employee_dashboard/contact/:id"
            element={<EmployeeContact />}
          />
          <Route
            path="/employee_dashboard/attendance/:id"
            element={<EmployeeAttandence />}
          />
          <Route
            path="/employee_dashboard/employee_detail/:id"
            element={<EmployeeDetail />}
          ></Route>
          <Route
            path="/employee_dashboard/salary/:id"
            element={<SalaryDetail />}
          ></Route>
          <Route
            path="/employee_dashboard/leave/:id"
            element={<Leave />}
          ></Route>
          <Route
            path="/employee_dashboard/add_leave/:id"
            element={<AddLeaveRequest />}
          />
          <Route
            path="/employee_dashboard/leaveDescription/:id"
            element={<Description />}
          />
        </Route>

        <Route
          path="/employee_attendence/:id"
          element={<EmployeeAttandence />}
        ></Route>

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="/dashboard/employee" element={<Employee />} />
          <Route path="/dashboard/salary" element={<Salary />} />
          <Route path="/dashboard/category" element={<Category />} />
          <Route path="/dashboard/attandence" element={<Attandence />} />
          <Route path="/dashboard/leave" element={<LeaveRequest />} />

          <Route path="/dashboard/add_category" element={<AddCategory />} />
          <Route path="/dashboard/add_employee" element={<AddEmployee />} />

          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit_salary/:id"
            element={<EditSalary />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
