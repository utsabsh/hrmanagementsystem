import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const router = express.Router();

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employee Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err)
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Invalid Credentials" });
    }
  });
});

router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});
router.get("/leavedetail/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM leave_records where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});
// Check-in
router.post("/check-in/:id", (req, res) => {
  const { id } = req.params;
  const employeeId = parseInt(id, 10);
  const checkInTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `INSERT INTO attendence_records (employee_id, check_in) VALUES (?, ?)`;
  con.query(sql, [employeeId, checkInTime], (err, result) => {
    if (err) {
      console.error("Error checking in:", err);
      return res.status(500).json({ error: "Error checking in" });
    }
    if (result.affectedRows === 0) {
      console.error("Employee ID not found:", employeeId);
      return res.status(404).json({ error: "Employee ID not found" });
    }
    res.status(200).json({ message: "Checked in successfully" });
  });
});

// Check-out
router.post("/check-out/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const employeeId = parseInt(id, 10);
  const checkOutTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `UPDATE attendence_records SET check_out = ? WHERE employee_id = ? AND check_out IS NULL`;
  con.query(sql, [checkOutTime, employeeId], (err, result) => {
    if (err) {
      console.error("Error checking out:", err);
      return res.status(500).json({ error: "Error checking out" });
    }
    if (result.affectedRows === 0) {
      console.error(
        "Employee ID not found or already checked out:",
        employeeId
      );
      return res
        .status(404)
        .json({ error: "Employee ID not found or already checked out" });
    }
    res.status(200).json({ message: "Checked out successfully" });
  });
});
router.get("/attendance", (req, res) => {
  const sql = "SELECT * FROM attendence_records";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching attendance records:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    res.json(result);
  });
});

// server.js

// Route to fetch attendance records for a specific employee (optional: employee ID)
router.get("/attendance/:id", (req, res) => {
  let sql = "SELECT * FROM attendence_records"; // Assuming you want to select all columns
  const params = [];

  if (req.params.id) {
    sql += " WHERE employee_id = ?";
    params.push(req.params.id);
  }

  con.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error fetching attendance records:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    res.json(result);
  });
});
router.get("/leave/:id", (req, res) => {
  let sql = "SELECT * FROM leave_records"; // Assuming you want to select all columns
  const params = [];

  if (req.params.id) {
    sql += " WHERE employee_id = ?";
    params.push(req.params.id);
  }

  con.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error fetching leave records:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    res.json(result);
  });
});
router.get("/salaries", (req, res) => {
  db.query("SELECT * FROM Salary", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving salaries");
    } else {
      res.json(results);
    }
  });
});
router.get("/salary/:id", (req, res) => {
  let sql = "SELECT * FROM Salary"; // Assuming you want to select all columns
  const params = [];

  if (req.params.id) {
    sql += " WHERE employee_id = ?";
    params.push(req.params.id);
  }

  con.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error fetching leave records:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    res.json(result);
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as EmployeeRouter };
