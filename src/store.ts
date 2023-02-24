import { proxy } from "valtio";
import { getEmptyBoard } from "./board";

export type player = 1 | 2;

const randomTurn = (): player => (Math.random() > 0.5 ? 1 : 2);
export const store = proxy({
	board: getEmptyBoard(),
	winner: null as player | null,
	turn: randomTurn(),
});

export const toggleTurn = () => {
	if (store.turn === 1) {
		store.turn = 2;
	} else if (store.turn === 2) {
		store.turn = 1;
	}
};

export const newGame = () => {
	store.board = getEmptyBoard();
	store.winner = null;
	store.turn = randomTurn();
};
