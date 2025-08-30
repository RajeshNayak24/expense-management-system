
import { Card, CardContent } from '@mui/material';
import React, { useState } from 'react';
import { addExpense,getExpenseByEmployee } from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';

const categoryOptions = ['--CATEGORY--','Internet', 'Travel',  
                        'Team Lunch/Dinner', 'Sports Events', 'Cultural Events','Award Ceremonies'];

function ExpenseForm({props, empId}) {
  console.log("Got empId:", empId);
  const navigate = useNavigate();
  const initialFormData = {
    empId: props.data.empId,
    managerId: props.data.mgnId,
    // empName:'',
    // position: '',
    // email: '',
    // location: '',
    category: '',
    amount: '',
    recipt: '',
    usercomment: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, recipt: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addExpense(formData);
    props.handleClose()
    getExpenseByEmployee().then((res) => {
      console.log(res.data);
    });
  };


  return (


    <div className="container mt-5" >
     
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className='col'>
            <label>Employee ID</label>
          <input
            type="text"
            className="form-control"
            name="empID"
            placeholder="EmpID"
            value={formData.empId}
            disabled
          />
        </div>
        <div className='col'>
        <input
            type="text"
            className="form-control"
            name="empName"
            placeholder="EmpName"
            value={props.data.empName}
            disabled
          />
          </div>
          </div>
          <div className="row">
           <div className="col">
          <input
            type="text"
            className="form-control"
            name="position"
            placeholder="Position"
            value={props.data.empPosition}
            disabled
            style={{marginTop:'8px'}}
          />
          </div>
          <div className="col">
          <input
            type="email"
            className="form-control mt-2"
            name="email"
            placeholder="Email"
            value={props.data.empEmail}
            disabled
           // onChange={handleInputChange}
          />
        </div>
        </div>
        <div className="row">
          <div className='col'>
          <input
            type="text"
            className="form-control"
            name="location"
            placeholder="Location"
            value={props.data.empCountry}
            disabled
            style={{marginTop:'8px'}}

          />
          </div>
        </div>
        <div className="row mb-3">
          <div className='col'style={{marginTop:'8px'}}>
          <select
            className="form-select"
            name="category"
            value={props.data.category}
            onChange={handleInputChange}
          >
            {categoryOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          </div>
          <div className='col'>
          <input
            type="number"
            className="form-control mt-2"
            id='amount'
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            name="usercomment"
            placeholder="User Comments"
            value={formData.usercomment}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept=".pdf,.jpg,.jpeg"
            name="recipt"
            onChange={handleFileChange}
          />
        </div>
        <div className='center'>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>

  );
}

export default ExpenseForm;