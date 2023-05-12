import React from 'react';
import ToiletList from '../components/ToiletList';
import ToiletListFiltered from '../components/ToiletListFiltered';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ToiletList />
      <ToiletListFiltered />
    </div>
  );
};

export default Dashboard;
