import React, {useState, useEffect} from "react";
import ExpenseHistory from './EmployeeHistoryTable/ExpenseHistory';
import MyLineChart from "./Charts/MyLineChart";
import Charttest from "./Charts/Charttest";
import ExpenseForm from "./AddExpense/ExpenseForm";
import EmployeeDetails from "./ManagerComponents/EmployeeDetails";

export default function EmployeeDashboard() {
    const [employee, setEmployee] = useState(null);

  useEffect(() => {
    EmployeeDetails().then((res) => {
      setEmployee(res.data); // assuming res.data has { id, name, ... }
    });
  }, []);

  if (!employee) return <p>Loading...</p>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Employee Dashboard</h2>

      {/* Add Expense */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add New Expense</h3>
        <ExpenseForm />
      </div>

      {/* Expense History */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Your Expense History</h3>
        <ExpenseHistory />
      </div>

      {/* Charts */}
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