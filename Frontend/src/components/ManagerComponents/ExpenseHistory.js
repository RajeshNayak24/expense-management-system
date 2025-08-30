import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import ViewAllPopUp from "./ViewAllPopUp";
import EmployeeDetailsPopUp from "./EmployeeDetailsPopUp";
import { getExpenseByManager } from "../../service/ApiService";

const viewAllButtonStyle = {
  float: "right",
  marginBottom: "12px",
  fontSize: "11px",
  backgroundColor: "#e7e7e7",
};

function ExpenseHistory() {
  // --- State Management ---
  const [isBulkApprovalOpen, setIsBulkApprovalOpen] = useState(false);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const [data, setData] = useState([]);

  const [orderBy, setOrderBy] = useState("expenseId");
  const [order, setOrder] = useState("asc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  // --- Fetch Data ---
  useEffect(() => {
    getExpenseByManager()
      .then((response) => {
        setData(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  // --- Sorting ---
  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!orderBy) return 0;
      const aVal = a[orderBy] ?? "";
      const bVal = b[orderBy] ?? "";
      if (order === "asc") return aVal < bVal ? -1 : 1;
      return aVal > bVal ? -1 : 1;
    });
  }, [data, orderBy, order]);

  // --- Pagination ---
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  // --- Handlers ---
  const openBulkApproval = () => setIsBulkApprovalOpen(true);
  const closeBulkApproval = () => setIsBulkApprovalOpen(false);

  const openEmployeeDetails = (empId, expenseId) => {
    setSelectedEmpId(empId);
    setSelectedExpenseId(expenseId);
    setIsViewAllOpen(true);
  };
  const closeEmployeeDetails = () => setIsViewAllOpen(false);

  return (
    <div>
      {/* Header Row */}
      <div className="row">
        <div className="col">
          <h4>Pending Approvals</h4>
        </div>
        <div className="col" style={viewAllButtonStyle}>
          <Button
            variant="contained"
            onClick={openBulkApproval}
            style={{ fontSize: "14px", fontWeight: "bold", color: "black" }}
          >
            Bulk Approval
          </Button>
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { key: "expenseId", label: "ID" },
                { key: "empName", label: "Name" },
                { key: "empPosition", label: "Position" },
                { key: "category", label: "Category" },
                { key: "amount", label: "Amount" },
              ].map((col) => (
                <TableCell
                  key={col.key}
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    backgroundColor: "#cfd7e8",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === col.key}
                    direction={orderBy === col.key ? order : "asc"}
                    onClick={handleSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: "#cfd7e8",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: "#cfd7e8",
                }}
              >
                Receipt
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.expenseId}>
                <TableCell>{row.expenseId}</TableCell>
                <TableCell>{row.empName}</TableCell>
                <TableCell>{row.empPosition}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.amount?.toFixed(2)}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      openEmployeeDetails(row.empId, row.expenseId)
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[4, 8, 12]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Popups */}
      <ViewAllPopUp open={isBulkApprovalOpen} handleClose={closeBulkApproval} />
      <EmployeeDetailsPopUp
        open={isViewAllOpen}
        handleClose={closeEmployeeDetails}
        empId={selectedEmpId}
        expenseId={selectedExpenseId}
      />
    </div>
  );
}

export default ExpenseHistory;
