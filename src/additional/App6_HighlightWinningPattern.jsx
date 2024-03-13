import { useState } from "react";

function Game() {
  /* Declare state variables relevant to game */
  const [historyArray, setHistory] = useState([Array(9).fill(null)]); // game board history
  const [currentTurnNo, setCurrentTurnNo] = useState(0); // current turn (int representing sequential order)
  const currentState = historyArray[currentTurnNo];
  let XIsNext = currentTurnNo % 2 === 0;

  function handlePlayerMove(stateArrayAfterNextMove) {
    setCurrentTurnNo(currentTurnNo + 1); // Record how many turns of game already played
    let history = [...historyArray.slice(0, currentTurnNo + 1), stateArrayAfterNextMove]; // Combine historyArray[0] to historyArray[chosenState] + append latest state
    setHistory(history);

    console.log(`currentTurnNo: ${currentTurnNo}`);
    console.log('Previous turn history: \n' + historyArray[historyArray.length - 1]);
    console.log('Overall history (exclude current move): \n' + historyArray);
  }

  const moves = historyArray.map((squares, move) => { //.map(callbackFn, iteratorElement)
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    // To create list from array dynamically
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Create function to handle click on history buttons -> When click on history button, return to previous state
  function jumpTo(jumpToMove) {
    setCurrentTurnNo(jumpToMove);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board XIsNext={XIsNext} currentStateArray={currentState} onPlayerMove={handlePlayerMove} />
      </div>
      {/* Show history of moves */}
      <div className="game-info">
        <ol>{moves} </ol> {/* {moves} -> Call function to create a history button dynamically */}
      </div>
    </div>
  );
}



function Square({ value, handleClick, squareID, color }) {
  // 1.2 - Add attribute squareID
  // 1.3 - Add attribute color & apply conditional rendering
  return <button className="square" onClick={handleClick} key={squareID} style={{ backgroundColor: color }}> {value} </button>;
}

function Board({ XIsNext, currentStateArray, onPlayerMove }) {
  try {

    // 1.5 - Retrieve winner && winningPattern from result by destructuring
    const { winner, winningPattern } = calculateWinner(currentStateArray);

    function handleClick(index) {
      // Ignore action if already have winner
      if (winner || currentStateArray[index]) {
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
          {/* 1.1 - Add prop squareID */}
          {/* 1.6 - Highlight winning pattern */}
          {/* 1.6 - Note: .includes() hit error on array == null */}
          <Square value={currentStateArray[0]} handleClick={() => handleClick(0)} squareID={0} color={winningPattern && winningPattern.includes(0) ? "yellow" : ""}></Square>
          <Square value={currentStateArray[1]} handleClick={() => handleClick(1)} squareID={1} color={winningPattern && winningPattern.includes(1) ? "yellow" : ""}></Square>
          <Square value={currentStateArray[2]} handleClick={() => handleClick(2)} squareID={2} color={winningPattern && winningPattern.includes(2) ? "yellow" : ""}></Square>
        </div><div className="board-row" id="row2">
          <Square value={currentStateArray[3]} handleClick={() => handleClick(3)} squareID={3} color={winningPattern && winningPattern.includes(3) ? "yellow" : ""}></Square>
          <Square value={currentStateArray[4]} handleClick={() => handleClick(4)} squareID={4} color={winningPattern && winningPattern.includes(4) ? "yellow" : ""}></Square>
          <Square value={currentStateArray[5]} handleClick={() => handleClick(5)} squareID={5} color={winningPattern && winningPattern.includes(5) ? "yellow" : ""}></Square>
        </div><div className="board-row" id="row3">
          <Square value={currentStateArray[6]} handleClick={() => handleClick(6)} squareID={6}> color={winningPattern && winningPattern.includes(6) ? "yellow" : ""}</Square>
          <Square value={currentStateArray[7]} handleClick={() => handleClick(7)} squareID={7}> color={winningPattern && winningPattern.includes(7) ? "yellow" : ""}</Square>
          <Square value={currentStateArray[8]} handleClick={() => handleClick(8)} squareID={8}> color={winningPattern && winningPattern.includes(8) ? "yellow" : ""}</Square>
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
      // 1.4 - Return winner && winningPattern
      // return squares[a];
      return ({ winner: squares[a], winningPattern: [a, b, c] });
    }
  }
  // 1.4 - Since we modified the structure for case when there is a winner, 
  //       need to modify structure for case when no winner else cannot destructure properly in 1.5
  // return null;
  return ({ winner: null, winningPattern: null });

}

export default Game;
