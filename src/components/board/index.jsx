import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const [turn, setTurn] = useState('b');
  const possibleMoves = turn === 'w' ? [localPiece + 7, localPiece + 9] : [localPiece - 7, localPiece - 9];

  console.log(possibleMoves);

  const toggleTrun = () => (turn === 'w' ? setTurn('b') : setTurn('w'));

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
  const mount = useRef(null);

  useEffect(() => {
    if (mount.current) {
      if (selectedPiece.trim()) {
        const pieceKill = possibleMoves
          .filter((id) => table[id] !== turn && table[id].trim());
        const possibleMovesKill = pieceKill
          .map((id) => {
            const difference = id - localPiece;
            switch (difference) {
              case 7:
                return id + 7;
              case -7:
                return id - 7;
              case 9:
                return id + 9;
              case -9:
                return id - 9;
              default:
                return null;
            }
          });
        const realKill = possibleMovesKill.filter((id) => !table[id].trim());
        possibleMoves.splice(0, 0, ...realKill);
      }
    } else {
      mount.current = true;
    }
  }, [selectedPiece]);

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
            {piece[house] || index}
          </House>
        );
      })
}
    </LayoutGrid>
  );
}

export default Board;
