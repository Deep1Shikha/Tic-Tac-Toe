import React from 'react';
import './style.css';

const Board = ({ matrix, handleCellClick }) => {
  console.log(matrix);
  return (
    <>
      {matrix.map((col, colindex) => (
        <div key={colindex} className="grid-col">
          {col.map((row, rowindex) => (
            <div
              key={rowindex}
              className="grid-row"
              onClick={(e) => {
                handleCellClick(rowindex, colindex);
              }}
            >
              {matrix[rowindex][colindex]}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;
