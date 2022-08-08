import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { House, Line } from './styles';

function Board() {
  const lines = [1, 2, 3, 4, 5, 6, 7, 8];
  const coluns = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      {lines.map((line) => (
        <Line key={uuidv4()}>
          {coluns.map((colun) => {
            console.log(colun + line);
            return (
              <House
                key={uuidv4()}
                isWhite={(colun + line) % 2 === 0}
                id={`${line} ${colun}`}
              />
            );
          })}
        </Line>
      ))}
    </>
  );
}

export default Board;
