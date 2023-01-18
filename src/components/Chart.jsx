import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Histogram',
    },
  },
};

export default function Chart({values}) {
  const labels = Object.keys(values);
  const data = labels.map((label) => values[label]);
  const { t } = useTranslation();
  
  const obj = {
    labels,
    datasets: [
      {
        label: t("sum_of_dice"),
        data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        type: 'line',
        label: t("ideal_line"),
        borderColor: 'rgb(255, 99, 132)',
        lineTension: 0.2,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        fill: false,
        data: [462.962962962963, 1388.888888888889, 2777.777777777778, 4629.62962962963, 6944.444444444444, 9722.222222222223, 11574.074074074075, 12500, 12500, 11574.074074074075, 9722.222222222223, 6944.444444444444, 4629.62962962963, 2777.777777777778, 1388.888888888889, 462.962962962963],
      }
    ],
  };
  return <Bar options={options} data={obj} />;
}
