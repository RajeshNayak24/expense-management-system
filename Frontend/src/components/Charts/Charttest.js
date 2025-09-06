import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import React, { useState, useEffect } from "react";
import { pieChart } from "../../service/ApiService";
import { Card } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#bb8769", "#DF60E2"];

export default function Charttest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    pieChart()
      .then((response) => {
        console.log("📊 Pie chart data:", response.data);
        setData(response.data || []);
      })
      .catch((error) => {
        console.error("❌ Error fetching chart data:", error);
      });
  }, []);

  return (
    <Card>
      <ResponsiveContainer width="90%" aspect={0.7}>
        <PieChart>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient id={`grad-${index}`} key={index} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor="black" stopOpacity={0.2} />
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={data}
            innerRadius={70}      
            outerRadius={140}     
            paddingAngle={4}
            dataKey="total"
            nameKey="_id"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#grad-${index})`} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}