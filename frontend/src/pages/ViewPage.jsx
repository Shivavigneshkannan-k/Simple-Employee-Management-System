import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormPage from "./FormPage";
import { IndianRupee, Trash } from 'lucide-react';
import { GLOBAL_BASE_URL, LOCAL_BASE_URL, NODE_ENV } from "../constant";

const ViewPage = () => {
    const [hide,setHide] = useState(false);
    const [employees,setEmployees] = useState([]);
    const year = (date)=>{
        return new Date(date).toISOString().split("T")[0];
    }
    const age = (date)=>{
        return Math.floor((new Date()- new Date(date))/(1000 * 60 * 60 *24*365.25));
    }
    const getEmployees = async () => {
    try {
      const response = await axios.get(
        (NODE_ENV==="production"?GLOBAL_BASE_URL:LOCAL_BASE_URL)+"/api/v1/employee",
        { withCredentials: true }
      );
      toast.success(
        response?.data?.message || "All employee data is fetched"
      );
      setEmployees(response.data.data);
    } catch (err) {
      toast(
        err?.response?.data?.message ||
          err?.message ||
          "Error in Adding employee detail"
      );
    }
  };
    const deleteEmployee = async (emp_id) => {
    try {
      const response = await axios.delete(
    (NODE_ENV==="production"?GLOBAL_BASE_URL:LOCAL_BASE_URL)+`/api/v1/employee/${emp_id}`,
        { withCredentials: true }
      );
      toast.success(
        response?.data?.message || "Successfully deleted employee data"
      );
      setEmployees(prev => prev.filter(field => field._id!==emp_id));
    } catch (err) {
      toast(
        err?.response?.data?.message ||
          err?.message ||
          "Error in deletion of employee data"
      );
    }
  };
  useEffect(()=>{
    getEmployees();
  },[])

  return (
    <div className="flex flex-col">
        
      <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>Desgination</th>
              <th>Email Id</th>
              <th>Salary</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Date of Joining</th>
            </tr>
          </thead>
          <tbody>
           
            {employees && employees.length > 0 && (
              employees.map((emp) => (
                <tr key={emp._id}>
                <td>{emp._id}</td>
                <td>{emp?.name}</td>
                <td>{emp?.dept}</td>
                <td>{emp?.desgination}</td>
                <td>{emp?.emailId}</td>
                <td className="flex items-center"><IndianRupee size={15} /> {emp?.salary}</td>
                <td>{year(emp?.dataOfBirth)}</td>
                <td>{age(emp?.dataOfBirth)}</td>
                <td>{year(emp?.dataOfJoining)}</td>
                <td onClick={()=>{deleteEmployee(emp?._id)}}><Trash size={20}/></td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
      {hide &&<FormPage setEmployees={setEmployees} setHide={setHide}/>}
        <button className="btn btn-primary w-fit m-5" onClick={()=>setHide(true)}>Add Employee</button>
    </div>
  );
};

export default ViewPage;
