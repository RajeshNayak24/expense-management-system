import React, { useEffect, useState } from "react";
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Card,TableSortLabel} from "@mui/material";
import ViewAllPopUp from "./ViewAllPopUp";
import { CategoryForLineChart } from "../../service/ApiService";


const viewAllButtonStyle={
    float:'right',
    marginBottom:'12px',
    fontSize:'11px',
    backgroundcolor: '#e7e7e7', 
}
function CategoryTable(){
    const [isViewAllOpen,setIsViewAllOpen]=useState(false);
    const [data,setData]=useState([]);
    const [run,setRun] = useState(false)
    useEffect(()=>{
    
        CategoryForLineChart().then((response) => {
          setData(response.data)
          console.log(data)
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
           
            <TableContainer component={Paper} style={{marginBottom:'16px',overflowY:'auto',maxHeight:'300px'}} sx={{ overflow: "auto",
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
                               active={orderBy === 'category'}
                               direction={orderBy === 'category' ? order : 'asc'}
                               onClick={handleSort('category')} >
                                Category
                               </TableSortLabel>


                               </TableCell>
                            <TableCell style={{fontSize:'18px',fontWeight:'bold',backgroundColor:'#cfd7e8'}}>
                            <TableSortLabel
                               active={orderBy === 'empCatogeryAmount'}
                               direction={orderBy === 'empCatogeryAmount' ? order : 'asc'}
                               onClick={handleSort('empCatogeryAmount')} >
                              <sup>Amount</sup>/<sub>YEAR</sub>
                               </TableSortLabel>
                            </TableCell>
                         
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((expense)=>(
                            <TableRow key={expense.expenseId}>
                           
                            <TableCell>{expense.category}</TableCell>
                           <TableCell>₹ {expense.empCatogeryAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <ViewAllPopUp open={isViewAllOpen} data={data}handleClose={closeViewAll}/> */}
            
        </div>
    );
}


export default CategoryTable;