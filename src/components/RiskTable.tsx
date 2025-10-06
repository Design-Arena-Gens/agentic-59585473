import React from 'react';
import { Risk } from '@/types';

interface RiskTableProps {
  risks: Risk[];
  onEdit: (risk: Risk) => void;
  onDelete: (id: number) => void;
}

const RiskTable: React.FC<RiskTableProps> = ({ risks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Level</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {risks.map(risk => (
            <tr key={risk.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{risk.name}</td>
              <td className="py-2 px-4 border-b">{risk.category}</td>
              <td className="py-2 px-4 border-b">{risk.level}</td>
              <td className="py-2 px-4 border-b">{risk.status}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => onEdit(risk)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2 transition duration-200">Edit</button>
                <button onClick={() => onDelete(risk.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;
