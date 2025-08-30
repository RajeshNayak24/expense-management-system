import { Card, CardContent } from "@mui/material";
import React from "react";
import ExpenseHistory from "./ExpenseHistory";

function FormCard(){
    return(
        <div>
        <Card style={{width:'100%',maxHeight:'600px'}}>
           
               <ExpenseHistory/>
            
        </Card>
        </div>
    );
};

export default FormCard;