import React, { useState } from 'react';
import ReactDomServer from 'react-dom/server';

import { useAppDispatch } from '../../app/hooks';
import {
	clearOutput,
	clearCommand,
	pushCommand,
	pushOutput,
	selectCommandCount,
	selectCommandHistory,
	selectOutput,
    selectcommandOutput,
} from './promptfolioSlice';
import styles from './Promptfolio.module.css';
import { useSelector } from 'react-redux';
import { Input } from './components/Input';
import { Output } from './components/Output';
import { parseCommand, programList } from './components/Parser';
import { ProgramActions } from './components/Parser';
import { Github } from './components/Github';
import { Skillset } from './components/Skillset';
import { Cat } from './components/Cat';

const availableComponents: { [key: string]: any } = {
	"Github": Github,
	"Skillset": Skillset,
	"Cat": Cat,
}

export function Promptfolio() {
	const dispatch = useAppDispatch();
	const totalCommandCount = useSelector(selectCommandCount);
	const outputHistory = useSelector(selectOutput);
	const commandHistory = useSelector(selectCommandHistory);
	const commandOutput = useSelector(selectcommandOutput);

	const [commandLine, setCommandLine] = useState('');
	const [currentCommandCount, setCurrentCommandCount] = useState(0);

	const fireCommand = () => {
		dispatch(pushCommand(commandLine));
		setCurrentCommandCount(currentCommandCount+1);

		const commandResult = parseCommand(commandLine);
		if (commandResult.action.indexOf(ProgramActions.OUTPUT_CLEAR) > -1) {
			dispatch(clearOutput());
			dispatch(clearCommand());
		} else if (commandResult.action.indexOf(ProgramActions.RENDER) > -1) {
			const Component = availableComponents[commandResult.output];
			const args = commandResult.args;
			dispatch(pushOutput(ReactDomServer.renderToStaticMarkup(<Component args={args}/>)));
		} else {
			dispatch(pushOutput(commandResult.output));
		}
	}

	const keyPressMap = new Map();
	keyPressMap.set('Enter', function Enter() {
		fireCommand();
		setCommandLine("");
		setCurrentCommandCount(totalCommandCount);
	});
	keyPressMap.set('ArrowUp', function ArrowUp() {
		if (currentCommandCount > 0) {
			setCurrentCommandCount(currentCommandCount-1);
		}
		setCommandLine(commandHistory[currentCommandCount]);
	});
	keyPressMap.set('ArrowDown', function ArrowDown() {
		if (currentCommandCount < totalCommandCount) {
			setCurrentCommandCount(currentCommandCount+1);
			setCommandLine(commandHistory[currentCommandCount]);
		} else if (currentCommandCount === totalCommandCount) {
			setCommandLine("");
		}
	});
	keyPressMap.set('Tab', function Tab() {
		let possiblePrograms: string[] = [];
		let possibleProgramsCount = 0;
		const cmdLength = commandLine.length;
		const programCount = programList.size;
		const programIterator = programList.keys();
		for (let i=0; i < programCount; i++) {
			const programName = programIterator.next().value;
			if (programName.substring(0, cmdLength) === commandLine) {
				possiblePrograms.push(programName);
				possibleProgramsCount+=1;
			}
		}
		if (possibleProgramsCount === 1) {
			setCommandLine(possiblePrograms[0]);
		} else if (possibleProgramsCount > 1) {
			dispatch(pushCommand(commandLine));
			dispatch(pushOutput(possiblePrograms.reduce(
				(suggestionString, pName) => suggestionString += `&nbsp;&nbsp;${pName}`
			)));
		}
	});

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Tab") e.preventDefault();
		const keyFunction = keyPressMap.get(e.key);
		if (keyFunction) keyFunction();
	}

	return (
		<div className={`${styles.terminalColors} ${styles.terminal}`}>
			<Output
				outputHistory={outputHistory}
				commandOutput={commandOutput}
			/>
			<Input
				className={`${styles.terminalColors} ${styles.commandLine}`}
				value={commandLine}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommandLine(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
		</div>
	);
}
