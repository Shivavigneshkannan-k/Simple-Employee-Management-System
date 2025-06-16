import express from "express";
import validator from "validator";
const router = express.Router();
import Employee from "../models/employee.model.js";

router.post("/employee", async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, emailId, salary, role,doj,dob, dept } = req?.body || {};

    const Doj = new Date(doj);
    const Dob = new Date(dob);
  
    const ALLOWED_ROLES = ["admin", "manager", "team lead", "employee", "hr"];
    if (
      [name,emailId, role, dept].some((field) => field === "")
    ) {
      const err = new Error("Fields can't be empty");
      err.statusCode = 400;
      throw err;
    } else if (!validator.isEmail(emailId)) {
      const err = new Error("Invalid Email");
      err.statusCode = 400;
      throw err;
    } else if (isNaN(Dob) || isNaN(Doj)) {
      const err = new Error("Invalid Date");
      err.statusCode = 400;
      throw err;
    } else if (!ALLOWED_ROLES.includes(role)) {
        const err = new Error("Invalid Roles");
        err.statusCode = 401;
      throw err;
    }
    const newEmployee = await Employee.create({
      name,
      salary,
      desgination: role,
      dataOfJoining: Doj,
      dataOfBirth: Dob,
      dept,
      emailId
    });

    res.status(201).json({
        success:true,
        message: "new Employee added Successfully",
        data: newEmployee
    })
  } catch (err) {
    const _status = err.statusCode || 500;
    const _message = err.message || "Internal Server Error";
    res.status(_status).json({
      success: false,
      message: _message,
      data: null
    });
  }
});
router.get("/employee", async (req, res, next) => {
  try {
    
    const employees = await Employee.find();

    res.status(201).json({
        success:true,
        message: "All employee data",
        data: employees
    })
  } catch (err) {
    const _status = err.statusCode || 500;
    const _message = err.message || "Internal Server Error";
    res.status(_status).json({
      success: false,
      message: _message,
      data: null
    });
  }
});
router.delete("/employee/:emp_id", async (req, res, next) => {
  try {
    const emp_id = req?.params?.emp_id;
    const employee =await Employee.findByIdAndDelete(emp_id)

    res.status(200).json({
        success:true,
        message: "employee details is successfully deleted",
        data: employee
    })
  } catch (err) {
    const _status = err.statusCode || 500;
    const _message = err.message || "Internal Server Error";
    res.status(_status).json({
      success: false,
      message: _message,
      data: null
    });
  }
});



export default router;
