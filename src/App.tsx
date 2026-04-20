import { FloatingWindow } from './features/floatingWindow/FloatingWindow';
import { useRef, useState } from 'react';
import { MobilePage } from './features/mobilePage/MobilePage';
import { DesktopIcons } from './features/desktop/DesktopIcons';
import { Program, programs } from './features/desktop/programs';

type OpenWindow = {
	program: Program;
	top: number;
	left: number;
};

const WINDOW_HEIGHT_PX = 667; // matches FloatingWindow height: 500pt

const centeredPosition = (): { top: number; left: number } => ({
	top: Math.max(20, (window.innerHeight - WINDOW_HEIGHT_PX) / 2),
	left: window.innerWidth * 0.1,
});

const initialOpenWindows = (): OpenWindow[] => {
	const promptfolio = programs.find((p) => p.name === 'promptfolio');
	if (!promptfolio) return [];
	return [{ program: promptfolio, ...centeredPosition() }];
};

function App(props: any) {
	const [openWindows, setOpenWindows] = useState<OpenWindow[]>(initialOpenWindows);
	const [active, setActive] = useState(0);
	const windowRef = useRef<HTMLDivElement | null>(null);

	const openProgram = (program: Program) => {
		if (program.kind === 'redirect' && program.url) {
			window.open(program.url, '_blank');
			return;
		}
		const existingIndex = openWindows.findIndex((w) => w.program.name === program.name);
		if (existingIndex > -1) {
			setActive(existingIndex);
			return;
		}
		const next = [...openWindows, { program, ...centeredPosition() }];
		setOpenWindows(next);
		setActive(next.length - 1);
	};

	const closeProgram = (programName: string) => {
		const index = openWindows.findIndex((w) => w.program.name === programName);
		if (index === -1) return;
		const next = openWindows.slice();
		next.splice(index, 1);
		setOpenWindows(next);
		setActive(Math.max(0, next.length - 1));
	};

	let component = (
		<div>
			<DesktopIcons programs={programs} onOpen={openProgram} />
			{openWindows.map((w, index) => {
				const { Component } = w.program;
				if (!Component) return null;
				return (
					<FloatingWindow
						{...props}
						key={w.program.name}
						windowName={w.program.name}
						defaultTop={w.top}
						defaultLeft={w.left}
						onTop={index === active}
						onClose={closeProgram}
						onFocus={() => setActive(index)}
					>
						<Component />
					</FloatingWindow>
				);
			})}
		</div>
	);

	if (window.innerWidth < 720) {
		component = <MobilePage />;
	}

	return (
		<div className="App" ref={windowRef}>
			{component}
		</div>
	);
}

export default App;
