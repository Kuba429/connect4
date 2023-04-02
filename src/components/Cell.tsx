import { FC } from "react";
import { checkResultByCell, howManyEmptyCells } from "../gameResult";
import { makeMove } from "../minimax";
import { player, store, toggleTurn } from "../store";

export type cell = {
	value: player | null;
	id: number;
	x: number;
	y: number;
	highlight: boolean;
};
export const MAKE_MOVE_TIMEOUT = 50; // timeout used to force makeMove out of sync loop
export const Cell: FC<{ cell: cell }> = ({ cell }) => {
	const handleClick = () => {
		if (store.isOver) return;
		if (store.isMovePending) return;
		store.isMovePending = true;
		const newCell = insertCell(store.board, cell.x, store.turn);
		if (!newCell) return;
		const winner = checkResultByCell(newCell.x, newCell.y, store.board);
		if (winner) {
			store.winner = winner;
			store.isOver = true;
			return;
		}
		if (howManyEmptyCells(store.board) < 1) {
			store.isOver = true;
			return;
		}
		store.turn = toggleTurn(store.turn);
		// IMPORTANT looks like safari blocks the main thread and awaits small timeouts. 50 seems to not be awaited
		setTimeout(() => {
			makeMove();
			store.isMovePending = false;
			if (howManyEmptyCells(store.board) < 1) {
				store.isOver = true;
				return;
			}
		}, MAKE_MOVE_TIMEOUT);
	}; // this store access doesn't need to be reactive; only accesses proxy on click; love valtio <3
	const colorClass = cell.value ? "player" + cell.value : "";
	const highlightClass = cell.highlight ? "highlight" : "";
	return (
		<div onClick={handleClick} className={`cell ${colorClass}`}>
			{
				// parent div is a white, empty cell; a placeholder
				// the div inside is the one getting colored and animated
			}
			<div className={highlightClass}></div>
		</div>
	);
};

export const insertCell = (board: cell[][], x: number, value: player) => {
	for (let y = board.length - 1; y >= 0; y--) {
		const row = board[y];
		if (row[x].value === null) {
			row[x].value = value;
			return { x, y };
		}
	}
	return null;
};
