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
import { getDiceSumProbabilities, getMean, getNormDist, getNumberOfRolls, getVariance } from '../utils/utils';

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
  }
};

export default function Chart({ values, numberOfDice }) {
  const labels = Object.keys(values);
  const numberOfRolls = getNumberOfRolls(values)
  const diceSumProbabilitiesObj = getDiceSumProbabilities(numberOfDice);
  const diceSumProbabilitiesCurveArr = Object
    .values(diceSumProbabilitiesObj)
    .map(x => x * numberOfRolls / 6 ** numberOfDice);

  const normDistCurveArr = Object
    .keys(diceSumProbabilitiesObj)
    .map(x => {
      return numberOfRolls * getNormDist(x, getMean(diceSumProbabilitiesObj), Math.sqrt(getVariance(diceSumProbabilitiesObj)))
    })

  const { t } = useTranslation();

  const obj = {
    labels,
    datasets: [
      {
        label: t("sum_of_dice"),
        data: Object.values(values),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        type: 'line',
        label: t("dice_sum_probabilities"),
        borderColor: 'rgb(255, 99, 132)',
        lineTension: 0.2,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        fill: false,
        data: diceSumProbabilitiesCurveArr,
      },
      {
        type: 'line',
        label: t("normal_distribution_curve"),
        borderColor: 'rgb(20, 80, 132)',
        lineTension: 0.2,
        backgroundColor: 'rgba(20, 80, 132, 0.5)',
        borderWidth: 2,
        fill: false,
        data: normDistCurveArr,
      },

    ]
  };
  return <Bar options={options} data={obj} />;
}
