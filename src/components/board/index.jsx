import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import playContext from '../../context/playContext';
import piece from '../../services/piece';
import { House, LayoutGrid } from './styles';

const INITIAL_TABLE = [
  ' ', 'w', ' ', 'w', ' ', 'w', ' ', 'w',
  'w', ' ', 'w', ' ', 'w', ' ', 'w', ' ',
  ' ', 'w', ' ', 'w', ' ', 'w', ' ', 'w',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  'b', ' ', 'b', ' ', 'b', ' ', 'b', ' ',
  ' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b',
  'b', ' ', 'b', ' ', 'b', ' ', 'b', ' ',
];

function Board() {
  const {
    handleLocalPiece,
    handleSelectedPiece,
    moveReset,
    selectedPiece,
    localPiece,
  } = useContext(playContext);
  const [table, setTable] = useState(INITIAL_TABLE);
  const [turn, setTurn] = useState('w');

  const toggleTrun = () => turn === 'w' ? setTurn('b') : setTurn('w');

  const possibleMoves = [localPiece + 7, localPiece + 9, localPiece - 7, localPiece - 9];

  const isCapsLock = (text) => text.toUpperCase() === text;

  const moveArrayElement = (arr, from, to) => {
    const newArray = [...arr];
    const el = newArray[from];
    const el2 = newArray[to];
    newArray.splice(from, 1);
    newArray.splice(from, 0, el2);
    newArray.splice(to, 1);
    newArray.splice(to, 0, el);

    return newArray;
  };

  const move = (id, _piece) => {
    const newTable = moveArrayElement(table, +(localPiece), +(id));
    if (possibleMoves.includes(id) && !_piece.trim()) {
      setTable(newTable);
      toggleTrun();
    }
  };

  const handleClick = (id, _piece) => {
    if (id !== localPiece && selectedPiece.trim()) {
      move(id, _piece);
      moveReset();
    } else if (selectedPiece === _piece) {
      moveReset();
    } else if (turn === _piece) {
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
            {piece[house]}
          </House>
        );
      })
}
    </LayoutGrid>
  );
}

export default Board;
