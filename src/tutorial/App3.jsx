// 5 - Accessing history of state
import { useState } from "react";

function Game() {
  // 5.1 - Lift state up from child to parent to store history overview
  const [XIsNext, setXIsNext] = useState(true);
  const [historyArray, setHistory] = useState([Array(9).fill(null)]);

  // 5.6 - Child's event handler triggers update in parent
  function handlePlayerMove(stateArrayAfterNextMove) {
    setHistory([...historyArray, stateArrayAfterNextMove]);// used to be: setNewValue(newStatesArray); 
    setXIsNext(!XIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        {/* 5.2 - Pass state as props to child */}
        <Board XIsNext={XIsNext} currentStateArray={historyArray[historyArray.length - 1]} onPlayerMove={handlePlayerMove} />
      </div>
      {/* Show history of moves */}
      <div className="game-info">
        <ol></ol>
      </div>
    </div>
  );
}

function Square({ value, handleClick }) {
  return <button className="square" onClick={handleClick}> {value} </button>;
}

// 5.3 - Child receive state as param
function Board({ XIsNext, currentStateArray, onPlayerMove }) {
  try {

    // To be handled as historyArray by parent
    // const [statesArray, setNewValue] = useState(Array(9).fill(null));

    // 5.4 - Access props received from parent
    function handleClick(index) {
      // if the Square has already been set to a state (i.e., already clicked once) 
      if (currentStateArray[index]) {
        return; //do nothing; skip trigger re-render & proceed with calculate winner
      }

      // Correct way to do 
      let newStatesArray = currentStateArray.slice(); // create a copy of array & modify element in array representing the statew which should be altered
      if (XIsNext) {
        newStatesArray[index] = "X";
      } else {
        newStatesArray[index] = "O";
      }

      // 5.5 - Initial logic to trigger re-render when player makes a move is lifted to parent's onPlayerMove()
      onPlayerMove(newStatesArray);
      /* 
      setNewValue(newStatesArray);
      setXIsNext(!XIsNext);
      */

      console.log(`${index} - afterSetNewValue: ${newStatesArray} \n XIsNext: ${XIsNext}`);
      alert(`clicked: ${index} - ${newStatesArray[index]};\n XIsNext: ${XIsNext}`);
    }

    const winner = calculateWinner(currentStateArray);

    let status;
    if (winner) {
      status = "Winner: " + winner;
      alert(`Winner is ${winner}`);
    } else {
      status = "Next player: " + (XIsNext ? "X" : "O");
    }

    return (
      <>
        <div className="status">{status}</div>       {/* New div to display winner  */}
        <div className="board-row" id="row1">
          <Square value={currentStateArray[0]} handleClick={() => handleClick(0)} />
          <Square value={currentStateArray[1]} handleClick={() => handleClick(1)} />
          <Square value={currentStateArray[2]} handleClick={() => handleClick(2)} />
        </div><div className="board-row" id="row2">
          <Square value={currentStateArray[3]} handleClick={() => handleClick(3)}></Square>
          <Square value={currentStateArray[4]} handleClick={() => handleClick(4)}></Square>
          <Square value={currentStateArray[5]} handleClick={() => handleClick(5)}></Square>
        </div><div className="board-row" id="row3">
          <Square value={currentStateArray[6]} handleClick={() => handleClick(6)}></Square>
          <Square value={currentStateArray[7]} handleClick={() => handleClick(7)}></Square>
          <Square value={currentStateArray[8]} handleClick={() => handleClick(8)}></Square>
        </div>
      </>
    );
  }
  catch (err) {
    console.log(err + err.stack ? err.stack : "");
  }
}

// Determine if player has won after player make move
function calculateWinner(squares) {
  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningPattern.length; i++) {
    const [a, b, c] = winningPattern[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;