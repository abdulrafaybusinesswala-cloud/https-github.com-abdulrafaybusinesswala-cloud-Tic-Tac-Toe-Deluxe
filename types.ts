export type Player = 'X' | 'O' | null;

export interface WinState {
  winner: Player;
  line: number[] | null;
  isDraw: boolean;
}

export interface Score {
  X: number;
  O: number;
  Draws: number;
}
