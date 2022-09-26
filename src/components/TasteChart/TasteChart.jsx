import React, { useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useEffect } from 'react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function TasteChart({ tasteData }) {
  // const [tasteState, setTasteState] = useState(null);
  //const [chartState, setChartState] = useState(null);
  const labels = [];
  const data = [];
  // console.log(chartState, '<-chartState');
  // useEffect(() => {
  //   setTasteState(tasteData);
  // }, []);
  // console.log(chartState, '<-chartState');

  // useEffect(() => {
  //   if (tasteState) {
  console.log(tasteData, '<-tasteData');
  for (const [key, value] of Object.entries(tasteData)) {
    if (key != 'spiciness') {
      labels.push(key);
      data.push(value);
    }
  }
  console.log(data, '<-data');
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: 'rgba(13, 110, 253, 0.5)',
        borderColor: 'rgba(13, 110, 253, 1)',
      },
    ],
  };
  const options = {
    plugins: {
      responsive: true,
      legend: {
        display: false,
      },
    },
  };
  //setChartState({ data: chartData, options: options });
  //   }
  // }, [tasteState]);

  return <Radar data={chartData} options={options} />;
}
