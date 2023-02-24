import { useSnapshot } from "valtio";
import { Board } from "./components/Board";
import { GameInfo } from "./components/GameInfo";
import { store } from "./store";

function App() {
	return (
		<div className="App">
			<GameInfo />
			<Board />
		</div>
	);
}

export default App;
