import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { GLOBAL_BASE_URL, LOCAL_BASE_URL, NODE_ENV } from "../constant";

const FormPage = ({ setHide, setEmployees }) => {
  const [employee, setEmployee] = useState({
    name: "",
    dob: "",
    emailId: "",
    salary: undefined,
    role: "",
    doj: "",
    dept: "",
    join: ""
  });
  const handleSubmit = async () => {
    const { name, dob, emailId, salary, role, doj, dept, join } =
      employee || {};
    if (
      [name, doj, emailId, role, dept, join].some((field) => field === "") ||
      !salary
    ) {
      return toast.error("all fields are required");
    }
    const age = Math.floor(
      (new Date() - new Date(employee.dob)) / (1000 * 60 * 60 * 24 * 365)
    );
    if (age < 20) {
      return toast.error("Less than legal age to work");
    }
    try {
      const response = await axios.post(
        (NODE_ENV==="production"?GLOBAL_BASE_URL:LOCAL_BASE_URL)+"/api/v1/employee",
        { name, emailId, salary, role, doj, dob, dept },
        { withCredentials: true }
      );
      toast.success(
        response?.data?.message || "employee added successfully"
      );
      setEmployees((prev) => [...prev,response?.data?.data]);
      setTimeout(() => {
        setHide(false);
      }, 1000);
    } catch (err) {
      toast(
        err?.response?.data?.message ||
          err?.message ||
          "Error in Adding employee detail"
      );
    }
  };

  const handleChange = (e) => {
    setEmployee((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const formatDate = () => {
    return new Date(Date.now()).toISOString().split("T")[0];
  };
  return (
    <div className='flex items-center justify-center z-20 absolute w-full lg:my-10 '>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='lg:w-1/3 w-1/2 my-5 rounded-md p-5 bg-base-200 '>
        <h1 className='my-5 text-2xl '>Add Employee Details</h1>

        <div className='container'>
          <label>Employee name</label>
          <input
            type='text'
            name='name'
            value={employee.name}
            onChange={(e) => {
              handleChange(e);
            }}
            className='input '
          />
        </div>

        <div className='container'>
          <label>Email</label>
          <input
            type='email'
            name='emailId'
            value={employee.emailId}
            onChange={(e) => {
              handleChange(e);
            }}
            className='input'
          />
        </div>
        <div className='container'>
          <label>Date of Birth</label>
          <input
            type='date'
            name='dob'
            value={employee.dob}
            onChange={(e) => {
              handleChange(e);
            }}
            className='input'
          />
        </div>
        <div className='container'>
          <label>Department</label>
           <select
            className='input'
            name='dept'
            value={employee.dept}
            onChange={(e) => {
              handleChange(e);
            }}>
            <option value=''>--choose an option--</option>
            <option value='manager'>IT</option>
            <option value='Software Development'>Software Development</option>
            <option value='DevOps / SRE'>DevOps / SRE</option>
            <option value='Cybersecurity'>Cybersecurity </option>
            <option value='UI/UX Design'>UI/UX Design	</option>
          </select>
        </div>
        <div className='container'>
          <label>Role</label>
          <select
            className='input'
            name='role'
            value={employee.role}
            onChange={(e) => {
              handleChange(e);
            }}>
            <option value=''>--choose an option--</option>
            <option value='manager'>Manager</option>
            <option value='hr'>Hiring Manager</option>
            <option value='employee'>Employee</option>
            <option value='team lead'>Team Lead</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <div className='container'>
          <label>Salary</label>
          <input
            type='number'
            name='salary'
            className='input'
            value={employee.salary}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className='container'>
          <label>Joining</label>
          <select
            className='input'
            value={employee.join}
            name='join'
            onChange={(e) => {
              handleChange(e);
            }}>
            <option value=''>--choose an option--</option>
            <option value='old'>Existing Employee</option>
            <option value='new'>New Joinee</option>
          </select>
        </div>

        {employee.join && (
          <div className='container'>
            <label>Date of Joining</label>
            <br />
            <input
              type='date'
              name='doj'
              min={employee?.join === "new" ? formatDate() : ""}
              max={employee?.join === "old" ? formatDate() : ""}
              value={employee.doj}
              onChange={(e) => {
                handleChange(e);
              }}
              className='input'
            />
          </div>
        )}
        <div className='container'>
          {employee.dob && (
            <span>
              Age:{" "}
              {Math.floor(
                (new Date() - new Date(employee.dob)) /
                  (1000 * 60 * 60 * 24 * 365)
              )}
            </span>
          )}
        </div>
          <div className="flex justify-between m-5">
            <button
            className='btn w-1/3 my-2 block button'
            onClick={handleSubmit}>
            SAVE
            </button>
            <button
            className='btn w-1/3 my-2 block button-cancel'
            onClick={()=>setHide(false)}>
            Cancel
            </button>

          </div>
      </form>
    </div>
  );
};

export default FormPage;
