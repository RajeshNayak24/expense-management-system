import {
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  DialogActions,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllExpenseByManager } from "../../service/ApiService";

const dialogStyle = {
  margin: 0,
  maxHeight: "calc(100%-200px)",
};

const dialogContentStyle = {
  paddingTop: 0,
  paddingBottom: 0,
};

const ViewAllPopUp = ({ open, handleClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllExpenseByManager()
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  console.log(data);

  const sortedData = data.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  console.log(sortedData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8); // You can set the number of rows per page as per your preference

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to the first page when changing rows per page
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: dialogStyle }}
      >
        <DialogTitle>All Expenses</DialogTitle>
        <DialogContent style={dialogContentStyle}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      backgroundColor: "#cfd7e8",
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "expenseId"}
                      direction={orderBy === "expenseId" ? order : "asc"}
                      onClick={handleSort("expenseId")}
                    >
                      ID
                    </TableSortLabel>
                  </TableCell>

                  {/* <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
    <TableSortLabel
    active={orderBy === 'empName'}
    direction={orderBy === 'empName' ? order : 'asc'}
    onClick={handleSort('empName')}
    >
    Name
    </TableSortLabel>
    </TableCell>


    <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
    <TableSortLabel
    active={orderBy === 'empPosition'}
    direction={orderBy === 'empPosition' ? order : 'asc'}
    onClick={handleSort('empPosition')}
    >
    Position
    </TableSortLabel>
    </TableCell> */}

                  <TableCell
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      backgroundColor: "#cfd7e8",
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "category"}
                      direction={orderBy === "category" ? order : "asc"}
                      onClick={handleSort("category")}
                    >
                      Category
                    </TableSortLabel>
                  </TableCell>

                  <TableCell
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      backgroundColor: "#cfd7e8",
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "amount"}
                      direction={orderBy === "amount" ? order : "asc"}
                      onClick={handleSort("amount")}
                    >
                      Amount
                    </TableSortLabel>
                  </TableCell>

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
                    Recipt
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow key={row.expense_id}>
                    <TableCell>{row.expenseId}</TableCell>
                    {/* <TableCell>{row.empName}</TableCell>
    <TableCell>{row.empPosition}</TableCell> */}
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.amount.toFixed(2)}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewAllPopUp;
