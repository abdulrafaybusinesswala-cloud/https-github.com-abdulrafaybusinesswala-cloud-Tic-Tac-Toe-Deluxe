import React from 'react';
import { Square } from './Square';
import { Player } from '../types';

interface BoardProps {
  squares: Player[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
  isGameOver: boolean;
}

export const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine, isGameOver }) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 bg-slate-800/50 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-md">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          isWinningSquare={winningLine?.includes(i) ?? false}
          disabled={!!square || (isGameOver && !winningLine?.includes(i))}
        />
      ))}
    </div>
  );
};