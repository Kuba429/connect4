import { useSnapshot } from "valtio";
import { store } from "../store";
import { Cell } from "./Cell";

export const Board = () => {
	const state = useSnapshot(store);
	return (
		<>
			{state.winner ?? ""}
			<div className="board">
				{state.board.flat().map((c) => (
					<Cell cell={c} key={c.id} />
				))}
			</div>
		</>
	);
};
