import { useEffect, useState, useRef } from "react";
import { flushSync } from "react-dom";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("O");
  const [winner, setWinner] = useState("");

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (checkWin()) {
        setWinner(player);
        return;
      }
      setPlayer(player === "O" ? "X" : "O");
    }
  }, [board]);

  const handleClick = (i) => {
    if (winner.length > 0) return; //only set the square if the square is available. This must be outside of the setBoard setter otherwise it returns an error.

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard]; //make a copy of the board
      newBoard[i] = player;
      return newBoard;
    });
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner("");
  };

  const checkWin = () => {
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
    console.log("player: " + player);
    console.log("board: " + board);
    return winningPatterns.some((pattern) => {
      console.log("pattern: " + pattern);
      return pattern.every((index) => {
        const matches = board[index] === player;
        console.log("matches: " + matches);
        console.log("square: " + board[index]);
        return matches;
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
