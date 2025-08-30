import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Slide,
  Card,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EmployeeDetails from "./EmployeeDetails";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EmployeeDetailsPopUp(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {" "}
      <Button
        sx={{
          color: "#000000",
          bgcolor: "#62ea96",
          fontWeight: "bold",
          "&:hover": { color: "red", bgcolor: "white" },
        }}
        onClick={handleOpen}
        startIcon={<AddBoxRoundedIcon />}
      >
        View
      </Button>
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
            <EmployeeDetails
              empdata={props.empdata}
              handleClose={handleClose}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmployeeDetailsPopUp;
