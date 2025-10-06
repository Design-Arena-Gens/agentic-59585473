"use client";

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Risk } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  risks: Risk[];
}

const Chart: React.FC<ChartProps> = ({ risks }) => {
  const riskLevels = risks.reduce((acc, risk) => {
    acc[risk.level] = (acc[risk.level] || 0) + 1;
    return acc;
  }, {} as Record<'High' | 'Medium' | 'Low', number>);

  const data = {
    labels: Object.keys(riskLevels),
    datasets: [
      {
        label: '# of Risks',
        data: Object.values(riskLevels),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Chart;
