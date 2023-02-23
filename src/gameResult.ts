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
	const diag1 = checkDiagonal1(x, y, board);
	if (diag1) return diag1;
	const diag2 = checkDiagonal2(x, y, board);
	if (diag2) return diag2;
	return null;
};

// the 3 functions below are pretty similar but i decided to keep them separate in order to avoid unnecessary complexity. It's more readable that way and requirements will never change
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

// top left to bottom right corner
export const checkDiagonal1 = (x: number, y: number, board: cell[][]) => {
	const og = board[y][x].value;
	if (!og) return null;
	const line = [board[y][x]];
	const lowest = { x, y };
	const highest = { x, y };
	while (
		highest.y + 1 < board.length &&
		highest.x + 1 < board[y].length &&
		board[highest.y + 1][highest.x + 1].value === og
	) {
		line.push(board[highest.y + 1][highest.x + 1]);
		highest.y++;
		highest.x++;
	}
	while (
		lowest.y - 1 >= 0 &&
		lowest.x - 1 >= 0 &&
		board[lowest.y - 1][lowest.x - 1].value === og
	) {
		line.unshift(board[lowest.y - 1][lowest.x - 1]);
		lowest.y--;
		lowest.x--;
	}
	if (line.length >= 4) return { cells: line, winner: og };
	return null;
};

// top right to bottom left corner
export const checkDiagonal2 = (x: number, y: number, board: cell[][]) => {
	const og = board[y][x].value;
	if (!og) return null;
	const line = [board[y][x]];
	const lowest = { x, y };
	const highest = { x, y };
	while (
		highest.y + 1 < board.length &&
		highest.x - 1 >= 0 &&
		board[highest.y + 1][highest.x - 1].value === og
	) {
		line.push(board[highest.y + 1][highest.x - 1]);
		highest.y++;
		highest.x--;
	}
	while (
		lowest.y - 1 >= 0 &&
		lowest.x + 1 < board[y].length &&
		board[lowest.y - 1][lowest.x + 1].value === og
	) {
		line.unshift(board[lowest.y - 1][lowest.x + 1]);
		lowest.y--;
		lowest.x++;
	}
	if (line.length >= 4) return { cells: line, winner: og };
	return null;
};
