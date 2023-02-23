import { proxy, subscribe } from "valtio";
import { getEmptyBoard } from "./board";
import { checkResult } from "./gameResult";

export type player = 1 | 2;

export const store = proxy({
	board: getEmptyBoard(),
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
	const result = checkResult(store.board);
	if (result) console.log(`${result.winner} won`);
	toggleTurn();
});
