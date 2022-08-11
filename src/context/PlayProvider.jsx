import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlayContext from './playContext';

function PlayProvider({ children }) {
  const [localPiece, setLocalPiece] = useState('');
  const [selectedPiece, setSelectedPiece] = useState('');

  const handleLocalPiece = ((local) => setLocalPiece(local));
  const handleSelectedPiece = ((local, force = false) => {
    console.log(local.trim() || force);
    if (local.trim() || force) {
      console.log('aqui');
      setSelectedPiece(local);
    }
  });

  const state = {
    handleLocalPiece,
    handleSelectedPiece,
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
