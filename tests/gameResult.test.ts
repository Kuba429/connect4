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
	expect(result?.winner).toBe(1);
	result = checkResultByCell(0, 2, board);
	expect(result?.winner).toBe(1);
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
	expect(result?.winner).toBe(1);
	result = checkResultByCell(4, 3, board);
	expect(result?.winner).toBe(1);
	// change the board so 1 is not winning anymore
	board[2][4].value = 2; // one of the cells to which 1 was assigned before
	result = checkResultByCell(4, 3, board);
	expect(result).toBeNull();
});
