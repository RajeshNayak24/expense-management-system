import { Dialog, DialogContent, DialogTitle, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button, DialogActions,TableSortLabel} from "@mui/material";
import React,{useEffect, useState} from "react";
import { getExpenseByEmployee } from "../../service/ApiService";

const dialogStyle={
    margin:0,
    maxHeight:'calc(100%-200px)',
    backgroundColor : '#f5eadb',
   
}

const dialogContentStyle={
    paddingTop:0,
    paddingBottom:0,
    
}





const ViewAllPopUp=({open,handleClose})=>{

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
            <Dialog open={open} onClose={handleClose} PaperProps={{style:dialogStyle}} maxWidth='lg' >
                <DialogTitle>All Expenses</DialogTitle>
                <DialogContent style={dialogContentStyle} sx={{ overflow: "auto",
    scrollbarWidth: "none", // Hide the scrollbar for firefox
    '&::-webkit-scrollbar': {
        display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
    },
    '&-ms-overflow-style:': {
        display: 'none', // Hide the scrollbar for IE
    }}}>
                <TableContainer component={Paper} >
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
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ViewAllPopUp;