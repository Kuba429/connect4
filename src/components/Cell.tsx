import { FC } from "react";
import { checkResultByCell } from "../gameResult";
import { makeMove } from "../minimax";
import { player, store, toggleTurn } from "../store";

export type cell = {
	value: player | null;
	id: number;
	x: number;
	y: number;
};

export const Cell: FC<{ cell: cell }> = ({ cell }) => {
	const handleClick = () => {
		if (store.winner) return;
		const newCell = insertCell(store.board, cell.x, store.turn);
		if (!newCell) return;
		store.turn = toggleTurn(store.turn);
		const result = checkResultByCell(newCell.x, newCell.y, store.board);
		if (result) {
			store.winner = result.winner;
			return;
		}
		// IMPORTANT looks like safari blocks the main thread and awaits small timeouts. 50 seems to not be awaited
		setTimeout(() => makeMove(), 50);
	}; // this store access doesn't need to be reactive; only accesses proxy on click; love valtio <3
	const colorClass = cell.value ? "player" + cell.value : "";
	return (
		<div onClick={handleClick} className={`cell ${colorClass}`}>
			{
				// parent div is a white, empty cell; a placeholder
				// the div inside is the one getting colored and animated
			}
			<div></div>
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
