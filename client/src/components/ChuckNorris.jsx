import React, { useState, useEffect } from 'react';
import '../components/chucknorris.css';
import axios from 'axios';

const ChuckNorris = () => {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await axios.get(
          'https://api.chucknorris.io/jokes/random'
        );
        setJoke(response.data.value);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJoke();
    const interval = setInterval(fetchJoke, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="chuck-container">
      <div className="jesaispas">
        <h4 className="chuck-title">Here's a shit joke !! </h4>
        <div className="chuck-norris-banner scrolling-text">
          <span>{joke}</span>
        </div>
      </div>
    </div>
  );
};

export default ChuckNorris;
