import { Dialog, DialogContent, DialogTitle, Button, IconButton,Slide, Card } from "@mui/material";
import React,{useState} from "react";
import FormCard from "./ExpenseForm";
import Form from "./ExpenseForm";
import CloseIcon from '@mui/icons-material/Close';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import backimg from '../../Images/topAdp.PNG'
import bk from '../../Images/bottomAdp.PNG';



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
                <img src="https://th.bing.com/th?id=OIP.mvzumO18d4Syeg31wW8yRQHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.7&pid=3.1&rm=2" style={{width:"45px",marginTop:"0px",paddingRight:'3px',marginRight:'4px'}}></img>
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