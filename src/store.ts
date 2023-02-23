import { proxy, subscribe } from "valtio";
import { getEmptyBoard } from "./board";

export type player = 1 | 2;

export const store = proxy({
	board: getEmptyBoard(),
	winner: null as player | null,
	turn: 1 as player,
});

export const toggleTurn = () => {
	if (store.turn === 1) {
		store.turn = 2;
	} else if (store.turn === 2) {
		store.turn = 1;
	}
};

subscribe(store.board, () => {
	toggleTurn();
});
