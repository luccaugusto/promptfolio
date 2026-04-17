import './App.css';
import { FloatingWindow } from './features/floatingWindow/FloatingWindow';
import { useRef, useState } from 'react';
import React from 'react';
import { Promptfolio } from './features/promptfolio/Promptfolio';
import { MobilePage } from './features/mobilePage/MobilePage';

function App(props:any) {
	const [programs, setPrograms] = useState([Promptfolio] as React.FC[]);
	const [active, setActive] = useState(0);
	const windowRef = useRef<HTMLDivElement | null>(null);

	const closeProgram = (programName: string) => {
		const pIndex = programs.findIndex((p) => p.name === programName);
		if (pIndex === -1) {
			return;
		}
		const programList = programs.slice();
		programList.splice(pIndex, 1);
		setPrograms(programList);
		setActive(programList.length - 1);
	}

	const getRandomTop = () => {
		return windowRef.current ?
			(Math.random() * 1000 % windowRef.current.clientHeight)
			:
			0;
	};

	const getRandomLeft = () => {
		return windowRef.current ?
			(Math.random() * 1000 % windowRef.current.clientWidth)
			:
			0;
	};


	//Desktop version
	let component = (
		<div>
			{
			programs.map((p, index) => {
					const Component = p;
					return (
							<FloatingWindow
							{...props}
							windowName={p.name}
							defaultTop={getRandomTop()}
							defaultLeft={getRandomLeft()}
							onTop={index === active}
							onClose={closeProgram}
							>
							<Component key={`${p.name}-${Math.random()*10}`}/>
							</FloatingWindow>
						   )
					})
			}
		</div>
	);

	if (window.innerWidth < 720) {
		component = <MobilePage/>;
	}

	return (
		<div className="App" ref={windowRef}>
			{component}
		</div>
	);
}

export default App;
