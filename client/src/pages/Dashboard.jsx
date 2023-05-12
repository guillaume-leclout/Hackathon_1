import React from 'react';
import ToiletList from '../components/ToiletList';
import NavBar from '../components/NavBar';
import ToiletListFiltered from '../components/ToiletListFiltered';
import Footer from '../components/Footer';
import ChuckNorris from '../components/ChuckNorris';
import './dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <div className="dashboard">
      <ToiletList />
      <ToiletListFiltered/>
      </div>
      <ChuckNorris/>
      <Footer />
    </div>
    
  );
};

export default Dashboard;
