import { FC } from "react";
import { player, store } from "../store";

export type cell = {
	value: player | null;
	id: number;
	x: number;
	y: number;
};

export const Cell: FC<{ cell: cell }> = ({ cell }) => {
	const handleClick = () => insertCell(cell.x, store.turn); // this store access doesn't need to be reactive; only accesses on click; love valtio <3
	return (
		<div onClick={handleClick} className="cell">
			{cell.value}
		</div>
	);
};

export const insertCell = (x: number, value: player) => {
	for (let y = store.board.length - 1; y >= 0; y--) {
		const row = store.board[y];
		if (row[x].value === null) {
			row[x].value = value;
			return;
		}
	}
	console.log("no space");
};
