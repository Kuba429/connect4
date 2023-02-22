import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Board } from "../src/components/Board";
import { store } from "../src/store";

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
		const emptyCellsAfter = countEmptyCells();
		expect(emptyCellsAfter).toBe(emptyCellsBefore - 1);
	});
});
