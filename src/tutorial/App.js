import { useState } from "react";

// 3 - Each individual Square component will have their own state var
function Square({ value }) {

  //1 - event handler for JSX element to respond to interaction
  function handleClick() {
    console.log(`clicked: ${value} \n`);
    alert(`clicked: ${value}`);
    newVal('X');
  }

  //2 - state = variables that will change over time && is passed to Component for rendering
  // useState to remember history of changed variables
  var [val, newVal] = useState(null); //useState(initialise_value)

  return <button className="square" onClick={handleClick}>{val}</button>;
}

function Board() {
  return (
    <>
      <div className="board-row" id="row1">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div><div className="board-row" id="row2">
        <Square value="4"></Square>
        <Square value="5"></Square>
        <Square value="6"></Square>
      </div><div className="board-row" id="row3">
        <Square value="7"></Square>
        <Square value="8"></Square>
        <Square value="9"></Square>
      </div>
    </>
  );
}

function Board2() {
  return (
    <>
      <div className="board-row" id="row1">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div><div className="board-row" id="row2">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div><div className="board-row" id="row3">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
export default Board;