import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import EmployeeDetails from "./EmployeeDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EmployeeDetailsPopUp({ open, handleClose, empId, expenseId }) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle style={{ backgroundColor: "#121c4e", color: "white" }}>
        Employee Details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ backgroundColor: "#f5eadb" }}>
        <div className="container">
          <EmployeeDetails empId={empId} expenseId={expenseId} handleClose={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeDetailsPopUp;