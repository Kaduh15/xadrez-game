import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlayContext from './playContext';

function PlayProvider({ children }) {
  const [localPiece, setLocalPiece] = useState('');

  const handleLocalPiece = ((local) => setLocalPiece(local));

  const state = {
    handleLocalPiece,
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
