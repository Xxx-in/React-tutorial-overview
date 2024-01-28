function Board() {
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