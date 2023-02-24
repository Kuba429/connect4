import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { expect } from "vitest";
import { GameInfo } from "../src/components/GameInfo";
import { App } from "../src/App";
import { store } from "../src/store";

describe("GameInfo component", () => {
	test("Component mounts", () => {
		render(<GameInfo />);
		const el = document.querySelector(".game-info");
		expect(el).toBeInTheDocument();
	});
	test("Displays state-appropriate data", async () => {
		const { container } = render(<App />);
		// displays who's turn is it now
		let h1 = screen.getByText(/'s turn/);
		expect(h1).toBeInTheDocument();
		// make 1 win
		await act(async () => {
			const cells = Array.from(container.querySelectorAll(".cell")).slice(
				0,
				4
			);
			for (const cell of cells) {
				store.turn = 1;
				await userEvent.click(cell);
			}
		});
		// displays who won
		h1 = screen.getByText(/won/);
		expect(h1).toBeInTheDocument();
	});
});
