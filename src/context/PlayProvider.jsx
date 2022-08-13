import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlayContext from './playContext';

function PlayProvider({ children }) {
  const [localPiece, setLocalPiece] = useState('');
  const [selectedPiece, setSelectedPiece] = useState('');

  const handleLocalPiece = ((local, force = false) => {
    if (local || force) {
      setLocalPiece(local);
    }
  });

  const handleSelectedPiece = ((piece, force = false) => {
    if (piece.trim() || force) {
      setSelectedPiece(piece);
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
