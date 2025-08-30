

import { PieChart, Pie, Cell,ResponsiveContainer, Legend,Tooltip } from "recharts";
import React, { useState, useCallback, useEffect } from "react";
import { bgcolor } from "@mui/system";
import { lineChart, pieChart } from "../../service/ApiService";
import { Card } from "@mui/material";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#bb8769","#DF60E2"];

export default function Charttest() {

  const [data, setData] = useState([])
  const [run,setRun] = useState(false)

  useEffect(()=>{
    
      pieChart().then((response) => {
        setData(response.data)
        console.log(data)
      }).catch(error =>{
        console.log(error);
    })
    setRun(true)
  },[run])

  
  
  return (
    <Card>
    <ResponsiveContainer width="90%" aspect={0.7} >
    <PieChart width={100} height={300}>
    <Pie
        data={data}
        innerRadius={80}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={3}
        dataKey="amount"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} name={entry.catogery}  fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend/>
      <Tooltip />
    </PieChart>
    </ResponsiveContainer>
    </Card>
    
  );
}