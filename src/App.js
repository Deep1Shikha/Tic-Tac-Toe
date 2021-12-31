import React, { useState, useEffect } from 'react';
import './style.css';
import Board from './Board';
import Confetti from 'react-dom-confetti';

const initMatrix = [];
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: '157',
    dragFriction: 0.12,
    duration: '7060',
    stagger: 3,
    width: '30px',
    height: '37px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  const [matrix, setMatrix] = useState(initMatrix);
  const [currentplayer, setCurrentplayer] = useState('O');
  const [isWinner, setiswinner] = useState(false);
  const [winningplayer, setwinningplayer] = useState();
  const [reset, setReset] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const rowarray = new Array(3).fill(null);
    const row = [];
    for (let i = 0; i < 3; i++) {
      row.push([...rowarray]);
    }
    setMatrix(row);
  }, [reset]);

  const handleCellClick = (rowindex, colindex) => {
    console.log('clicked on', rowindex, colindex);
    if (!matrix[rowindex][colindex] && !isWinner) {
      let player = currentplayer === 'X' ? 'O' : 'X';
      setCurrentplayer(player);
      const copyMatrix = [...matrix];
      copyMatrix[rowindex][colindex] = player;
      setMatrix(copyMatrix);
    }
  };

  const matrixSingleArray = matrix.flat();
  function winner() {
    return WINNING_COMBINATION.some((combination) =>
      combination.every((e) => matrixSingleArray[e] === currentplayer)
    );
  }
  useEffect(() => {
    const getWinner = winner();
    if (getWinner) {
      setiswinner(getWinner);
      setwinningplayer(currentplayer);
      setActive(true);
    }
  });

  const handleReset = () => {
    setCurrentplayer('O');
    setiswinner(false);
    setwinningplayer();
    setActive(false);
    setReset(!reset);
  };
  return (
    <>
      {console.log(winningplayer)}
      <h4>Tick Tac Toe</h4>
      <h5>Winner is {winningplayer}</h5>
      <button onClick={handleReset}>Reset</button>
      <div className="clearfix">
        <Board matrix={matrix} handleCellClick={handleCellClick} />
      </div>
      <Confetti active={active} config={config} />
    </>
  );
}
