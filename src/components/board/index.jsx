import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import playContext from '../../context/playContext';
import piece from '../../services/piece';
import { House, LayoutGrid } from './styles';

function Board() {
  const { handleLocalPiece } = useContext(playContext);
  const table = [
    't', 'c', 'b', 'q', 'k', 'b', 'c', 't',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'T', 'C', 'B', 'K', 'Q', 'B', 'C', 'T',
  ];

  const isCapsLock = (text) => text.toUpperCase() === text;

  const handleClick = (id) => {
    handleLocalPiece(id);
  };

  let isWhite = false;

  return (
    <LayoutGrid>
      {
      table.map((house, index) => {
        isWhite = index % 8 === 0 ? isWhite : !isWhite;
        return (
          <House
            key={uuidv4()}
            isWhite={!isWhite}
            onClick={handleClick}
            isPieceWhite={isCapsLock(house)}
          >
            {piece[house]}
          </House>
        );
      })
}
    </LayoutGrid>
  );
}

export default Board;
