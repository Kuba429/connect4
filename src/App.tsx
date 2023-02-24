import { Board } from "./components/Board";
import { GameInfo } from "./components/GameInfo";

export function App() {
	return (
		<div className="App">
			<GameInfo />
			<Board />
		</div>
	);
}

export default App;
