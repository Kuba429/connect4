import { player, store, toggleTurn } from "../src/store";

test("Turns are toggled", () => {
	const array: player[] = [];
	array.push(store.turn);
	store.turn = toggleTurn(store.turn);
	array.push(store.turn);
	expect(array[0]).not.toBe(array[1]);
});
