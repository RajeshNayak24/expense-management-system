import React, {useState, useEffect} from "react";
import ExpenseHistory from './EmployeeHistoryTable/ExpenseHistory';
import MyLineChart from "./Charts/MyLineChart";
import Charttest from "./Charts/Charttest";
import { EmployeeDetails as fetchEmployeeDetails } from "../service/ApiService";

export default function EmployeeDashboard() {
    const [employee, setEmployee] = useState(null);

 useEffect(() => {
  fetchEmployeeDetails().then((res) => {
    setEmployee(res.data);
  });
}, []);

  if (!employee) return <p>Loading...</p>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Employee Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Your Expense History</h3>
        <ExpenseHistory />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Monthly Trend</h3>
          <MyLineChart />
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
          <Charttest />
        </div>
      </div>
    </div>
  );
}