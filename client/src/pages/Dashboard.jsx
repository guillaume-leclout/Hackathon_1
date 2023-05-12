import React from 'react';
import ToiletList from '../components/ToiletList';
import ToiletListFiltered from '../components/ToiletListFiltered';
import ChuckNorris from '../components/ChuckNorris';
import './dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <ToiletList />
      <ToiletListFiltered/>
      <ChuckNorris/>
    </div>
  );
};

export default Dashboard;
