import { proxy } from "valtio";
import { getEmptyBoard } from "./board";

export type player = 1 | 2;

const randomTurn = (): player => (Math.random() > 0.5 ? 1 : 2);
export const store = proxy({
	board: getEmptyBoard(),
	winner: null as player | null,
	turn: 1 as player,
});

export const toggleTurn = (turn: player) => {
	if (turn === 1) {
		return 2;
	}
	return 1;
};

export const newGame = () => {
	store.board = getEmptyBoard();
	store.winner = null;
	store.turn = 1;
};
