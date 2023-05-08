import { Promptfolio } from './features/promptfolio/Promptfolio';
import './App.css';
import { FloatingWindow } from './features/floatingWindow/FloatingWindow';

function App(props:any) {
	return (
		<div className="App">
			<FloatingWindow {...props} windowName={"Prompfolio"}>
				<Promptfolio />
			</FloatingWindow>
		</div>
	);
}

export default App;
