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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Loginpage />}></Route>
        <Route path="/employee_login" element={<EmployeeLogin />}></Route>
        <Route path="/forgot-password" element={<ForgetPassword/>}></Route>
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
        </Route>

        <Route
          path="/employee_attendence/:id"
          element={<EmployeeAttandence />}
        ></Route>

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="/dashboard/employee" element={<Employee />} />
          <Route path="/dashboard/category" element={<Category />} />
          <Route path="/dashboard/attandence" element={<Attandence />} />

          <Route path="/dashboard/add_category" element={<AddCategory />} />
          <Route path="/dashboard/add_employee" element={<AddEmployee />} />
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
