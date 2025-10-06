"use client";

import React, { useState } from 'react';
import RiskTable from './RiskTable';
import RiskForm from './RiskForm';
import Chart from './Chart';
import { Risk } from '@/types';

const initialRisks: Risk[] = [
  { id: 1, name: 'Market Risk', category: 'Financial', level: 'High', status: 'Open' },
  { id: 2, name: 'Credit Risk', category: 'Financial', level: 'Medium', status: 'In Progress' },
  { id: 3, name: 'Operational Risk', category: 'Business', level: 'Low', status: 'Closed' },
  { id: 4, name: 'Liquidity Risk', category: 'Financial', level: 'High', status: 'Open' },
];

const Dashboard = () => {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const handleSaveRisk = (risk: Risk | Omit<Risk, 'id'>) => {
    if ('id' in risk) {
      // Update risk
      setRisks(risks.map(r => r.id === risk.id ? risk : r));
    } else {
      // Add new risk
      setRisks([...risks, { ...risk, id: risks.length + 1 }]);
    }
    setSelectedRisk(null);
  };

  const handleDeleteRisk = (riskId: number) => {
    setRisks(risks.filter(risk => risk.id !== riskId));
  };

  const handleSelectRisk = (risk: Risk) => {
    setSelectedRisk(risk);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">Risk Management Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">{selectedRisk ? 'Edit Risk' : 'Add New Risk'}</h2>
          <RiskForm
            onSubmit={handleSaveRisk}
            risk={selectedRisk}
            onCancel={() => setSelectedRisk(null)}
          />
        </div>
        <div className="lg:col-span-2 grid grid-rows-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">Risk Level Overview</h2>
            <Chart risks={risks} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
             <h2 className="text-2xl font-semibold mb-4 text-gray-600">All Risks</h2>
            <RiskTable
              risks={risks}
              onEdit={handleSelectRisk}
              onDelete={handleDeleteRisk}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;