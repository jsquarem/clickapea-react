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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function TasteChart({ tasteData }) {
  const labels = [];
  const data = [];
  for (const [key, value] of Object.entries(tasteData)) {
    if (key != 'spiciness') {
      labels.push(key);
      data.push(value);
    }
  }
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

  return <Radar data={chartData} options={options} />;
}
