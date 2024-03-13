// 6 - Creating Components Dynamically From Array

/* NOTE: Final behavior on Game State:
* When travel back to past moves, history is still retained (no update)
* When travel back + make move on squares = override existing history
*/

import { useState } from "react";

function Game() {
  /* Declare state variables relevant to game */
  const [XIsNext, setXIsNext] = useState(true); // player's turn
  const [historyArray, setHistory] = useState([Array(9).fill(null)]); // game board history
  // 6.3 - Store state variable to keep track of no. of current turn that user is viewing 
  const [currentTurnNo, setCurrentTurnNo] = useState(0); // current turn (int representing sequential order)
  // 6.6 - Modify to render selected state instead of always latest state
  // const currentState = historyArray[historyArray - 1];
  const currentState = historyArray[currentTurnNo];

  // 6.5 - Modify to take into account next action after returning to earlier state
  function handlePlayerMove(stateArrayAfterNextMove) {
    setXIsNext(!XIsNext);
    // setHistory([...historyArray, stateArrayAfterNextMove]); // Modify function for returning to earlier turns

    // Override setHistory(): When go back in time to previous move = retain historyArray[0] to historyArray[chosenMove] only
    setCurrentTurnNo(currentTurnNo + 1); // Record how many turns of game already played
    let history = [...historyArray.slice(0, currentTurnNo + 1), stateArrayAfterNextMove]; // Combine historyArray[0] to historyArray[chosenState] + append latest state
    setHistory(history);

    console.log(`currentTurnNo: ${currentTurnNo}`);
    console.log('Previous turn history: \n' + historyArray[historyArray.length - 1]);
    console.log('Overall history (exclude current move): \n' + historyArray);
  }

  // 6.1 - Create an individual history button dynamically when user interact with tic-tac-toe board
  const moves = historyArray.map((squares, move) => { //.map(callbackFn, iteratorElement)
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    // 6.2 - To create list from array dynamically, need to assign key
    //       for each list component so we can address & modify individual components later  
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // 6.4 - Create function to handle click on history buttons -> When click on history button, return to previous state
  function jumpTo(jumpToMove) {
    setCurrentTurnNo(jumpToMove);
    setXIsNext(jumpToMove % 2 === 0); // jumpToMove = number of turns accumulated
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board XIsNext={XIsNext} currentStateArray={currentState} onPlayerMove={handlePlayerMove} />
        {/* 6.6 - Modify to render selected state instead of always latest state*/}
      </div>
      {/* Show history of moves */}
      <div className="game-info">
        <ol>{moves} </ol> {/* {moves} -> Call function to create a history button dynamically */}
      </div>
    </div>
  );
}



function Square({ value, handleClick }) {
  return <button className="square" onClick={handleClick}> {value} </button>;
}

function Board({ XIsNext, currentStateArray, onPlayerMove }) {
  try {

    // To be handled as historyArray by parent
    // const [statesArray, setNewValue] = useState(Array(9).fill(null));

    function handleClick(index) {

      // FIX: Add checking on winner before respond to action on Square. 
      // Ignore action if already have winner
      if (calculateWinner(currentStateArray) || currentStateArray[index]) {
        return;
      }

      // if the Square has already been set to a state (i.e., already clicked once) 
      if (currentStateArray[index]) {
        return; //do nothing; skip trigger re-render & proceed with calculate winner
      }

      // Correct way to do 
      let newStatesArray = currentStateArray.slice(); // create a copy of array & modify element in array representing the state which should be altered
      if (XIsNext) {
        newStatesArray[index] = "X";
      } else {
        newStatesArray[index] = "O";
      }

      onPlayerMove(newStatesArray);

      console.log(`${index} - currentState: ${newStatesArray} \n XIsNext: ${XIsNext}`);
      alert(`clicked: ${index} - ${newStatesArray[index]};\n XIsNext: ${XIsNext}`);
    };

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
