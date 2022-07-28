import React from "react";
import Square from "./Square";

const Board = ({ board, onClick }) => {
  return (
    <div className="grid grid-cols-3 ">
      {board.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => value === null && onClick(i)}
        />
      ))}
    </div>
  );
};

export default Board;
