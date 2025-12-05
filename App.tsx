import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, AlertCircle } from 'lucide-react';
import { Board } from './components/Board';
import { Player, WinState, Score } from './types';

export default function App() {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [score, setScore] = useState<Score>({ X: 0, O: 0, Draws: 0 });
  const [winState, setWinState] = useState<WinState>({ winner: null, line: null, isDraw: false });

  // Winning combinations indices
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const calculateWinner = (currentSquares: Player[]): WinState => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
        return { winner: currentSquares[a], line: lines[i], isDraw: false };
      }
    }
    
    if (!currentSquares.includes(null)) {
      return { winner: null, line: null, isDraw: true };
    }

    return { winner: null, line: null, isDraw: false };
  };

  const handleClick = (i: number) => {
    if (winState.winner || winState.isDraw || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const result = calculateWinner(nextSquares);
    if (result.winner || result.isDraw) {
      setWinState(result);
      updateScore(result);
    }
  };

  const updateScore = (result: WinState) => {
    setScore(prev => ({
      ...prev,
      X: result.winner === 'X' ? prev.X + 1 : prev.X,
      O: result.winner === 'O' ? prev.O + 1 : prev.O,
      Draws: result.isDraw ? prev.Draws + 1 : prev.Draws
    }));
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinState({ winner: null, line: null, isDraw: false });
  };

  // Status message logic
  let status;
  let statusColor = "text-slate-200";
  
  if (winState.winner) {
    status = `Winner: ${winState.winner}`;
    statusColor = winState.winner === 'X' ? 'text-cyan-400' : 'text-rose-400';
  } else if (winState.isDraw) {
    status = "Draw!";
    statusColor = 'text-yellow-400';
  } else {
    status = `Player ${xIsNext ? 'X' : 'O'}'s Turn`;
    statusColor = xIsNext ? 'text-cyan-400' : 'text-rose-400';
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-purple-500/30">
      <div className="max-w-md w-full flex flex-col items-center gap-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400 tracking-tight">
            Tic-Tac-Toe
          </h1>
          <div className={`text-xl font-semibold flex items-center justify-center gap-2 ${statusColor} transition-colors duration-300`}>
             {winState.winner && <Trophy className="w-6 h-6 animate-bounce" />}
             {winState.isDraw && <AlertCircle className="w-6 h-6" />}
             {status}
          </div>
        </div>

        {/* Game Board */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-rose-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <Board 
            squares={squares} 
            onClick={handleClick} 
            winningLine={winState.line}
            isGameOver={!!(winState.winner || winState.isDraw)}
          />
        </div>

        {/* Score Board */}
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg flex flex-col items-center">
            <span className="text-sm text-cyan-400 font-bold">PLAYER X</span>
            <span className="text-2xl text-white font-mono">{score.X}</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg flex flex-col items-center">
             <span className="text-sm text-yellow-500 font-bold">DRAWS</span>
             <span className="text-2xl text-white font-mono">{score.Draws}</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg flex flex-col items-center">
             <span className="text-sm text-rose-400 font-bold">PLAYER O</span>
             <span className="text-2xl text-white font-mono">{score.O}</span>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={resetGame}
          className="
            group relative px-6 py-3 font-semibold text-white transition-all duration-200
            bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500
            active:scale-95
            flex items-center gap-2
          "
        >
          <RefreshCw className={`w-5 h-5 ${winState.winner || winState.isDraw ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          <span>New Game</span>
        </button>

      </div>
    </div>
  );
}