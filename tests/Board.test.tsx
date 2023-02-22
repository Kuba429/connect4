import { Board } from "../src/components/Board";
import React from "react";
import { render } from "@testing-library/react";
import { getEmptyBoard } from "../src/board";

describe("Board component", () => {
	test("Board is 7x6", () => {
		const board = getEmptyBoard();
		expect(board.flat()).toHaveLength(7 * 6);
		expect(board).toHaveLength(6);
		for (let y = 0; y < 6; y++) {
			expect(board[y]).toHaveLength(7);
		}
	});
	test("Component mounts", () => {
		const { container } = render(<Board />);
		const board = container.querySelector(".board");
		expect(board).toBeInTheDocument();
	});
});
