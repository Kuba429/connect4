import { cell } from "./components/Cell";

export const getEmptyBoard = () => {
	const arr: cell[][] = [];
	for (let y = 0; y < 6; y++) {
		arr.push([]);
		for (let x = 0; x < 7; x++) {
			arr[y][x] = {
				value: null,
				id: y * 7 + x,
				x,
				y,
				highlight: false,
			};
		}
	}
	return arr;
};
