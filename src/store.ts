import { proxy, subscribe } from "valtio";
import { cell } from "./components/Cell";

export const getEmptyBoard = () => {
	const arr: cell[][] = [];
	for (let y = 0; y < 6; y++) {
		arr.push([]);
		for (let x = 0; x < 7; x++) {
			arr[y][x] = {
				value: null,
				id: y * 7 + x,
				x,
				y,
			};
		}
	}
	return arr;
};

export type player = 1 | 2;

export const store = proxy({
	board: getEmptyBoard(),
	turn: 1 as player,
});

export const insertCell = (x: number, value: player) => {
	for (let y = store.board.length - 1; y >= 0; y--) {
		const row = store.board[y];
		if (row[x].value === null) {
			row[x].value = value;
			return;
		}
	}
	console.log("no space");
};

export const toggleTurn = () => {
	if (store.turn === 1) {
		store.turn = 2;
	} else if (store.turn === 2) {
		store.turn = 1;
	}
};

subscribe(store.board, toggleTurn);
