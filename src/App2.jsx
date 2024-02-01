// 4 - Lifting state from child to parent component
// Previously @ 3 - Each Square component keeps their individual value var
// In order to know the winner of the game, we need to know the state of each Square Component
// All Square Components are Child Components of Board
// Idea: We use Board (Parent Component) as control centre which oversees the state(variable) of each Square child component
// |_ Child component blindly receive from parent component & render only

import { useState } from "react";

function Square({ value, handleClick }) {

  // 4.4 - Move to Parent component
  // function handleClick() {
  //   console.log(`clicked: ${value} \n`);
  //   alert(`clicked: ${value}`);
  //   newVal('X');
  // }

  // 4.3 - Remove state tracking within child Component -> take over by Parent
  // var [val, newVal] = useState(null); //useState(initialise_value)

  // 4.6 - When give input param to handleClick(value) == execute this function
  // Executing handleClick(value) triggers setNewValue() handleClick() -> re-render -> infinite loop
  // return <button className="square" onClick={handleClick}> {value} </button>;
  return <button className="square" onClick={handleClick}> {value} </button>;
}


function Board() {

  // 4.1 - Declare an array to store all states for each Square component
  // const array = useState(Array(9).fill(null)); // array  = [[currValSquare0,...currValSquare8], function setNewValue()]
  const [statesArray, setNewValue] = useState(Array(9).fill(null));
  console.log(`statesArray: ${statesArray}`);
  const [XIsNext, setXIsNext] = useState(true);

  // 4.4 - Declare logic for handling interaction with each Square component 
  // States are unqiue to each component
  // Parents can pass component to child; child cannot change state is parent but can trigger events to be handled by parent & indirectly alter state
  function handleClick(index) {
    // Wrong way to do 
    setNewValue('X'); // If you reassign to single value, it will change from array to 'X'

    // Correct way to do 
    let copyStatesArray = statesArray.slice(); // create a copy of array & modify element in array representing the statew which should be altered
    // copyStatesArray[index] = 'X';
    if (XIsNext) {
      copyStatesArray[index] = "X";
    } else {
      copyStatesArray[index] = "O";
    }
    setNewValue(copyStatesArray);
    setXIsNext(!XIsNext);
    console.log(`${index} - afterSetNewValue: ${copyStatesArray} \n XIsNext: ${XIsNext}`);
    alert(`clicked: ${index} - ${copyStatesArray[index]};\n XIsNext: ${XIsNext}`);
  }

  return (
    <>
      <div className="board-row" id="row1">
        {/* 4.2 - Pass corresnponding current value in statesArray to component */}
        {/* 4.4 - Pass in event handler function to child */}
        {/* 4.6 - Pass in event handler function wrapped as higher-order function to avoid infinite looping
         that is started by executing handler function when pass in */}
        <Square value={statesArray[0]} handleClick={() => handleClick(0)} />
        <Square value={statesArray[1]} handleClick={() => handleClick(1)} />
        <Square value={statesArray[2]} handleClick={() => handleClick(2)} />
      </div><div className="board-row" id="row2">
        <Square value={statesArray[3]} handleClick={() => handleClick(3)}></Square>
        <Square value={statesArray[4]} handleClick={() => handleClick(4)}></Square>
        <Square value={statesArray[5]} handleClick={() => handleClick(5)}></Square>
      </div><div className="board-row" id="row3">
        <Square value={statesArray[6]} handleClick={() => handleClick(6)}></Square>
        <Square value={statesArray[7]} handleClick={() => handleClick(7)}></Square>
        <Square value={statesArray[8]} handleClick={() => handleClick(8)}></Square>
      </div>
    </>
  );
}

export default Board;