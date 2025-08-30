import { Button, Dialog, DialogContent, DialogTitle, IconButton, Input, Slide, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import { singleexpenseDetails, statusChange } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";



const EmployeeDetails = ({ open, handleClose, empdata }) => {
    const [data, setData] = useState([]);
    const [status,setStatus] = useState({})
    
    useEffect(() => {
        singleexpenseDetails(empdata.empId, empdata.expenseId).then((response) => {
            setData(response.data)
            console.log(data)
        }).catch(error => {
            console.log(error);
        })

        const initialStatus = {
            applicationId: empdata.expenseId,
            managerId: empdata.managerId,
            managercomment: '',
            status:''
        }
       setStatus(initialStatus)
        
        
    }, [empdata.empId, empdata.expenseId])

   

    const navigate = useNavigate();

    const viewRecipt = (recipt) =>{
        console.log("http://localhost:8001/"+recipt);
        {<a href={"http://localhost:8001/"+recipt} target="_blank" rel="noopener noreferrer" download></a>}
    }

    
    const handleApprove = () => {
        
        // setStatus((prev) => ({ status :{...prev.status,"status":"Approved"}}))
        // console.log(status)

        setStatus(status.status="Approved")
        console.log(status)
        statusChange(status)
        
        handleClose()
        
    }

    const handleReject = () => {

        setStatus(status.status="Rejected")
        console.log(status)
        statusChange(status)
        handleClose()
        

    }
    const handleInputChange = (e) => {
        setStatus({ ...status, [e.target.name]: e.target.value });
        console.log(status)
        
    };




    return (
        
        <div className="container mt-5" >
           

            <form>
                <div className="row">
                    <div className='col'>
                    <label>Employee ID</label>
                        <input
                            type="text"
                            label="Employee ID"
                            className="form-control"
                            name="empId"
                            placeholder="EmpID"
                            value={data.empId}
                            disabled
                        />

                           

                    </div>
                    <div className='col'>
                    <label>Employee Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="empName"
                            label="Employee Name"
                            placeholder="EmpName"
                            value={data.empName}
                            disabled
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <label>Position</label>
                        <input
                            type="text"
                            label="Position"
                            className="form-control"
                            name="empPosition"
                            placeholder="Position"
                            value={data.empPosition}
                            disabled
                            style={{ marginTop: '8px' }}
                        />
                    </div>
                    <div className="col">
                    <label>Email</label>
                        <input
                            type="email"
                            label="Email"
                            className="form-control mt-2"
                            name="empEmail"
                            placeholder="Email"
                            value={data.empEmail}
                            disabled />
                    </div>
                </div>
                <div className="row">
                    <div className='col'>
                    <label>Country</label>
                        <input
                            type="text"
                            label="Country"
                            className="form-control"
                            name="empCountry"
                            placeholder="Location"
                            value={data.empCountry}
                            disabled
                            style={{ marginTop: '8px' }}

                        />
                    </div>
                    <div className="col">
                    <label>Applied Date</label>
                        <input
                            type="date"
                            label="Applied Date"
                            className="form-control mt-2"
                            name="date"
                            value={data.date}
                            disabled
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col'>
                        <lable>Category</lable>
                        <input
                            type="text"
                            className="form-control"
                            label="Category"
                            name="category"
                            placeholder="Category"
                            value={data.category}
                            disabled
                            style={{ marginTop: '8px' }}

                        />
                    </div>
                    <div className="col">
                    <lable>Amount</lable>
                        <input
                            type="number"
                            className="form-control mt-2"
                            id="amount"
                            label="Amount"
                            name="amount"
                            placeholder="Amount"
                            value={data.amount}
                            disabled
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col'>
                        <label>User Remarks</label>
                        <input
                            type="text"
                            className="form-control"
                            name="usercomment"
                            label="User Remarks"
                            placeholder=" User Remarks"
                            value={data.usercomment}
                            disabled
                            style={{ marginTop: '8px' }}
                        />
                    </div>
                    <div className="col">
                        <label>Expense ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="expenseId"
                            label="Expense ID"
                            placeholder="Application ID"
                            value={data.expenseId}
                            disabled
                            style={{ marginTop: '8px' }}

                        />
                    </div>
                </div>
                <div className="mb-3">
        <textarea
          className="form-control"
          name="managercomment"
          placeholder="Manager Remarks"
          value={status.managercomment}
          onChange={handleInputChange}
          style={{ marginTop: '8px',backgroundColor:'#e1f0ec' }}

        />
      </div>
                <div style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                <a href={"http://localhost:8001/"+data.recipt} target="_blank" rel="noopener noreferrer" download>
                    <Button variant="contained" color="success"  style={{ marginRight: '8px', marginTop: '16px' }}>View Receipt</Button></a>
                    <Button variant="contained" color="primary" name="status" onClick={handleApprove} style={{ marginRight: '8px', marginTop: '16px', marginLeft: '8px' }}>Approve</Button>
                    <Button variant="contained" color="secondary" onClick={handleReject} style={{ marginLeft: '8px', marginTop: '16px' }}>Decline</Button>
                </div>
            </form>
        </div>
       
    );
};

export default EmployeeDetails;