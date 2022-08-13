import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import playContext from '../../context/playContext';
import piece from '../../services/piece';
import { House, LayoutGrid } from './styles';

const INITIAL_TABLE = [
  't1', 'c1', 'b1', 'q', 'k', 'b2', 'c2', 't2',
  'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8',
  'T1', 'C1', 'B1', 'K', 'Q', 'B2', 'C2', 'T2',
];

function Board() {
  const {
    handleLocalPiece,
    handleSelectedPiece,
    selectedPiece,
    localPiece,
  } = useContext(playContext);
  const [table, setTable] = useState(INITIAL_TABLE);

  const isCapsLock = (text) => text.toUpperCase() === text;

  function moveArrayElement(arr, from, to) {
    const newArray = [...arr];
    const el = newArray[from];
    const el2 = newArray[to];
    newArray.splice(from, 1);
    newArray.splice(from, 0, el2);
    newArray.splice(to, 1);
    newArray.splice(to, 0, el);

    return newArray;
  }

  const handleClick = (id, _piece) => {
    if (id !== localPiece && selectedPiece.trim()) {
      console.log(id);
      const newTable = moveArrayElement(table, +(localPiece), +(id));
      setTable(newTable);
      handleSelectedPiece('', true);
      handleLocalPiece('', true);
    } else if (selectedPiece === _piece) {
      handleSelectedPiece('', true);
      handleLocalPiece('', true);
    } else {
      handleLocalPiece(id);
      handleSelectedPiece(_piece);
    }
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
            onClick={() => handleClick(index, house)}
            isPieceWhite={isCapsLock(house)}
            selected={selectedPiece === house && localPiece === index}
          >
            {piece[house[0]]}
          </House>
        );
      })
}
    </LayoutGrid>
  );
}

export default Board;
