import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => {
  //const squares = [...Array(9).fill(null)]; //same as squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="grid grid-cols-3 ">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default Board;
