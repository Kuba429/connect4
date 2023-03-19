import { cell, insertCell } from "./components/Cell";
import { checkResultByCell } from "./gameResult";
import { player, store, toggleTurn } from "./store";

const getBestMove: (
	board: Int8Array,
	turn: player,
	player: player,
	ai: player
	//@ts-ignore
) => number = (window["Module"] ?? require("../public/wasm/wasm_loader")).cwrap(
	"get_best_move",
	"number",
	["array", "number", "number", "number"]
);
export const makeMove = () => {
	const boardProp = Int8Array.from(
		store.board.flat().map((c) => c.value ?? 0)
	);
	const bestX = getBestMove(
		boardProp,
		store.turn,
		toggleTurn(store.turn),
		store.turn
	);
	const cell = insertCell(store.board, bestX, store.turn);
	if (!cell) throw Error("aaa");
	const winner = checkResultByCell(cell.x, cell.y, store.board);
	if (winner) {
		store.winner = winner;
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
