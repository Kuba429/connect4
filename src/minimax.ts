import { insertCell } from "./components/Cell";
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
		store.isOver = true;
		return;
	}
	store.turn = toggleTurn(store.turn);
};
