
import ExpenseHistoryCard from "./EmployeeHistoryTable/ExpenseHistoryCard";
import Charttest from "./Charts/Charttest";
import MyLineChart from "./Charts/MyLineChart";
import CategoryTable from "./EmployeeHistoryTable/CategoryTable";
import { Card } from "@mui/material";

const Home = () => {
    return (
        <div className="Home" style={{backgroundColor:'#f5eadb'}}>
            <div className="container-fluid">
                <div className="row m-2">
                    <div class="p-2  col-sm-12 col-lg-8 col-md-8 min-vh-50">
                        <MyLineChart/>
                    </div>
                    <div class="p-2 col-sm-12 col-lg-4 col-md-4 min-vh-50">
                        <CategoryTable/>
                    </div>
                </div>
                <div className="row  m-2 ">
                <div class="p-2 col-sm-12 col-lg-8 col-md-8 min-vh-50">
                    <ExpenseHistoryCard/>
                </div>
                <div class="p-2 col-sm-12 col-lg-4 col-md-4 min-vh-50">
                    <Charttest/> 
                </div>
                </div>
            </div>
          
        </div>

    );
}

export default Home;