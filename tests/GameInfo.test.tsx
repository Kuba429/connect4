import { render, screen, act, cleanup } from "@testing-library/react";
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
		const cells = Array.from(container.querySelectorAll(".cell")).slice(
			0,
			4
		);
		for (const cell of cells) {
			store.turn = 1;
			await userEvent.click(cell);
		}
		// displays who won
		h1 = screen.getByText(/won/);
		expect(h1).toBeInTheDocument();
	});
	test("New game button", async () => {
		const { container } = render(<App />);
		const newGameButton = container.querySelector(".game-info > button")!;
		expect(newGameButton).toBeInTheDocument();
		const cells = Array.from(container.querySelectorAll(".cell"));
		// click on 10 random cells so the board isn't empty
		for (let i = 0; i < 10; i++) {
			const randomIndex =
				Math.floor(Math.random() * 7 * 6) % cells.length;
			await userEvent.click(cells[randomIndex]);
		}
		expect(getNonEmptyCells(container)).not.toBe(0);
		await userEvent.click(newGameButton);
		expect(getNonEmptyCells(container)).toBe(0);
		expect(store.winner).toBeNull();
		// no cell with a value other than null
		store.board.flat().forEach((c) => expect(c.value).toBeNull());
	});
});

function getNonEmptyCells(container: HTMLElement) {
	return Array.from(container.querySelectorAll(".cell")).filter(
		(c) =>
			c.classList.contains("player1") || c.classList.contains("player2")
	).length;
}
