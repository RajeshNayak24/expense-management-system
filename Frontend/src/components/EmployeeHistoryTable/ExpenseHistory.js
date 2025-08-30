import React, { useState,useEffect } from "react";
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Card,TableSortLabel } from "@mui/material";
import ViewAllPopUp from "./ViewAllPopUp";
import { getExpenseByEmployee } from "../../service/ApiService";
import { Link } from 'react-router-dom';
import DisplayFile from "../DisplayFile";


const viewAllButtonStyle={
    float:'right',
    marginBottom:'12px',
    fontSize:'11px',
    backgroundcolor: '#e7e7e7', 
    justifyContent:'right'
    
}
function ExpenseHistory(){
    const [isViewAllOpen,setIsViewAllOpen]=useState(false);
    


    const [data, setData] = useState([])
    const [run,setRun] = useState(false)

    useEffect(()=>{
        getExpenseByEmployee().then((response) => {
          setData(response.data)
          console.log(response.data)
        }).catch(error =>{
          console.log(error);
      })
      setRun(true)
    },[run])


    const openViewAll=()=>{
        setIsViewAllOpen(true);
    };
    const closeViewAll=()=>{
        setIsViewAllOpen(false);
    };

    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    
    const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    };

    console.log(data);
    
    const sortedData = data.sort((a, b) => {
    if (order === 'asc') {
    return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
    return a[orderBy] > b[orderBy] ? -1 : 1;
    }
    });

    console.log(sortedData);
    

    return(
        <div>
            <div className="row">
           
                    <div className="col" style={{justifyContent:'left'}}>
                        <h4>Past Financial Transactions</h4>
                    </div>

                    <div className="col" style={viewAllButtonStyle}>
                    <Button variant="contained" class="btn btn-light" onClick={openViewAll}style={{fontSize:'14px',fontWeight:'bold',color:'black'}}>
                All Records
            </Button>
                </div>
            
            </div>
            <TableContainer component={Paper} style={{marginBottom:'16px',maxHeight:'400px'}} sx={{ overflow: "auto",
    scrollbarWidth: "none", // Hide the scrollbar for firefox
    '&::-webkit-scrollbar': {
        display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
    },
    '&-ms-overflow-style:': {
        display: 'none', // Hide the scrollbar for IE
    }}}>
               
                <Table stickyHeader aria-label='Expense History Table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
                            <TableSortLabel
                               active={orderBy === 'expense_id'}
                               direction={orderBy === 'expense_id' ? order : 'asc'}
                               onClick={handleSort('expense_id')} >
                                ID
                               </TableSortLabel>
                            </TableCell>
                            <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
                            <TableSortLabel
                               active={orderBy === 'date'}
                               direction={orderBy === 'date' ? order : 'asc'}
                               onClick={handleSort('date')} >
                                 Applied Date
                               </TableSortLabel>
                               
                            </TableCell>
                            <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
                            <TableSortLabel
                               active={orderBy === 'category'}
                               direction={orderBy === 'category' ? order : 'asc'}
                               onClick={handleSort('category')} >
                                Category
                               </TableSortLabel>
                                
                            </TableCell>
                            <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
                            <TableSortLabel
                               active={orderBy === 'amount'}
                               direction={orderBy === 'amount' ? order : 'asc'}
                               onClick={handleSort('amount')} >
                                Amount
                               </TableSortLabel>
                             
                            </TableCell>
                            <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
                            <TableSortLabel
                               active={orderBy === 'status'}
                               direction={orderBy === 'status' ? order : 'asc'}
                               onClick={handleSort('status')} >
                                 Status
                               </TableSortLabel>
                               
                            </TableCell>
                            <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
                                Receipt
                            </TableCell>
                       
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((expense)=>(
                            <TableRow key={expense.expense_id}>
                            <TableCell>{expense.expense_id}</TableCell>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>₹ {expense.amount.toFixed(2)}</TableCell>
                            <TableCell>{expense.status}</TableCell>
                            
                            <TableCell><a href={"http://localhost:8001/"+expense.recipt} target="_blank" rel="noopener noreferrer" download><Button variant='light' color='primary' style={{backgroundColor:'#e7e7e7',color:'black'}}  >
                                View </Button></a></TableCell>
                            
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
            </TableContainer>
            <ViewAllPopUp open={isViewAllOpen} handleClose={closeViewAll}/>
          
        </div>
    );
}

export default ExpenseHistory;


