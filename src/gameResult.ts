import { cell } from "./components/Cell";
import { player } from "./store";

type winResult = {
	winner: player;
	cells: cell[];
};
export const checkResult = (board: cell[][]): winResult | null => {
	for (let y = 0; y < board.length; y++) {
		const row = board[y];
		for (let x = 0; x < row.length; x++) {
			const r = checkResultByCell(x, y, board);
			if (r) return r;
		}
	}
	return null;
};

export const checkResultByCell = (
	x: number,
	y: number,
	board: cell[][]
): winResult | null => {
	const hor = checkHorizontal(x, y, board);
	if (hor) return hor;
	const ver = checkVertical(x, y, board);
	if (ver) return ver;
	return null;
};

export const checkHorizontal = (
	x: number,
	y: number,
	board: cell[][]
): winResult | null => {
	// horizontal line
	const og = board[y][x].value;
	if (!og) return null;
	const line = [board[y][x]];
	let lowest = x;
	let highest = x;
	// go right until the values are the same
	while (
		highest + 1 < board[y].length &&
		board[y][highest + 1].value === og
	) {
		line.push(board[y][highest + 1]);
		highest++;
	}
	// then go left
	while (lowest - 1 >= 0 && board[y][lowest - 1].value === og) {
		line.unshift(board[y][lowest - 1]);
		lowest--;
	}
	if (line.length >= 4) return { cells: line, winner: og };
	return null;
};

export const checkVertical = (
	x: number,
	y: number,
	board: cell[][]
): winResult | null => {
	// horizontal line
	const og = board[y][x].value;
	if (!og) return null;
	const line = [board[y][x]];
	let lowest = y;
	let highest = y;
	// go down until the values are the same
	while (highest + 1 < board.length && board[highest + 1][x].value === og) {
		line.push(board[highest + 1][x]);
		highest++;
	}
	// then go up
	while (lowest - 1 >= 0 && board[lowest - 1][x].value === og) {
		line.unshift(board[lowest - 1][x]);
		lowest--;
	}
	if (line.length >= 4) return { cells: line, winner: og };
	return null;
};
