import { Dialog, DialogContent, DialogTitle, Button, IconButton,Slide } from "@mui/material";
import React,{useState} from "react";
import Form from "./ExpenseForm";
import CloseIcon from '@mui/icons-material/Close';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

function PopUp(props){
    const [open, setOpen]=useState(false);

    const handleOpen=()=>{
        setOpen(true);
    };

    const handleClose=()=>{
        setOpen(false);
    };


    return(
        <div>
            <Button sx={{color:'#000000',bgcolor:'#62ea96',fontWeight:'bold',"&:hover" : {color:"red",bgcolor:'white'} }} onClick={handleOpen} startIcon={<AddBoxRoundedIcon/>}>Add Expense</Button>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
              
                <DialogTitle style={{backgroundColor:"#121c4e",color:'white'}}>
                Expense Apply Form
                
                <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color:'white',
                }}>
                    <CloseIcon />
                </IconButton>
                </DialogTitle>
                <DialogContent style={{ backgroundColor : '#f5eadb'}}>
               
                <div className="container" >

                    <Form data ={props.data} handleClose={handleClose}/>
                
                </div>
                </DialogContent>

            </Dialog>
        </div>
    );

}

export default PopUp;