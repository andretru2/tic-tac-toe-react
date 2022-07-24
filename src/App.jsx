import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    const newBoard = [...board]; //make a copy of the board
    if (newBoard?.[i]) return; //only set the square if the square is available. This must be outside of the setBoard setter otherwise it returns an error.

    setBoard((currBoard) => {
      currBoard[i] = player;
      return currBoard;
    });

    // checkWin(player) ? setWinner(player) : ""; //console.log("no winner yet");
    setPlayer((currPlayer) => (currPlayer === "O" ? "X" : "O"));

    if (checkWin(player)) {
      setWinner(player);
      return;
    }

    // setBoard((currBoard) => {
    //   //passing a function to modify the state based on the current state
    //   currBoard[i] = player;
    // });
    // setPlayer((currPlayer) => (currPlayer === "O" ? "X" : "O"));
  };

  useEffect(() => {
    // console.log(board);
    console.log("current player:" + player);
    console.log(board);
  }, [
    player,
  ]); /*dont put console.log inside the function to show the current values. Instead, use useEffect*/

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  const checkWin = (player) => {
    console.log("checking win for:" + player);
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
      console.log("Checking win for pattern: " + pattern);
      return pattern.every((index) => {
        //we want to check that every element has the same class(player's value) (i.e X, or O)
        //we want to check which cell has 0, 1, 2 combination. We want to check the classList and see if it contains the class for their current. If the current class is in all 3 of these elements inside the combination, then we found a winner. So for every cell inside the combination is correct for at least one of the winning combination, then we have a winner.
        let currValueAtSquare = board?.[index];
        let currentValueAtSquareMatches = currValueAtSquare === player;
        console.log(
          "Current value at index: " +
            currValueAtSquare +
            " matches player: " +
            currentValueAtSquareMatches
        );

        return currentValueAtSquareMatches;
      });
    });
  };

  return (
    <div className="App">
      <h1 className="mb-3">Tic-Tac-Toe</h1>
      <Board squares={board} onClick={handleClick} />
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
