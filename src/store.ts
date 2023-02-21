import { proxy } from "valtio";
import { cell } from "./components/Cell";

export const getEmptyBoard = () => {
	const arr: cell[][] = [];
	for (let y = 0; y < 6; y++) {
		arr.push([]);
		for (let x = 0; x < 7; x++) {
			arr[y][x] = {
				value: "",
				id: y * 7 + x,
				x,
				y,
			};
		}
	}
	return arr;
};

export const store = proxy({ board: getEmptyBoard() });
