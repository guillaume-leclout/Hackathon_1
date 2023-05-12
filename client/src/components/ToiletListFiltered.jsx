import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import '../pages/dashboard.css';
import './modal.css'
import './toiletlistfiltered.css';

import { countryCodes } from './db';

const ToiletListFiltered = () => {
  const [toiletListFiltered, setToiletListFiltered] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedToilet, setSelectedToilet] = useState(null);

  useEffect(() => {
    const fetchFilteredToilets = async () => {
      const url = 'https://public-bathrooms.p.rapidapi.com/all';
      const params = {
        page: '1',
        per_page: '100',
        offset: '0',
        ada: 'false',
        unisex: 'false',
      };

      const headers = {
        'X-RapidAPI-Key': 'd9f26b51c3mshe9d39ff134ec03ap10558fjsncf782f74f152',
        'X-RapidAPI-Host': 'public-bathrooms.p.rapidapi.com',
      };

      try {
        const response = await axios.get(url, {
          params,
          headers,
        });
        setToiletListFiltered(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredToilets();
  }, []);

  const handleCountryFilter = (country) => {
    setSelectedCountry(country);
  };

  const openModal = (toilet) => {
    setSelectedToilet(toilet);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const uniqueCountries = Array.from(
    new Set(toiletListFiltered.map((toilet) => toilet.country))
  );

  const filteredToiletList = selectedCountry
    ? toiletListFiltered.filter((toilet) => toilet.country === selectedCountry)
    : toiletListFiltered;

  return (
    <div className='filteredList'>
      
      <h2>Choose your country : </h2>
      <div className='countries'>
      {uniqueCountries.map((country) => (
        <div
          className='country'
          key={country}
          onClick={() => handleCountryFilter(country)}
          disabled={selectedCountry === country}
        >
          {countryCodes[country]}
        </div>
      ))}
      </div>
      {selectedCountry && (
        <h2>Filtered Toilet List for {countryCodes[selectedCountry]}:</h2>
      )}
      <div className='firstlistcontainer'>
      {filteredToiletList.map((toilet) => (
        <div className='firstlist ' key={toilet.id} onClick={() => openModal(toilet)}>
          <h4>{toilet.name}</h4>
          <p>{toilet.city}</p>
          <p>{toilet.street}</p>
        </div>

      ))}
      </div>
      {isModalOpen && selectedToilet && (
        <div
          className='modal fade show'
          id='exampleModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
          style={{ display: isModalOpen ? 'block' : 'none' }}
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5'>{selectedToilet.name}</h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedToilet.city}</p>
                <p>{selectedToilet.street}</p>
                <Map {...selectedToilet}/>
                <p>{selectedToilet.directions}</p>
                <p>{selectedToilet.comment}</p>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToiletListFiltered;
