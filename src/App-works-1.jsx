import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  // console.log(player);

  useEffect(() => {
    if (checkWin(player)) {
      setWinner(player);
      return;
    }
  }, [board]);

  const handleClick = (i) => {
    const newBoard = [...board]; //make a copy of the board
    if (newBoard?.[i] || winner.length > 0) return; //only set the square if the square is available. This must be outside of the setBoard setter otherwise it returns an error.
    newBoard[i] = player;

    flushSync(() => {
      setBoard(newBoard);
    });

    setPlayer(player === "O" ? "X" : "O");
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner("");
  };

  const checkWin = (player) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //loop over each of the winning patterns, and for each one of the combinations check if all of the indexes (all the values in the square elements), have the same class.
    //per kyle @ wed dev simplified, use some and every, which return a boolean
    //Some: Return true if at least one element in the array returns true from the function passed to some
    //Every: Return true if every element in the array returns true from the function passed to every
    //www.youtube.com/watch?v=Y-GkMjUZsmM
    //https://github.com/WebDevSimplified/JavaScript-Tic-Tac-Toe/blob/master/script.js

    return winningPatterns.some((pattern) => {
      return pattern.every((index) => {
        return board?.[index] === player;
      });
    });
  };

  return (
    <div className="App">
      <h1 className="mb-3">Tic-Tac-Toe</h1>
      <Board board={board} onClick={handleClick} />
      <p className="mt-3">Turn: {player}</p>
      <p className="mt-3">Winner: {winner}</p>
      <button
        className="bg-indigo-500 mt-10"
        type="button"
        onClick={restartGame}
      >
        New Game
      </button>
      {/* {winner.length > 0 && (
        <div className="text-3xl text-white mt-7">Winner is {winner}</div>
      )} */}
    </div>
  );
}

export default App;
