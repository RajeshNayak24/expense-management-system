

import { PieChart, Pie, Cell, Legend, ResponsiveContainer,Tooltip } from "recharts";
import React, { useState, useCallback, useEffect } from "react";
import { bgcolor } from "@mui/system";
import { lineChart, pieChart, pieChartManager } from "../../service/ApiService";
import { Card } from "@mui/material";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ManagerPieChart() {

  const [data, setData] = useState([])

  useEffect(()=>{
    
      pieChartManager().then((response) => {
        setData(response.data)
        console.log(data)
      }).catch(error =>{
        console.log(error);
    })
    
  },[])


  
  return (
    
   <Card>
    <ResponsiveContainer width="100%" aspect={1}>
    <PieChart width={300} height={300}>
    
      <Pie
        data={data}
        innerRadius={80}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="amountPie"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} name={entry.statusPie}  fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend/>
      <Tooltip/>
    </PieChart>
    </ResponsiveContainer>
    </Card>
    
  );
}