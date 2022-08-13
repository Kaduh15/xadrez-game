import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlayContext from './playContext';

function PlayProvider({ children }) {
  const [localPiece, setLocalPiece] = useState('');
  const [selectedPiece, setSelectedPiece] = useState('');

  const handleLocalPiece = ((local) => setLocalPiece(local));
  const handleSelectedPiece = ((local, force = false) => {
    if (local.trim() || force) {
      console.log('aqui');
      setSelectedPiece(local);
    }
  });

  const moveReset = () => {
    handleSelectedPiece('', true);
    handleLocalPiece('', true);
  };

  const state = {
    handleLocalPiece,
    handleSelectedPiece,
    moveReset,
    selectedPiece,
    localPiece,
  };

  return (
    <PlayContext.Provider value={{ ...state }}>
      {children}
    </PlayContext.Provider>
  );
}

PlayProvider.propTypes = { children: PropTypes.element.isRequired };

export default PlayProvider;
