// TicTacToe.tsx
import React, { useState } from 'react';

// Type for the board state
type Board = Array<string | null>;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = (board: Board) => {
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Handle a square click
  const handleClick = (index: number) => {
    if (board[index] || winner) return; // Ignore if square is taken or game is over

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const renderSquare = (index: number) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      {winner && <h2>{`Winner: ${winner}`}</h2>}
      {!winner && <h2>{`Next Player: ${isXNext ? 'X' : 'O'}`}</h2>}
      
      <div className="board">
        {board.map((_, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>

      {winner && <button onClick={restartGame}>Restart Game</button>}
    </div>
  );
};

export default TicTacToe;
