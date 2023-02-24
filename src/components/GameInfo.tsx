import { useSnapshot } from "valtio";
import { player, store } from "../store";

export const GameInfo = () => {
	const state = useSnapshot(store);
	const h1 = state.winner
		? `${getColor(state.winner)} won`
		: `${getColor(state.turn)}'s turn`;
	return (
		<div className="game-info">
			<h1>{h1}</h1>
			<button>New game</button>
		</div>
	);
};

const getColor = (player: player) => {
	if (player === 1) return "Red";
	return "Yellow";
};
