import React, { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import {
	clearOutput,
	clearCommand,
	pushCommand,
	pushOutput,
	selectCommandHistory,
	selectOutput,
    selectcommandOutput,
    selectFileSystem,
} from './promptfolioSlice';
import styles from './Promptfolio.module.css';
import { useSelector } from 'react-redux';
import { Input } from './components/Input';
import { parseCommand, programList } from './components/Parser';
import { ProgramActions } from './components/Parser';
import { Github } from './components/Github';
import { Skillset } from './components/Skillset';
import { Cat } from './components/Cat';
import { TextRender } from './components/TextRender';

const availableComponents: { [key: string]: any } = {
	Github: Github,
	Skillset: Skillset,
	Cat: Cat,
	TextRender: TextRender,
}

export const componentNames = {
	TEXT: 'TextRender',
	GITHUB: 'Github',
	CAT: 'Cat',
	SKILLSET: 'Skillset',
}

export function Promptfolio() {
	const dispatch = useAppDispatch();
	const outputHistory = useSelector(selectOutput);
	const commandHistory = useSelector(selectCommandHistory);
	const commandOutput = useSelector(selectcommandOutput);
	const fileSystem = useSelector(selectFileSystem);

	const [commandLine, setCommandLine] = useState('');
	const [currentCommandCount, setCurrentCommandCount] = useState(commandHistory.length);

	const fireCommand = () => {
		dispatch(pushCommand(commandLine));
		setCurrentCommandCount(currentCommandCount+1);

		const programResult = parseCommand(commandLine, fileSystem);
		if (programResult.action.indexOf(ProgramActions.OUTPUT_CLEAR) > -1) {
			dispatch(clearOutput());
			dispatch(clearCommand());
		} else {
			dispatch(pushOutput(programResult));
		}
	}

	const keyPressMap = new Map();
	keyPressMap.set('Enter', function Enter() {
		fireCommand();
		setCommandLine("");
		setCurrentCommandCount(commandHistory.length+1);
	});
	keyPressMap.set('ArrowUp', function ArrowUp() {
		let lastCommandIndex = currentCommandCount;
		if (currentCommandCount > 1) {
			lastCommandIndex-=1;
			setCurrentCommandCount(lastCommandIndex);
			setCommandLine(commandHistory[lastCommandIndex]);
		}
	});
	keyPressMap.set('ArrowDown', function ArrowDown() {
		if (currentCommandCount < commandHistory.length) {
			const nextCommandIndex = currentCommandCount+1;
			setCurrentCommandCount(nextCommandIndex);
			setCommandLine(commandHistory[nextCommandIndex]);
		} else if (currentCommandCount === commandHistory.length) {
			setCommandLine("");
		}
	});
	keyPressMap.set('Tab', function Tab() {
		//TODO: implement file autocomplete (autocompletes with file names after a command is in the commandLine)
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
			dispatch(pushOutput({
				args: possiblePrograms.reduce(
					(suggestionString, pName) => suggestionString += `&nbsp;&nbsp;${pName}`
				),
				action: ProgramActions.RENDER,
				component: componentNames.TEXT
			}));
		}
	});

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Tab") e.preventDefault();
		const keyFunction = keyPressMap.get(e.key);
		if (keyFunction) keyFunction();
	}

	const generateFullOutput = () => {
		const fullOutput = [];
		for (let i=0; i < commandOutput.length; i++) {
			let commandValue = commandOutput[i];
			if (commandOutput[i] === 'welcome') {
				commandValue = '';
			}
			fullOutput.push({type: 'command', args: commandValue, component: componentNames.TEXT});
			fullOutput.push({type: 'output', args: outputHistory[i].args, component: outputHistory[i].component});
		}
		return fullOutput.slice(0).reverse();
	}

	return (
		<div className={`${styles.terminalColors} ${styles.terminal}`}>
			<ul className={styles.commandHistory}>
			{
				generateFullOutput().map((line, index) => {
					const Component = availableComponents[line.component];
					return (
					<li
						key={`line-${index}`}
						className={line.type === 'command' && line.args === '' ? styles.hidden : ''}
					>
						<Component args={line.args} type={line.type} />
					</li>
				)})
			}
			</ul>
			<Input
				className={`${styles.terminalColors} ${styles.commandLine}`}
				value={commandLine}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommandLine(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
		</div>
	);
}
