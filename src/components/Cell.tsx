import { FC } from "react";
import { insertCell, player, store } from "../store";

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
