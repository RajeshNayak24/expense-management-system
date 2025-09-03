import React, { useState,useEffect } from "react";
import { addExpense, getExpenseByEmployee } from "../../service/ApiService";


const categoryOptions = [
  "--CATEGORY--",
  "Internet",
  "Travel",
  "Team Lunch/Dinner",
  "Sports Events",
  "Cultural Events",
  "Award Ceremonies",
];

function ExpenseForm({ data, empId, handleClose }) {
  console.log("✅ Got data:", data);
 console.log("got employee id", data.id)
 console.log("got manager id", data.mgnId)


  const initialFormData = {
    empId: data?.id || "",
    managerId: data?.mgnId || "", 
    category: "",
    amount: "",
    recipt: null,
    usercomment: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
  console.log("🔄 data changed:", data);
}, [data]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, recipt: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting expense:", formData);

      const payload = new FormData();
      payload.append("empId", formData.empId);
      payload.append("managerId", formData.managerId);
      payload.append("category", formData.category);
      payload.append("amount", formData.amount);
      payload.append("usercomment", formData.usercomment || "");
      if (formData.recipt) {
        payload.append("file", formData.recipt);
      }

   
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      await addExpense(payload);

      if (handleClose) handleClose();
      const res = await getExpenseByEmployee();
      console.log("Updated employee expenses:", res.data);
    } catch (err) {
      console.error("Error submitting expense:", err);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label>Employee ID</label>
            <input
              type="text"
              className="form-control"
              name="empId"
              placeholder="EmpID"
              value={formData.empId}
              disabled
            />
          </div>
          <div className="col">
            <label>Employee Name</label>
            <input
              type="text"
              className="form-control"
              name="empName"
              placeholder="EmpName"
              value={data?.empName || ""}
              disabled
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="position"
              placeholder="Position"
              value={data?.empPosition || ""}
              disabled
              style={{ marginTop: "8px" }}
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control mt-2"
              name="email"
              placeholder="Email"
              value={data?.empEmail || ""}
              disabled
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Location"
              value={data?.empCountry || ""}
              disabled
              style={{ marginTop: "8px" }}
            />
          </div>
        </div>


        <div className="row mb-3">
          <div className="col" style={{ marginTop: "8px" }}>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control mt-2"
              id="amount"
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
            accept=".pdf,.jpg,.jpeg,.png"
            name="recipt"
            onChange={handleFileChange}
          />
        </div>
        <div className="center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
