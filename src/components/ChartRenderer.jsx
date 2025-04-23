import React from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ChartRenderer({ type, data }) {
  const chartStyle = {
    height: "200px",
    width: "100%",
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  const chartProps = {
    data,
    options,
  };

  return (
    <div style={chartStyle}>
      {type === "Bar" && <Bar {...chartProps} />}
      {type === "Pie" && <Pie {...chartProps} />}
      {type === "Line" && <Line {...chartProps} />}
      {type === "Doughnut" && <Doughnut {...chartProps} />}
    </div>
  );
}
