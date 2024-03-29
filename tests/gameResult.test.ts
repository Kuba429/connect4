import { getEmptyBoard } from "../src/board";
import { checkResult, checkResultByCell } from "../src/gameResult";

test("Winning condition - horizontal", () => {
	let board = getEmptyBoard();
	let result = checkResult(board);
	// empty board
	expect(result).toBeNull();
	// [x,y]
	[
		[0, 2],
		[1, 2],
		[2, 2],
		[3, 2],
	].forEach(([x, y]) => (board[y][x].value = 1));
	// board with winning line made of ones
	result = checkResult(board);
	expect(result).not.toBeNull();
	expect(result).toBe(1);
	result = checkResultByCell(0, 2, board);
	expect(result).toBe(1);
	// change the board so 1 is not winning anymore
	board[2][1].value = 2; // one of the cells to which 1 was assigned before
	result = checkResultByCell(0, 2, board);
	expect(result).toBeNull();
});

test("Winning condition - vertical", () => {
	let board = getEmptyBoard();
	let result = checkResult(board);
	// empty board
	expect(result).toBeNull();
	// [x,y]
	[
		[4, 1],
		[4, 2],
		[4, 3],
		[4, 4],
	].forEach(([x, y]) => (board[y][x].value = 1));
	// board with winning line made of ones
	result = checkResult(board);
	expect(result).not.toBeNull();
	expect(result).toBe(1);
	result = checkResultByCell(4, 3, board);
	expect(result).toBe(1);
	// change the board so 1 is not winning anymore
	board[2][4].value = 2; // one of the cells to which 1 was assigned before
	result = checkResultByCell(4, 3, board);
	expect(result).toBeNull();
});

test("Winning condition - diagonal top-left to bottom-right corner", () => {
	let board = getEmptyBoard();
	let result = checkResult(board);
	// empty board
	expect(result).toBeNull();
	// [x,y]
	[
		[3, 2],
		[4, 3],
		[5, 4],
		[6, 5],
	].forEach(([x, y]) => (board[y][x].value = 1));
	// board with winning line made of ones
	result = checkResult(board);
	expect(result).not.toBeNull();
	expect(result).toBe(1);
	result = checkResultByCell(4, 3, board);
	expect(result).toBe(1);
	// change the board so 1 is not winning anymore
	board[5][6].value = 2; // one of the cells to which 1 was assigned before
	result = checkResultByCell(4, 3, board);
	expect(result).toBeNull();
});

test("Winning condition - diagonal top-right to bottom-left corner", () => {
	let board = getEmptyBoard();
	let result = checkResult(board);
	// empty board
	expect(result).toBeNull();
	// [x,y]
	[
		[5, 1],
		[4, 2],
		[3, 3],
		[2, 4],
	].forEach(([x, y]) => (board[y][x].value = 1));
	// board with winning line made of ones
	result = checkResult(board);
	expect(result).not.toBeNull();
	expect(result).toBe(1);
	result = checkResultByCell(4, 2, board);
	expect(result).toBe(1);
	// change the board so 1 is not winning anymore
	board[1][5].value = 2; // one of the cells to which 1 was assigned before
	result = checkResultByCell(4, 2, board);
	expect(result).toBeNull();
});
