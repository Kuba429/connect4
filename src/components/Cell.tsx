import { FC } from "react";
import { checkResultByCell } from "../gameResult";
import { player, store } from "../store";

export type cell = {
	value: player | null;
	id: number;
	x: number;
	y: number;
};

export const Cell: FC<{ cell: cell }> = ({ cell }) => {
	const handleClick = () => {
		const newCell = insertCell(cell.x, store.turn);
		if (!newCell) return;
		const result = checkResultByCell(newCell.x, newCell.y, store.board);
		if (!result) return;
		store.winner = result.winner;
	}; // this store access doesn't need to be reactive; only accesses proxy on click; love valtio <3
	return (
		<div
			style={{
				border: "3px solid black",
				borderColor:
					cell.value === 1 ? "red" : cell.value === 2 ? "blue" : "",
			}}
			onClick={handleClick}
			className="cell"
		>
			{cell.id}
		</div>
	);
};

export const insertCell = (x: number, value: player) => {
	for (let y = store.board.length - 1; y >= 0; y--) {
		const row = store.board[y];
		if (row[x].value === null) {
			row[x].value = value;
			return { x, y };
		}
	}
	return null;
};
