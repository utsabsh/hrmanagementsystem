import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User with given email not found" });
    }

    const token = jwt.sign(
      { id: results[0].id, email: results[0].email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }  // Token is valid for 1 hour
    );

    // TODO: Send email with the token
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    console.log("Send this link via email: ", resetLink);  // Placeholder for email sending

    return res.status(200).json({ message: "Password reset link has been sent to your email." });
  });
});

router.post("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10); // hashing the new password
    const sql = "UPDATE employee SET password = ? WHERE id = ?";
    con.query(sql, [hashedPassword, decoded.id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to reset password" });
      }
      return res.status(200).json({ message: "Password reset successfully" });
    });
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
// Check-in
router.post("/check-in/:id", (req, res) => {
  const { id } = req.params;
  const employeeId = parseInt(id, 10);
  const checkInTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `INSERT INTO attendance_records (employee_id, check_in) VALUES (?, ?)`;
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
  console.log(id)
  const employeeId = parseInt(id, 10);
  const checkOutTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `UPDATE attendance_records SET check_out = ? WHERE employee_id = ? AND check_out IS NULL`;
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
  const sql = "SELECT * FROM attendance_records";
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

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as EmployeeRouter };
