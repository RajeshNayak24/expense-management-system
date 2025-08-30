
import ManagerPieChart from "../Charts/ManagerPieChart";
import ExpenseHistoryCard from "./ExpenseHistoryCard";
import { useState } from "react";

const ManagerHome = () => {
    return (
        <div className="container">
            <div >
                <div className="row m-1">
                    <div class="p-2 col-6 ">
                        <ExpenseHistoryCard />
                    </div>
                    <div class="p-2 col-6 ">Flex item 2 

                         <ManagerPieChart/> 
                        
                    </div>
                </div>
            </div>   
        </div>
    );
}

export default ManagerHome;