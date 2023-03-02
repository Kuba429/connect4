import { cell, insertCell } from "./components/Cell";
import { checkResultByCell } from "./gameResult";
import { player, store, toggleTurn } from "./store";

export const makeMove = () => {
	//	const board = JSON.parse(JSON.stringify(store.board));
	//	const turn = store.turn;
	//	let bestMove = { x: 0, score: -Infinity };
	//	for (let i = 0; i < board[0].length; i++) {
	//		const cell = insertCell(board, i, turn);
	//		if (!cell) continue;
	//		const currentScore = minimax(board, cell, turn, false);
	//		board[cell.y][cell.x].value = null;
	//		if (currentScore > bestMove.score) {
	//			bestMove.score = currentScore;
	//			bestMove.x = i;
	//		}
	//	}
	//	const cell = insertCell(store.board, bestMove.x, turn);
	//	if (!cell) return;
	//	const result = checkResultByCell(cell.x, cell.y, store.board);
	//	if (result) {
	//		store.winner = result.winner;
	//		return;
	//	}
	//	store.turn = toggleTurn(store.turn);
	const boardProp = Int8Array.from(
		store.board.flat().map((c) => c.value ?? 0)
	);
	//@ts-ignore
	const bestX = Module.ccall(
		"get_best_move",
		"number",
		["array", "number", "number", "number"],
		[boardProp, store.turn, toggleTurn(store.turn), store.turn]
	);
	const cell = insertCell(store.board, bestX, store.turn);
	if (!cell) throw Error("aaa");
	const result = checkResultByCell(cell.x, cell.y, store.board);
	if (result) {
		store.winner = result.winner;
		return;
	}
	store.turn = toggleTurn(store.turn);
};

const minimax = (
	board: cell[][],
	lastCell: { x: number; y: number },
	turn: player,
	maximizing: boolean,
	depth = 3
) => {
	const res = checkResultByCell(lastCell.x, lastCell.y, board);
	if (res) {
		if (res.winner === store.turn) return (depth + 1) * 1;
		if (res.winner === toggleTurn(store.turn)) return (depth + 1) * -1;
	}
	if (depth < 1) return 0;
	if (maximizing) {
		let bestScore = -Infinity;
		for (let i = 0; i < board[0].length; i++) {
			const cell = insertCell(board, i, store.turn);
			if (!cell) continue;
			const newScore = minimax(
				board,
				cell,
				toggleTurn(turn),
				!maximizing,
				depth - 1
			);
			if (newScore >= bestScore) {
				bestScore = newScore;
			}
			board[cell.y][cell.x].value = null;
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		for (let i = 0; i < board[0].length; i++) {
			const cell = insertCell(board, i, toggleTurn(store.turn));
			if (!cell) continue;
			const newScore = minimax(
				board,
				cell,
				toggleTurn(turn),
				!maximizing,
				depth - 1
			);
			if (newScore <= bestScore) {
				bestScore = newScore;
			}
			board[cell.y][cell.x].value = null;
		}
		return bestScore;
	}
};
