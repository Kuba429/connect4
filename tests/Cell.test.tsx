import { render } from "@testing-library/react";
import React from "react";
import { Board } from "../src/components/Board";
import { store } from "../src/store";

describe("Cell component", () => {
	test("As many cell elements as in store", () => {
		const { container } = render(<Board />);
		const cells = container.querySelectorAll(".cell");
		expect(cells).toHaveLength(store.board.flat().length);
	});
});
