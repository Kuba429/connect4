import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Board } from "../src/components/Board";
import { MAKE_MOVE_TIMEOUT } from "../src/components/Cell";
import { store } from "../src/store";

const sleep = (time: number) =>
	new Promise((resolve) => setTimeout(resolve, time));

describe("Cell component", () => {
	test("As many cell elements as in store", () => {
		const { container } = render(<Board />);
		const cells = container.querySelectorAll(".cell");
		expect(cells).toHaveLength(store.board.flat().length);
	});
	test("New value is inserted into cell on click", async () => {
		const { container } = render(<Board />);
		const cell = container.querySelector(".cell");
		expect(cell).toBeInTheDocument();
		const countEmptyCells = () =>
			store.board.flat().filter((c) => c.value === null).length;
		const emptyCellsBefore = countEmptyCells();
		await userEvent.click(cell!);
		await sleep(MAKE_MOVE_TIMEOUT);
		const emptyCellsAfter = countEmptyCells();
		expect(emptyCellsAfter).toBe(emptyCellsBefore - 2); // before - the cell that was clicked by player - the cell that ai "clicked"
	});
});
