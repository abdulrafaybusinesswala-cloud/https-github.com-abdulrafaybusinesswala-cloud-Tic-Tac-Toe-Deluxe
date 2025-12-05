import React from 'react';
import { X, Circle } from 'lucide-react';
import { Player } from '../types';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare: boolean;
  disabled: boolean;
}

export const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, disabled }) => {
  return (
    <button
      className={`
        relative flex items-center justify-center h-24 w-24 sm:h-32 sm:w-32 
        bg-white/10 backdrop-blur-sm border-2 rounded-xl transition-all duration-200
        ${!value && !disabled ? 'hover:bg-white/20 cursor-pointer' : ''}
        ${isWinningSquare ? 'bg-green-500/20 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]' : 'border-white/10'}
        ${disabled && !isWinningSquare ? 'cursor-default' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square occupied by ${value}` : "Empty square"}
    >
      <div className={`transition-all duration-300 transform ${value ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        {value === 'X' && (
          <X 
            size={64} 
            strokeWidth={2.5}
            className={`text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] ${isWinningSquare ? 'text-white' : ''}`} 
          />
        )}
        {value === 'O' && (
          <Circle 
            size={56} 
            strokeWidth={3}
            className={`text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.8)] ${isWinningSquare ? 'text-white' : ''}`} 
          />
        )}
      </div>
    </button>
  );
};