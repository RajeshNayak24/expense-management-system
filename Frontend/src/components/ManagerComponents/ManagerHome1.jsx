
import ManagerPieChart from "../Charts/ManagerPieChart";
import ExpenseHistoryCard from "./ExpenseHistoryCard";
import { useState } from "react";

const centred={
    display:"flex", 
    justifyContent:'center',
    alignItems:'center',
    height:'85vh'
    
}
const ManagerHome1 = () => {
    const [show,setShow] = useState(false);
    return (
        <div style={{backgroundColor:'#f5eadb'}}>
            <div className="container-flex">
                <div className="row m-1"style={centred}>
                    <div class="p-2 col-8 ">
                    <div className="row">
                    </div>
                        <ExpenseHistoryCard setShow = {setShow} show = {show}/>
                    </div>
                    <div class="p-2 col-4 ">

                         <ManagerPieChart/> 
                        
                    </div>
                </div>
            </div>   
        </div>
    );
}

export default ManagerHome1;