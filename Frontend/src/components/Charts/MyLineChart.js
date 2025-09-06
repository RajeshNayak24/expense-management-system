import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { lineChart } from "../../service/ApiService";

const CustomizedDot = (props) => {
  const { cx, cy, value } = props;

  if (value > 5000) {
    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 1024 1024">
        <path d="M517.12 53.248q95.232 0 179.2 ...z" />
      </svg>
    );
  }

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
      <path d="M512 1009.984c-274.912 0-497.76..." />
    </svg>
  );
};

export default function MyLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    lineChart()
      .then((response) => {
        console.log("📊 Line chart data:", response.data);
        setData(response.data || []);
      })
      .catch((error) => {
        console.error("❌ Error fetching line chart:", error);
      });
  }, []);

  return (
    <div className="min-vh-50">
      <Card style={{ padding: "1rem" }}>
        <h4 style={{ marginBottom: "1rem" }}>Annual Expenditure Trends</h4>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={data}>
            
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

           
            <Line
              type="monotone"
              dataKey="total"   
              stroke="#8884d8"
              strokeWidth={3}
              dot={<CustomizedDot />}
              activeDot={{ r: 8 }}
              fill="url(#colorTotal)"  
            />

            <ReferenceLine y={2500} label="Max Limit" stroke="yellow" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}