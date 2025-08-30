import { Card, CardContent } from "@mui/material";
import React from "react";
import ExpenseHistory from "./ExpenseHistory";

function FormCard(){
    return(
        <div style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
        <Card style={{width:'100%'}}>
            <CardContent>
                <ExpenseHistory />
            </CardContent>
        </Card>
        </div>
    );
};

export default FormCard;