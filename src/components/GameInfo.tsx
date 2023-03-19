import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { howManyEmptyCells } from "../gameResult";
import { newGame, player, store } from "../store";

export const GameInfo = () => {
	const state = useSnapshot(store);
	let h1 = "It's a draw";
	if (!state.isOver) h1 = `${getColor(state.turn)}'s turn`;
	else if (state.winner !== null) h1 = `${getColor(state.winner)} won`;
	return (
		<div className="game-info">
			<h1>{h1}</h1>
			<button onClick={newGame}>New game</button>
		</div>
	);
};

const getColor = (player: player) => {
	if (player === 1) return "Red";
	return "Yellow";
};
