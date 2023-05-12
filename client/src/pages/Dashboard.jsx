import React from 'react';
import ToiletList from '../components/ToiletList';
import NavBar from '../components/NavBar';
import ToiletListFiltered from '../components/ToiletListFiltered';
import Footer from '../components/Footer';
import './dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <div className="dashboard">
      <ToiletList />
      <ToiletListFiltered/>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
