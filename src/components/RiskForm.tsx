"use client";

import React, { useState, useEffect } from 'react';
import { Risk } from '@/types';

interface RiskFormProps {
  onSubmit: (risk: Risk | Omit<Risk, 'id'>) => void;
  risk: Risk | null;
  onCancel: () => void;
}

type FormData = Omit<Risk, 'id'> | Risk;

const RiskForm: React.FC<RiskFormProps> = ({ onSubmit, risk, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'Financial',
    level: 'Low',
    status: 'Open',
  });

  useEffect(() => {
    if (risk) {
      setFormData(risk);
    } else {
      setFormData({
        name: '',
        category: 'Financial',
        level: 'Low',
        status: 'Open',
      });
    }
  }, [risk]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', category: 'Financial', level: 'Low', status: 'Open' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Risk Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Financial</option>
          <option>Business</option>
          <option>Operational</option>
          <option>Compliance</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Risk Level</label>
        <select name="level" value={formData.level} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
      </div>
      <div className="flex justify-end">
        {risk && <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2 transition duration-200">Cancel</button>}
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200">{risk ? 'Update' : 'Add'} Risk</button>
      </div>
    </form>
  );
};

export default RiskForm;