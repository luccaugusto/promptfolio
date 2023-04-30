import React, { useState } from 'react';

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
import { parseCommand } from './components/Parser';
import { ProgramActions } from './components/Parser';

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

	const handleKeyPress = (e: React.KeyboardEvent) => {
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
