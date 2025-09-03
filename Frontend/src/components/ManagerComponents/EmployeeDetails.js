import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { singleexpenseDetails } from "../../service/ApiService";

function EmployeeDetails({ empId, expenseId, handleClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (empId && expenseId) {
      setLoading(true);
      singleexpenseDetails(empId, expenseId)
        .then((res) => {
          setDetails(res.data || null);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching employee details:", err);
          setLoading(false);
        });
    }
  }, [empId, expenseId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!details) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        No details found for this employee/expense.
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} style={{ fontWeight: "bold", fontSize: "18px" }}>
              Employee Expense Details
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Employee ID</TableCell>
            <TableCell>{empId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Expense ID</TableCell>
            <TableCell>{expenseId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell>{details.empName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Position</TableCell>
            <TableCell>{details.empPosition}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
            <TableCell>{details.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
            <TableCell>{details.amount?.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell>{details.status}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeDetails;