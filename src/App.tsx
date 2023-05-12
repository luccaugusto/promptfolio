import './App.css';
import { FloatingWindow } from './features/floatingWindow/FloatingWindow';
import { useRef, useState } from 'react';
import React from 'react';
import { Launcher } from './features/launcher/Launcher';
import { programDesktopEntry } from './features/launcher/ProgramList';

function App(props:any) {
	const [programs, setPrograms] = useState([] as React.FC[]);
	const [active, setActive] = useState(0);
	const windowRef = useRef<HTMLDivElement | null>(null);

	const openProgram = (program: programDesktopEntry) => {
		const pIndex = programs.indexOf(program.program);
		if (pIndex > -1) {
			setActive(pIndex);
			return;
		}
		const programList = programs.slice();
		programList.push(program.program);
		setPrograms(programList);
		setActive(programList.length - 1);
	}

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

	return (
		<div className="App" ref={windowRef}>
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
			<Launcher key={"Launcher"} openProgram={openProgram}/>
		</div>
	);
}

export default App;
